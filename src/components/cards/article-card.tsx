import type { Article } from "@/content/articles";
import { cn } from "@/lib/utils";

const categoryAccent: Record<string, string> = {
  Research: "var(--ieee-blue)",
  Feature: "var(--accent-purple)",
  Technical: "var(--accent-teal)",
  Experience: "var(--accent-amber)",
};

const faceGradient =
  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 62%, #000))";

/**
 * Article card — squared "wallet card" with a slim category face over an
 * editorial body (title, excerpt, author). No fabricated cover imagery.
 */
export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const accent = categoryAccent[article.category] ?? "var(--ieee-blue)";
  return (
    <article
      style={{ "--accent": accent } as React.CSSProperties}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-none border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[8px_8px_0_-1px_var(--accent)]",
        className,
      )}
    >
      {/* card face */}
      <div
        className="flex items-center justify-between px-5 py-3 text-white"
        style={{ background: faceGradient }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.14em]">
          {article.category}
        </span>
        <span className="h-2 w-2 rounded-full bg-white/70" aria-hidden />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 font-semibold leading-tight tracking-tight text-brand-deep text-pretty transition-colors group-hover:text-[var(--accent)]">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {article.excerpt}
        </p>
        <p className="mt-auto pt-6 text-sm font-medium text-brand-deep">
          {article.author}
        </p>
      </div>
    </article>
  );
}
