import { SectionShell, SectionIntro } from "@/components/ui/section-shell";
import { branch, milestones } from "@/content/site";

export function AboutSection() {
  return (
    <SectionShell id="about" background="surface">
      <SectionIntro
        label="Since 2017"
        title="A student branch, built deliberately."
        lead={`From its founding at RV College of Engineering to a community of ${branch.members} members, IEEE RVCE has grown around one idea — technology in the service of people.`}
      />

      <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <li key={m.title} className="flex flex-col bg-surface p-7">
            <span className="font-mono text-lg font-semibold text-ieee-blue">
              {m.year}
            </span>
            <span className="mt-5 text-base font-semibold text-brand-deep">
              {m.title}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-text-muted text-pretty">
              {m.detail}
            </span>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
