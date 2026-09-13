import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ArticleCard } from "@/components/cards/article-card";
import { ActionLink } from "@/components/ui/action-link";
import { articles } from "@/content/articles";

const preview = articles.slice(0, 3);

export function ArticlesPreview() {
  return (
    <section className="bg-surface py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="section-rule mb-4 block" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
                Written by members
              </span>
            </div>
            <h2 className="text-h1 font-semibold tracking-tight text-text text-balance">
              <MaskReveal lines={["Ideas, research and", "experiences, in members' words."]} />
            </h2>
          </div>
          <ActionLink href="/articles" variant="ghost" arrow className="shrink-0">
            Read articles
          </ActionLink>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {preview.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.08}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
