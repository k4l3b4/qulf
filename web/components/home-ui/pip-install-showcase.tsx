import { Check, Copy } from "lucide-react";
import { useState } from "react";

const INSTALL_PRESETS = [
  {
    id: "minimal",
    label: "Core Engine",
    command: "pip install qulf",
    description:
      "Core cryptography engine with JWT & DB sessions, password hashing, and user lifecycle management.",
    tags: ["JWT", "Stateful DB", "Soft Delete"],
  },
  {
    id: "fastapi",
    label: "FastAPI + SQLAlchemy",
    command: 'pip install "qulf[fastapi,sqlalchemy]"',
    description:
      "Native APIRouter mounting with async SQLAlchemy sessionmaker and LibCST AST schema auto-sync.",
    tags: ["FastAPI", "SQLAlchemy", "Alembic"],
  },
  {
    id: "flask",
    label: "Flask + SQLModel",
    command: 'pip install "qulf[flask,sqlmodel]"',
    description:
      "Flask Blueprint with context-aware g.qulf_user and SQLModel ORM auto-injected schema.",
    tags: ["Flask", "SQLModel", "Blueprints"],
  },
  {
    id: "django",
    label: "Django + OAuth2",
    command: 'pip install "qulf[django,oauth]"',
    description:
      "Native Django urlpatterns with Google, GitHub, Discord, Apple, and OIDC social logins.",
    tags: ["Django", "OAuth2", "OIDC SSO"],
  },
  {
    id: "passkey",
    label: "Passkeys + TOTP",
    command: 'pip install "qulf[passkey,totp]"',
    description:
      "FIDO2 WebAuthn passwordless auth (Touch ID, Face ID) and TOTP authenticator app support.",
    tags: ["WebAuthn", "Passkeys", "TOTP 2FA"],
  },
  {
    id: "all",
    label: "Full Suite",
    command: 'pip install "qulf[all]"',
    description:
      "Full batteries-included package with all 4 web frameworks, 4 ORMs, 6 plugins, and AST CLI tooling.",
    tags: ["4 Frameworks", "4 ORMs", "6 Plugins"],
  },
];

export function PipInstallShowcase() {
  const [activePreset, setActivePreset] = useState(INSTALL_PRESETS[1]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-10 px-5 sm:px-8 lg:px-10 bg-neutral-950/60 border-b border-neutral-800">
      {/* Preset tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {INSTALL_PRESETS.map((preset) => {
          const isActive = activePreset.id === preset.id;
          return (
            <button
              type="button"
              key={preset.id}
              onClick={() => setActivePreset(preset)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/40"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Terminal copy block */}
      <div className="rounded-xl border border-neutral-800 bg-black/90 p-5 backdrop-blur-md relative overflow-hidden group">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-sm sm:text-base text-neutral-200 overflow-x-auto py-1">
            <span className="text-red-500 font-bold select-none">$</span>
            <span className="text-white font-medium">
              {activePreset.command}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(activePreset.command)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-semibold text-neutral-300 transition-all duration-200 hover:border-neutral-500 hover:text-white active:scale-95 cursor-pointer"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Description & Tags */}
        <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-neutral-400">
          <p className="max-w-2xl leading-relaxed">
            {activePreset.description}
          </p>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {activePreset.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300 font-mono text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
