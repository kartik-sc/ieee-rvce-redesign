import { Wordmark } from "@/components/ui/wordmark";
import { branch, nav, societies, csitss } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-dark-bg text-dark-text">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)] py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <Wordmark variant="white" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dark-muted">
              {branch.longName}. {branch.motto}.
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
                  <a
                    href={link.href}
                    className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-dark-text">Societies</h3>
            <ul className="mt-4 space-y-3">
              {societies.map((s) => (
                <li key={s.id}>
                  <a
                    href="#societies"
                    className="text-sm text-dark-muted transition-colors hover:text-dark-text"
                  >
                    {s.abbr}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-dark-text">Connect</h3>
            <ul className="mt-4 space-y-3">
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
                  {csitss.name} {csitss.datesLabel.split(",")[1]?.trim()}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-dark-line pt-6 text-sm text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {branch.name}. All rights reserved.
          </p>
          <p>{branch.location}</p>
        </div>
      </div>
    </footer>
  );
}
