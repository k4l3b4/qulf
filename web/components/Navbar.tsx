"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { config } from "@/lib/shared";
import { QulfLogoIcon } from "./icons";

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

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between border-x border-neutral-800 px-5 sm:px-8 lg:px-10"
        aria-label="Global"
      >
        <Link
          href="/"
          className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Qulf home"
        >
          <QulfWordmark />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="/docs/plugins"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Plugins
          </Link>
          <a
            href={`https://github.com/${config.git_user}/${config.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/docs/getting-started"
            className="inline-flex h-8 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">
            {mobileMenuOpen ? "Close main menu" : "Open main menu"}
          </span>
          {mobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 lg:hidden">
          <div className="mx-auto max-w-7xl border-x border-neutral-800 px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-4">
              <Link
                href="/docs"
                className="block text-base font-medium text-neutral-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/docs/plugins"
                className="block text-base font-medium text-neutral-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plugins
              </Link>
              <a
                href={`https://github.com/${config.git_user}/${config.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-medium text-neutral-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </a>
              <div className="pt-4 border-t border-neutral-800">
                <Link
                  href="/docs/getting-started"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
