import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";
import { branch } from "@/content/site";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-ieee-blue py-24 text-white md:py-32"
    >
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
        <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-h1 font-semibold tracking-tight text-balance">
              Build with a branch that takes engineering seriously.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/80 text-pretty">
              Whether you are drawn to robotics, signals, communications or
              sensing, there is a place for you at IEEE RVCE. Reach out and
              we&apos;ll help you find your chapter.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <a
              href={`mailto:${branch.email}`}
              className="font-mono text-lg text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              {branch.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
              <ActionLink href={`mailto:${branch.email}`} variant="inverse">
                Email the branch
              </ActionLink>
              <ActionLink
                href="#societies"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
              >
                Explore societies
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
