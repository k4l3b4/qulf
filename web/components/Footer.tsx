import Link from "next/link";
import { config } from "@/lib/shared";
import { QulfLogoIcon } from "./icons";

// Grid decoration
function Cross({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className={`absolute ${className ?? ""}`}
    >
      <title>Cross</title>
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function GridCrosses() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 text-neutral-800"
    >
      <Cross className="left-[-0.5px] top-[-0.5px] -translate-x-1/2 -translate-y-1/2" />
      <Cross className="right-[-0.5px] top-[-0.5px] translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

function QulfWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center rounded-md select-none">
        <QulfLogoIcon width={22} height={22} />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">QULF</span>
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <title>Github</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const FOOTER_GROUPS = [
  {
    title: "Docs",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Core Concepts", href: "/docs/core-concepts" },
      { label: "API Reference", href: "/docs/api-reference" },
      { label: "Frameworks", href: "/docs/frameworks" },
      { label: "Databases", href: "/docs/databases" },
      { label: "Plugins", href: "/docs/plugins" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { label: "FastAPI", href: "/docs/frameworks/fastapi" },
      { label: "Litestar", href: "/docs/frameworks/litestar" },
      { label: "Django", href: "/docs/frameworks/django" },
      { label: "Flask", href: "/docs/frameworks/flask" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "SQLAlchemy", href: "/docs/databases/sqlalchemy" },
      { label: "SQLModel", href: "/docs/databases/sqlmodel" },
      { label: "Motor (MongoDB)", href: "/docs/databases/motor" },
      { label: "OAuth2", href: "/docs/plugins/oauth" },
      { label: "TOTP / 2FA", href: "/docs/plugins/totp" },
      { label: "Magic Links", href: "/docs/plugins/magic-link" },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "GitHub",
        href: `https://github.com/${config.git_user}/${config.repo}`,
        external: true,
      },
      {
        label: "Changelog",
        href: `https://github.com/${config.git_user}/${config.repo}/releases`,
        external: true,
      },
      {
        label: "Issues",
        href: `https://github.com/${config.git_user}/${config.repo}/issues`,
        external: true,
      },
      {
        label: "License (MIT)",
        href: `https://github.com/${config.git_user}/${config.repo}/blob/main/LICENSE`,
        external: true,
      },
    ],
  },
];

const linkCls =
  "inline-flex min-h-9 items-center text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-200 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="relative mx-auto max-w-7xl border-x border-neutral-800">
        <GridCrosses />

        {/* Main body */}
        <div className="grid border-b border-neutral-800 lg:grid-cols-12">
          {/* Brand col */}
          <div className="border-b border-neutral-800 px-6 py-10 sm:px-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:py-14">
            <div className="flex h-full flex-col gap-8">
              <div>
                <Link
                  href="/"
                  className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Qulf home"
                >
                  <QulfWordmark />
                </Link>
                <p className="mt-4 max-w-50 text-sm leading-6 text-neutral-600">
                  Authentication for Python, done right.
                </p>
              </div>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-[11px] text-neutral-500 w-fit">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-50" />
                  <span className="relative size-1.5 rounded-full bg-red-500" />
                </span>
                {config.version} — public beta
              </div>

              {/* Social */}
              <div className="mt-auto flex items-center gap-1">
                <a
                  href={`https://github.com/${config.git_user}/${config.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-9 items-center justify-center rounded-md text-neutral-600 transition-colors duration-200 hover:bg-neutral-800 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <GithubIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-px bg-neutral-800 lg:col-span-9 md:grid-cols-4"
          >
            {FOOTER_GROUPS.map((group) => (
              <div
                key={group.title}
                className="bg-neutral-950 px-6 py-10 sm:px-8 md:py-14"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkCls}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkCls}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-neutral-700">
            © {year} Qulf · MIT License · Built in public
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-xs text-neutral-700 transition-colors hover:text-neutral-400"
            >
              Docs
            </Link>
            <a
              href={`https://github.com/${config.git_user}/${config.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-700 transition-colors hover:text-neutral-400"
            >
              GitHub
            </a>
            <code className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
              pip install qulf
            </code>
          </div>
        </div>
      </div>
    </footer>
  );
}
