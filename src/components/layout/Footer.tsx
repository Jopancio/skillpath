"use client";

import Link from "next/link";
import { AtSign, Globe, GraduationCap, Share2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold gradient-text">
              {t.common.appName}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          <div className="mt-4 flex gap-2">
            {[Globe, AtSign, Share2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-primary hover:text-primary hover:shadow-soft"
                aria-label="Social media"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.learn}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/courses" className="transition-colors hover:text-primary">
                {t.nav.courses}
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="transition-colors hover:text-primary">
                {t.nav.dashboard}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.company}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                {t.footer.about}
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                {t.footer.contact}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {t.footer.rights}
      </div>
    </footer>
  );
}
