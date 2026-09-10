"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArticleCard } from "@/components/cards/article-card";
import { articles, articleCategories, featuredArticle } from "@/content/articles";
import { cn } from "@/lib/utils";

export function ArticlesExplorer() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("All");

  const rest = useMemo(
    () => articles.filter((a) => a.title !== featuredArticle.title),
    [],
  );
  const results = useMemo(
    () => (active === "All" ? rest : rest.filter((a) => a.category === active)),
    [active, rest],
  );

  return (
    <section className="bg-bg py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* featured */}
        <article className="grid gap-8 border-b border-line pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-ieee-blue">
              Featured · {featuredArticle.category}
            </span>
            <h2 className="mt-4 text-h1 font-semibold leading-[1.05] tracking-tight text-brand-deep text-balance">
              {featuredArticle.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted text-pretty">
              {featuredArticle.excerpt}
            </p>
            <p className="mt-6 text-sm font-medium text-brand-deep">
              {featuredArticle.author}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div
              className="flex h-full min-h-56 items-end rounded-none border border-line p-8"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in oklab, var(--ieee-blue) 12%, var(--surface)), var(--surface))",
              }}
            >
              <span className="font-mono text-sm text-text-muted">
                {featuredArticle.category}
              </span>
            </div>
          </div>
        </article>

        {/* filter */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter articles by category"
        >
          {articleCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === c
                  ? "border-ieee-blue bg-ieee-blue text-white"
                  : "border-line text-text-muted hover:border-ieee-blue hover:text-ieee-blue",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div
          layout={!reduced}
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {results.map((article) => (
              <motion.div
                key={article.title}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
