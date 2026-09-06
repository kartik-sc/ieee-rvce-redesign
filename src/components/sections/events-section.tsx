import { SectionShell, SectionIntro } from "@/components/ui/section-shell";
import { MediaFrame } from "@/components/ui/media-frame";
import { participation } from "@/content/site";

export function EventsSection() {
  return (
    <SectionShell id="participate" background="bg">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionIntro
            label="Get involved"
            title="Ways to take part."
            lead="Membership is hands-on. These are the paths members take through the branch."
          />

          <ul className="mt-12 border-t border-line">
            {participation.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:w-1/3">
                  <span
                    className="h-2 w-2 rounded-full bg-ieee-cyan"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold text-brand-deep">
                    {p.title}
                  </h3>
                </div>
                <p className="text-text-muted text-pretty sm:flex-1">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <MediaFrame
              tone="deep"
              aspect="4 / 5"
              caption="Workshops, chapters and CSITSS"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
