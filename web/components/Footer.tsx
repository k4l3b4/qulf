import Link from "next/link";
import { config } from "@/lib/shared";
import {  QulfLogoIcon, GithubIcon } from "./logo-icons";
import { GridCrosses } from "./home-ui/decoration";


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
