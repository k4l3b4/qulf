import subprocess
import sys
from pathlib import Path
from unittest.mock import patch

import pytest
from typer.testing import CliRunner

from qulf.cli.commands.migrate import app

runner = CliRunner()


@pytest.fixture(autouse=True)
def isolate_cli(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.chdir(tmp_path)


class DummyDB:
    def __init__(self, name: str = "django") -> None:
        self.name = name


class DummyAuth:
    def __init__(self, name: str = "django") -> None:
        self.db = DummyDB(name)


@pytest.fixture(autouse=True)
def setup_dummy_app(monkeypatch: pytest.MonkeyPatch) -> None:
    dummy_module = type("dummy_module", (), {"auth": DummyAuth("django")})
    monkeypatch.setitem(sys.modules, "dummy_app", dummy_module)
    Path(".qulf.toml").write_text("[qulf]\napp = 'dummy_app:auth'\n")


class TestQulfMigrateCommand:
    def test_migrate_no_config(self) -> None:
        # Delete the file created by the autouse fixture!
        Path(".qulf.toml").unlink()

        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "Qulf config not found" in result.stdout

    def test_migrate_pyproject_config(self) -> None:
        Path("pyproject.toml").write_text("[tool.qulf]\napp = 'dummy_app:auth'\n")
        sys.modules["dummy_app"] = type(
            "dummy_module", (), {"auth": DummyAuth("mongo")}
        )
        result = runner.invoke(app)
        assert result.exit_code == 0
        assert "does not require migrations" in result.stdout

    def test_migrate_bad_import(self) -> None:
        Path(".qulf.toml").write_text("[qulf]\napp = 'bad:path'\n")
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "Error loading Qulf instance" in result.stdout

    def test_migrate_mongo_and_memory_skips(self, setup_dummy_app: None) -> None:
        sys.modules["dummy_app"].auth.db.name = "mongo"
        result = runner.invoke(app)
        assert result.exit_code == 0
        assert "does not require migrations" in result.stdout

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_django_success(self, mock_run, setup_dummy_app: None) -> None:
        Path("manage.py").touch()
        result = runner.invoke(app, ["--apply"])
        assert result.exit_code == 0
        assert mock_run.call_count == 2
        assert "manage.py" in mock_run.call_args_list[0][0][0]

    def test_migrate_django_missing_manage_py(self, setup_dummy_app: None) -> None:
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "'manage.py' not found" in result.stdout

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_sqlalchemy_success(self, mock_run, setup_dummy_app: None) -> None:
        sys.modules["dummy_app"].auth.db.name = "sqlalchemy"
        Path("alembic.ini").touch()

        result = runner.invoke(app, ["-m", "custom_msg", "--apply"])
        assert result.exit_code == 0
        # order: upgrade head (existing) → autogenerate → upgrade head (new)
        assert mock_run.call_count == 3
        first_call, second_call, third_call = (
            mock_run.call_args_list[0][0][0],
            mock_run.call_args_list[1][0][0],
            mock_run.call_args_list[2][0][0],
        )
        assert first_call == ["alembic", "upgrade", "head"]
        assert "custom_msg" in second_call
        assert third_call == ["alembic", "upgrade", "head"]

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_sqlalchemy_no_apply_only_autogenerates(
        self, mock_run, setup_dummy_app: None
    ) -> None:
        """Without --apply, only autogenerate runs; no upgrade calls."""
        sys.modules["dummy_app"].auth.db.name = "sqlalchemy"
        Path("alembic.ini").touch()

        result = runner.invoke(app, ["-m", "my_msg"])
        assert result.exit_code == 0
        assert mock_run.call_count == 1
        assert "revision" in mock_run.call_args_list[0][0][0]
        assert "my_msg" in mock_run.call_args_list[0][0][0]

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_sqlalchemy_apply_db_at_head(
        self, mock_run, setup_dummy_app: None
    ) -> None:
        """
        --apply with DB already at head: upgrade is a no-op, autogenerate succeeds.
        """
        sys.modules["dummy_app"].auth.db.name = "sqlalchemy"
        Path("alembic.ini").touch()

        result = runner.invoke(app, ["--apply"])
        assert result.exit_code == 0
        assert mock_run.call_count == 3
        assert mock_run.call_args_list[0][0][0] == ["alembic", "upgrade", "head"]
        assert "revision" in mock_run.call_args_list[1][0][0]
        assert mock_run.call_args_list[2][0][0] == ["alembic", "upgrade", "head"]

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_sqlalchemy_apply_db_behind_head(
        self, mock_run, setup_dummy_app: None
    ) -> None:
        """--apply when the DB is behind head: existing migrations are applied first."""
        sys.modules["dummy_app"].auth.db.name = "sqlalchemy"
        Path("alembic.ini").touch()

        # Simulate the first upgrade (catching up) succeeding, then autogenerate,
        # then the final upgrade for the new migration.
        mock_run.return_value = None

        result = runner.invoke(app, ["--apply"])
        assert result.exit_code == 0
        assert mock_run.call_count == 3
        # First call must be the catch-up upgrade, not autogenerate
        assert mock_run.call_args_list[0][0][0] == ["alembic", "upgrade", "head"]
        assert "--autogenerate" in mock_run.call_args_list[1][0][0]
        assert mock_run.call_args_list[2][0][0] == ["alembic", "upgrade", "head"]

    def test_migrate_sqlalchemy_missing_ini(self, setup_dummy_app: None) -> None:
        sys.modules["dummy_app"].auth.db.name = "sqlalchemy"
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "'alembic.ini' not found" in result.stdout

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_subprocess_called_process_error(
        self, mock_run, setup_dummy_app: None
    ) -> None:
        Path("manage.py").touch()
        mock_run.side_effect = subprocess.CalledProcessError(1, "cmd")
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "failed with exit code 1" in result.stdout

    @patch("qulf.cli.commands.migrate.subprocess.run")
    def test_migrate_subprocess_not_found(
        self, mock_run, setup_dummy_app: None
    ) -> None:
        Path("manage.py").touch()
        mock_run.side_effect = FileNotFoundError()
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "Could not execute" in result.stdout

    def test_migrate_unknown_orm(self, setup_dummy_app: None) -> None:
        sys.modules["dummy_app"].auth.db.name = "fake_orm"
        result = runner.invoke(app)
        assert result.exit_code == 1
        assert "Unknown ORM" in result.stdout
