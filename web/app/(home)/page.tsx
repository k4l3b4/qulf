"use client";

import {
  ArrowRight,
  Blocks,
  Check,
  ChevronRight,
  Copy,
  Database,
  ExternalLink,
  KeySquare,
  Lock,
  Plug,
  Shield,
  Type,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import {
  DjangoIcon,
  FastAPIIcon,
  FlaskIcon,
  LiteStarIcon,
  MongoDBIcon,
  PrismaIcon,
  SQLAlchemyIcon,
} from "@/components/icons";
import { QulfArchDiagram } from "@/components/QulfArchDiagram";
import { config } from "@/lib/shared";

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

function GridCrosses({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 text-neutral-800 ${className ?? ""}`}
    >
      <Cross className="left-[-0.5px] top-[-0.5px] -translate-x-1/2 -translate-y-1/2" />
      <Cross className="right-[-0.5px] top-[-0.5px] translate-x-1/2 -translate-y-1/2" />
      <Cross className="left-[-0.5px] bottom-[-0.5px] -translate-x-1/2 translate-y-1/2" />
      <Cross className="right-[-0.5px] bottom-[-0.5px] translate-x-1/2 translate-y-1/2" />
    </div>
  );
}

// Red pill label above a heading
function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-red-500">
      <span aria-hidden className="size-2 rounded-[1px] bg-red-500" />
      {children}
    </p>
  );
}

// Animated terminal typing
const CODE_LINES = [
  {
    text: "from qulf.plugins.oauth import OAuthPlugin",
    indent: 0,
    type: "import",
  },
  { text: "", indent: 0, type: "blank" },
  { text: "db = SQLAlchemyAdapter(session_maker)", indent: 0, type: "code" },
  { text: "", indent: 0, type: "blank" },
  { text: "auth = Qulf(", indent: 0, type: "code" },
  { text: "db=db,", indent: 4, type: "code" },
  { text: 'config=QulfConfig(secret_key="…"),', indent: 4, type: "code" },
  { text: "plugins=[OAuthPlugin()],", indent: 4, type: "code" },
  { text: ")", indent: 0, type: "code" },
  { text: "", indent: 0, type: "blank" },
  { text: "app = FastAPI()", indent: 0, type: "code" },
  {
    text: 'app.include_router(serve_qulf(auth), prefix="/api/auth")',
    indent: 0,
    type: "code",
  },
  { text: "", indent: 0, type: "blank" },
  {
    text: "# /sign-up, /sign-in, /sign-out +8 more routes live!",
    indent: 0,
    type: "comment",
  },
];

function TerminalCode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [caretLine, setCaretLine] = useState(0);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const delay =
      CODE_LINES[visibleLines]?.type === "blank"
        ? 80
        : CODE_LINES[visibleLines]?.type === "comment"
          ? 250
          : 120;
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCaretLine(visibleLines + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  function renderLine(
    line: (typeof CODE_LINES)[number],
    i: number,
    visible: boolean,
  ) {
    if (!visible) return null;
    const indent = " ".repeat(line.indent);
    if (line.type === "blank") return <div key={i} className="h-4" />;

    if (line.type === "import") {
      const [_from, ...rest] = line.text.split(" ");
      const joined = rest.join(" ");
      const importIdx = joined.indexOf("import");
      const mod = joined.slice(0, importIdx).trim();
      const names = joined.slice(importIdx + 7);
      return (
        <div
          key={i}
          className="flex items-baseline gap-0 font-mono text-[13px] leading-6"
        >
          <span className="text-red-400 font-semibold">from</span>
          <span className="text-neutral-500">&nbsp;{mod}&nbsp;</span>
          <span className="text-red-400 font-semibold">import</span>
          <span className="text-neutral-300">&nbsp;{names}</span>
          {i === caretLine - 1 && visibleLines < CODE_LINES.length && (
            <span className="ml-0.5 inline-block w-0.5 h-3.5 bg-red-400 animate-pulse" />
          )}
        </div>
      );
    }

    if (line.type === "comment") {
      return (
        <div
          key={i}
          className="font-mono text-[13px] leading-6 text-neutral-600"
        >
          {indent}
          {line.text}
        </div>
      );
    }

    return (
      <div key={i} className="font-mono text-[13px] leading-6 text-neutral-300">
        {indent}
        {line.text}
        {i === caretLine - 1 && visibleLines < CODE_LINES.length && (
          <span className="ml-0.5 inline-block w-0.5 h-3.5 bg-red-400 animate-pulse align-middle" />
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-800 bg-black overflow-hidden">
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-800">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-600 font-mono">main.py</span>
      </div>
      <div className="px-5 py-4 min-h-70">
        {CODE_LINES.map((line, i) => renderLine(line, i, i < visibleLines))}
        {visibleLines >= CODE_LINES.length && (
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-700">
            <span className="size-1.5 rounded-full bg-red-600 animate-ping" />
            Done — collecting sessions.
          </div>
        )}
      </div>
    </div>
  );
}

/*  Stats ticker  */
const STATS = [
  { value: "< 5 min", label: "to integrate" },
  { value: "MIT", label: "license" },
  { value: "100%", label: "typed" },
  { value: "0", label: "vendor lock-in" },
];

function StatsTicker() {
  return (
    <div className="grid grid-cols-2 gap-px bg-neutral-800 sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-neutral-950 px-6 py-5 text-center">
          <p className="text-2xl font-bold tracking-tight text-white">
            {s.value}
          </p>
          <p className="mt-1 text-xs text-neutral-500 uppercase tracking-widest">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/*  Interactive Pip Install Showcase  */
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

function PipInstallShowcase() {
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

export default function HomePage() {
  /* Capability index */
  const capabilityIndex = [
    {
      title: "Auth",
      dotClass: "bg-red-500",
      links: [
        { label: "Sign up / Sign in", href: "/docs/getting-started" },
        { label: "Sign out", href: "/docs/getting-started" },
        { label: "Sessions", href: "/docs/plugins" },
        { label: "Password reset", href: "/docs/core-concepts" },
        { label: "Account deletion", href: "/docs/core-concepts" },
        { label: "OAuth2", href: "/docs/plugins" },
        { label: "Magic links", href: "/docs/plugins" },
      ],
    },
    {
      title: "Security",
      dotClass: "bg-blue-500",
      links: [
        { label: "JWT tokens", href: "/docs/getting-started" },
        { label: "RBAC", href: "/docs/plugins" },
        { label: "Rate limiting", href: "/docs/plugins" },
        { label: "TOTP / 2FA", href: "/docs/plugins" },
        { label: "Audit-ready", href: "/docs" },
      ],
    },
    {
      title: "Integrations",
      dotClass: "bg-amber-500",
      links: [
        { label: "FastAPI", href: "/docs/frameworks/fastapi" },
        { label: "Litestar", href: "/docs/frameworks/litestar" },
        { label: "Django", href: "/docs/frameworks/django" },
        { label: "SQLAlchemy", href: "/docs/databases/sqlalchemy" },
        { label: "Motor (MongoDB)", href: "/docs/databases/motor" },
      ],
    },
    {
      title: "Developer",
      dotClass: "bg-violet-500",
      links: [
        { label: "Fully typed", href: "/docs" },
        { label: "Pydantic V2", href: "/docs" },
        { label: "Full docs", href: "/docs" },
        {
          label: "MIT license",
          href: `https://github.com/${config.git_user}/${config.repo}`,
          external: true,
        },
        {
          label: "Open source",
          href: `https://github.com/${config.git_user}/${config.repo}`,
          external: true,
        },
      ],
    },
  ];

  const integrations = [
    {
      name: "FastAPI",
      icon: <FastAPIIcon className="size-5" />,
      href: "/docs/frameworks/fastapi",
    },
    {
      name: "Litestar",
      icon: <LiteStarIcon className="size-5" />,
      href: "/docs/frameworks/litestar",
    },
    {
      name: "Django",
      icon: <DjangoIcon className="size-5" />,
      href: "/docs/frameworks/django",
    },
    {
      name: "Flask",
      icon: <FlaskIcon className="size-5" />,
      href: "/docs/frameworks/flask",
    },
    {
      name: "SQLAlchemy",
      icon: <SQLAlchemyIcon className="size-5" />,
      href: "/docs/databases/sqlalchemy",
    },
    {
      name: "SQLModel",
      icon: <Database className="size-5" />,
      href: "/docs/databases/sqlmodel",
    },
    {
      name: "Motor",
      icon: <MongoDBIcon className="size-5" />,
      href: "/docs/databases/motor",
    },
    {
      name: "Prisma",
      icon: <PrismaIcon className="size-5" />,
      href: "/docs/databases",
      dim: true,
    },
    {
      name: "OAuth2",
      icon: <KeySquare className="size-5" />,
      href: "/docs/plugins",
    },
    {
      name: "TOTP 2FA",
      icon: <Shield className="size-5" />,
      href: "/docs/plugins",
    },
    {
      name: "Magic Links",
      icon: <Zap className="size-5" />,
      href: "/docs/plugins",
    },
    { name: "RBAC", icon: <Lock className="size-5" />, href: "/docs/plugins" },
  ];

  const faqs = [
    {
      q: "How is Qulf different from other auth libraries?",
      a: "Most Python auth libs handle only one piece — sessions, or OAuth, or passwords. Qulf ships them all in one typed package with a consistent API. You mount one router and you're done.",
    },
    {
      q: "Which frameworks does Qulf support?",
      a: "FastAPI and Litestar are fully supported today. Django and Flask adapters are in active development. Because Qulf is framework-agnostic at its core, adding a new adapter is straightforward.",
    },
    {
      q: "Which databases work with Qulf?",
      a: "SQLAlchemy (sync & async), SQLModel, and Motor (MongoDB) ship out of the box. You bring your own session/connection — Qulf never touches your DB config directly.",
    },
    {
      q: "Is Qulf production-ready?",
      a: "Qulf is currently in public beta (v0.1.0b5). The core auth flows are stable and covered by extensive tests. Plugin APIs may have minor breaking changes before 1.0.",
    },
    {
      q: "Is Qulf open source?",
      a: "Yes. Every line of Qulf is on GitHub under the MIT license. No enterprise tier, no paywalled features.",
    },
    {
      q: "How long does integration take?",
      a: "For most FastAPI apps, under 5 minutes. Install the package, create a Qulf instance, mount the router, done. Sessions, sign-up, sign-in, and sign-out are available immediately.",
    },
  ];

  return (
    <>
      <main className="overflow-clip bg-neutral-950 text-white">
        {/*  1. HERO  */}
        <section className="border-b border-neutral-800" aria-label="Hero">
          <div className="relative mx-auto max-w-7xl border-x border-neutral-800">
            <GridCrosses />
            <div className="grid lg:grid-cols-12">
              {/* Left: badge + headline */}
              <div className="relative border-b border-neutral-800 lg:col-span-7 lg:border-b-0 lg:border-r px-5 py-16 sm:px-8 md:py-24 lg:px-10">
                {/* Graph paper accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.025) 1px,transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                      "linear-gradient(to bottom,black,transparent 90%)",
                  }}
                />
                {/* Red radial bloom */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(220,38,38,0.12), transparent)",
                  }}
                />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-900 bg-red-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-red-400">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                    </span>
                    Open Source · Python Auth
                  </div>
                  <h1 className="font-display-heading">
                    The Modern
                    <br />
                    <span className="text-red-500">Auth Library</span>
                    <br />
                    for Python
                  </h1>
                  <p className="mt-7 text-lg leading-8 text-neutral-400 max-w-md text-pretty">
                    Framework-agnostic, database-agnostic, heavily typed
                    authentication. All the features you need — none of the
                    lock-in.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/docs"
                      className="group inline-flex items-center justify-center gap-1 bg-red-600 px-6 py-3 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    >
                      Read the Docs
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                    <a
                      href={`https://github.com/${config.git_user}/${config.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-1.5 border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors duration-200 hover:border-neutral-500 hover:text-white"
                    >
                      GitHub
                      <ArrowRight
                        className="size-4 -rotate-45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </div>
                  <p className="mt-6 flex items-center gap-2 text-[11px] text-neutral-600">
                    {config.version} — beta ·{" "}
                    <code
                      onKeyDown={() =>
                        navigator.clipboard.writeText("pip install qulf")
                      }
                      className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-neutral-400"
                    >
                      pip install qulf
                    </code>
                  </p>
                </div>
              </div>

              {/* Right: terminal */}
              <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:col-span-5 lg:px-10 lg:py-12">
                <TerminalCode />
              </div>
            </div>

            {/* Stats ticker */}
            <div className="border-t border-neutral-800">
              <StatsTicker />
            </div>
          </div>
        </section>

        {/*  2. PRODUCT / FEATURE BENTO  */}
        <section
          className="border-b border-neutral-800"
          aria-labelledby="product-title"
        >
          <div className="relative mx-auto max-w-7xl border-x border-neutral-800">
            <GridCrosses />

            {/* Header row */}
            <div className="grid border-b border-neutral-800 lg:grid-cols-12">
              <div className="relative border-b border-neutral-800 bg-neutral-950 px-5 py-14 sm:px-8 md:py-20 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(220,38,38,0.08), transparent), linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px)",
                    backgroundSize: "100% 100%, 48px 48px, 48px 48px",
                    maskImage:
                      "linear-gradient(to bottom,black,transparent 90%),linear-gradient(to left,transparent,black 40px)",
                    maskComposite: "intersect",
                  }}
                />
                <div className="relative">
                  <SectionKicker>One unified library</SectionKicker>
                  <h2
                    id="product-title"
                    className="mt-4 font-display-subheading"
                  >
                    Stop stitching together auth libraries.
                  </h2>
                </div>
              </div>
              <div className="flex items-end px-5 py-10 sm:px-8 md:py-20 lg:col-span-5 lg:px-10">
                <p className="max-w-md text-lg leading-8 text-neutral-400 text-pretty">
                  Signup, sessions, OAuth2, 2FA, magic links, and RBAC — all in
                  one typed Python package. Drop it in, mount one router, done.
                </p>
              </div>
            </div>

            {/* Feature bento grid */}
            <div className="grid grid-cols-1 gap-px bg-neutral-800 lg:grid-cols-2">
              <FeatureCard
                icon={<Blocks className="size-5" />}
                title="Framework Agnostic"
                desc="Drop into FastAPI, Litestar, or Django with a single function call. Zero framework lock-in."
              >
                <MiniList
                  items={["FastAPI ✓", "Litestar ✓", "Django ✓", "Flask ✓"]}
                />
              </FeatureCard>
              <FeatureCard
                icon={<Plug className="size-5" />}
                title="Plugin-Driven"
                desc="Add OAuth, Magic Links, TOTP/2FA, and Rate Limiting via modular, composable plugins."
              >
                <MiniList
                  items={[
                    "OAuthPlugin()",
                    "MagicLinkPlugin()",
                    "TOTPPlugin()",
                    "RateLimitPlugin()",
                  ]}
                  mono
                />
              </FeatureCard>
              <FeatureCard
                icon={<Database className="size-5" />}
                title="Database Agnostic"
                desc="Works with SQLAlchemy, SQLModel, and Motor (MongoDB). Bring your own ORM."
              >
                <MiniList
                  items={[
                    "SQLAlchemy ✓",
                    "SQLModel ✓",
                    "Motor ✓",
                    "Prisma — coming soon",
                  ]}
                />
              </FeatureCard>
              <FeatureCard
                icon={<Type className="size-5" />}
                title="100% Typed"
                desc="Built with Pyright Strict and Pydantic V2. World-class IDE autocomplete throughout."
              >
                <MiniList
                  items={[
                    "Pyright Strict ✓",
                    "Pydantic V2 ✓",
                    "Full type stubs ✓",
                    "Inline docs ✓",
                  ]}
                />
              </FeatureCard>
            </div>
          </div>
        </section>

        {/*  3. CAPABILITY INDEX  */}
        <section
          className="border-b border-neutral-800"
          aria-labelledby="capability-title"
        >
          <div className="relative mx-auto max-w-7xl border-x border-neutral-800">
            <GridCrosses />
            <div className="flex flex-col gap-3 border-b border-neutral-800 px-5 py-10 sm:px-8 md:flex-row md:items-baseline md:justify-between md:gap-8 lg:px-10">
              <div>
                <SectionKicker>Modular Ecosystem</SectionKicker>
                <h2
                  id="capability-title"
                  className="mt-2 font-display-subheading"
                >
                  Everything in one pip install.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-neutral-400">
                Sessions, WebAuthn Passkeys, OAuth2, 2FA, Magic Links, and RBAC
                — shipped together, used individually.
              </p>
            </div>

            {/* Interactive installation preset switcher */}
            <PipInstallShowcase />

            <nav
              aria-label="Feature index"
              className="grid grid-cols-1 gap-px bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4"
            >
              {capabilityIndex.map((group) => (
                <div
                  key={group.title}
                  className="bg-neutral-950 px-5 py-6 sm:px-8 lg:px-6 xl:px-8"
                >
                  <h3 className="flex items-center gap-2.5 text-sm font-display font-semibold tracking-tight text-white">
                    <span
                      aria-hidden
                      className={`size-2 rounded-[1px] ${group.dotClass}`}
                    />
                    {group.title}
                  </h3>
                  <ul className="-mx-1.5 mt-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          {...("external" in link && link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group/link flex items-center justify-between gap-2 rounded-sm px-1.5 py-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                          {link.label}
                          <ArrowRight
                            className="size-3.5 shrink-0 text-neutral-700 transition-transform duration-200 group-hover/link:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </section>

        {/*  4. INTEGRATIONS  */}
        <section
          className="border-b border-neutral-800"
          aria-labelledby="integrations-title"
        >
          <div className="relative mx-auto grid max-w-7xl border-x border-neutral-800 lg:grid-cols-12">
            <GridCrosses />

            {/* Left sticky panel */}
            <div className="border-b border-neutral-800 px-5 py-16 sm:px-8 md:py-24 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-10">
              <div className="lg:sticky lg:top-24">
                <SectionKicker>Plug it in anywhere</SectionKicker>
                <h2
                  id="integrations-title"
                  className="mt-4 font-display-subheading"
                >
                  Made to meet your stack.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-7 text-neutral-400">
                  Install Qulf on the framework you already use. Most
                  integrations take only a few minutes.
                </p>
                {/* Inline pip install */}
                <div className="mt-10 max-w-sm rounded-lg border border-neutral-800 bg-black p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 text-neutral-600 mb-2 text-[11px]">
                    <span className="size-1.5 rounded-full bg-red-600" />
                    shell
                  </div>
                  <div>
                    <span className="text-neutral-500">$ </span>
                    <span className="text-neutral-300">pip install qulf</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-neutral-500">$ </span>
                    <span className="text-neutral-300">
                      pip install qulf[sqlalchemy,oauth]
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/docs/getting-started"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition-colors duration-200 hover:text-red-400"
                  >
                    Quick-start guide
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: integration grid */}
            <div className="lg:col-span-8">
              <div className="grid min-h-full grid-cols-2 gap-px bg-neutral-800 sm:grid-cols-3 xl:grid-cols-4">
                {integrations.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex min-h-20 items-center gap-3 bg-neutral-950 px-4 text-sm font-medium transition-colors duration-200 hover:bg-neutral-900 ${item.dim ? "text-neutral-700" : "text-neutral-400 hover:text-white"}`}
                  >
                    <span
                      className={`shrink-0 transition-colors duration-200 ${item.dim ? "text-neutral-800" : "text-neutral-600 group-hover:text-red-500"}`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                    {item.dim && (
                      <span className="ml-auto text-[10px] text-neutral-700">
                        soon
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*  5. FAQ  */}
        <section
          className="border-b border-neutral-800"
          aria-labelledby="faq-title"
        >
          <div className="relative mx-auto grid max-w-7xl border-x border-neutral-800 lg:grid-cols-12">
            <GridCrosses />

            {/* Right: accordion */}
            <div className="px-5 py-8 sm:px-8 md:py-12 lg:col-span-8 lg:px-10">
              <FAQAccordion items={faqs} />
            </div>

            {/* Left sticky */}
            <div className="border-b border-neutral-800 px-5 py-16 sm:px-8 md:py-24 lg:col-span-4 lg:px-10">
              <div className="lg:sticky lg:top-24">
                <h2 id="faq-title" className="mt-4 font-display-subheading">
                  Questions, answered plainly.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-7 text-neutral-400">
                  The things developers ask before adding Qulf to their project.
                </p>
                <Link
                  href="/docs"
                  className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition-colors duration-200 hover:text-red-400"
                >
                  Browse full docs
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/*  6. ARCHITECTURE DIAGRAM  */}
        <section
          className="border-b border-neutral-800"
          aria-labelledby="arch-title"
        >
          <div className="relative mx-auto max-w-7xl border-x border-neutral-800">
            <GridCrosses />

            {/* Header */}
            <div className="grid border-b border-neutral-800 lg:grid-cols-12">
              <div className="relative border-b border-neutral-800 bg-neutral-950 px-5 py-14 sm:px-8 md:py-20 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 0% 100%, rgba(220,38,38,0.07), transparent)",
                  }}
                />
                <div className="relative">
                  <SectionKicker>Architecture</SectionKicker>
                  <h2 id="arch-title" className="mt-4 font-display-subheading">
                    One library, fully connected.
                  </h2>
                  <p className="mt-6 max-w-sm text-base leading-7 text-neutral-400">
                    Every piece of Qulf talks to the same core engine —
                    frameworks, databases, plugins, sessions, security, and your
                    API surface all wired together out of the box.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      {
                        label: "FastAPI",
                        color: "text-blue-400 border-blue-900",
                      },
                      {
                        label: "SQLAlchemy",
                        color: "text-amber-400 border-amber-900",
                      },
                      {
                        label: "OAuth2",
                        color: "text-violet-400 border-violet-900",
                      },
                      { label: "JWT", color: "text-cyan-400 border-cyan-900" },
                      { label: "RBAC", color: "text-red-400 border-red-900" },
                      {
                        label: "OpenAPI",
                        color: "text-green-400 border-green-900",
                      },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-neutral-950 px-4 py-10 sm:px-6 lg:col-span-7 lg:px-8">
                <div
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.04), transparent), #0a0a0a",
                  }}
                >
                  <QulfArchDiagram />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  7. CTA  */}
        <section
          className="group relative overflow-hidden border-b border-red-900 bg-red-950"
          aria-label="Call to action"
        >
          {/* Grid paper */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom,black,transparent 92%)",
            }}
          />
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full"
          />
          <div className="relative mx-auto grid max-w-7xl border-x border-white/10 lg:grid-cols-12">
            <GridCrosses className="text-white/20" />

            <div className="relative z-10 border-b border-white/10 px-5 py-16 sm:px-8 md:py-24 lg:col-span-8 lg:border-b-0 lg:border-r lg:px-10">
              <h2 className="max-w-3xl text-4xl font-display font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl text-balance">
                Ready for better auth?
              </h2>
            </div>

            <div className="relative z-10 flex flex-col justify-center px-5 py-12 sm:px-8 lg:col-span-4 lg:px-10">
              <p className="max-w-md text-base leading-7 text-red-100/70">
                Open source, fully typed, live in minutes. No accounts, no
                pricing tiers, no vendor lock-in.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/docs/getting-started"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-red-950 transition-colors duration-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get Started
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <a
                  href={`https://github.com/${config.git_user}/${config.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  View on GitHub
                  <ExternalLink
                    className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
              <p className="mt-6 text-sm text-red-100/40">
                {config.version} — MIT license
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-6 bg-neutral-950 p-8 transition-colors duration-200 hover:bg-neutral-900/50 lg:p-10">
      <div>
        <div className="mb-4 text-neutral-600 transition-colors duration-200 group-hover:text-red-500">
          {icon}
        </div>
        <p className="text-base font-display font-semibold text-white">
          {title}
        </p>
        <p className="mt-1.5 text-sm leading-6 text-neutral-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function MiniList({ items, mono }: { items: string[]; mono?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-black">
      {items.map((item, i) => (
        <div
          key={item}
          className="flex items-center justify-between px-4 py-2.5 text-xs"
          style={{
            borderBottom:
              i < items.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : undefined,
            color: item.includes("soon") ? "#333" : "#777",
            fontFamily: mono ? "monospace" : undefined,
          }}
        >
          <span>{item}</span>
          {!item.includes("soon") && (
            <ChevronRight
              className="size-3 shrink-0 text-neutral-700"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t border-neutral-800">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-neutral-800">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-neutral-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:text-lg"
            aria-expanded={open === i}
          >
            {item.q}
            <ChevronRight
              className={`size-4 shrink-0 text-neutral-600 transition-transform duration-300 ${open === i ? "rotate-90 text-red-500" : ""}`}
              aria-hidden
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}
          >
            <p className="text-sm leading-7 text-neutral-400">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
