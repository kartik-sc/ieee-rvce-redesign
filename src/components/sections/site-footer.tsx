import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { branch, nav, societyHref } from "@/content/site";
import { societies } from "@/content/societies";
import { affinities } from "@/content/affinities";
import { csitss } from "@/content/csitss";

export function SiteFooter() {
  return (
    <footer className="bg-dark-bg text-dark-text">
      {/* pre-footer CTA */}
      <div className="border-b border-dark-line">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-6 px-[clamp(1.5rem,4vw,4.5rem)] py-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-h3 font-semibold tracking-tight text-balance">
            Ready to build with IEEE RVCE?
          </p>
          <ActionLink href="/membership" variant="cyan" size="lg" arrow>
            Become a member
          </ActionLink>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)] py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Wordmark variant="white" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dark-muted">
              {branch.motto}. A community of {branch.members} student engineers
              at {branch.college}, since {branch.foundedYear}.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-dark-muted">
              {branch.branchCode}
            </p>
          </div>

          <nav className="lg:col-span-2" aria-label="Explore">
            <h3 className="text-sm font-semibold text-dark-text">Explore</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Societies">
            <h3 className="text-sm font-semibold text-dark-text">Societies</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {societies.map((s) => (
                <li key={s.id}>
                  <Link
                    href={societyHref(s.id)}
                    className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                  >
                    {s.abbr}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-dark-text">Connect</h3>
            <ul className="mt-4 space-y-3">
              {affinities.map((a) => (
                <li key={a.id}>
                  <Link
                    href="/affinities"
                    className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                  >
                    {a.abbr}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${branch.email}`}
                  className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                >
                  {branch.email}
                </a>
              </li>
              <li>
                <a
                  href={csitss.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                >
                  {csitss.name} — {csitss.datesLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-dark-line pt-6 text-sm text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} IEEE RVCE. All rights reserved.</p>
          <p>{branch.address}</p>
        </div>
      </div>
    </footer>
  );
}
