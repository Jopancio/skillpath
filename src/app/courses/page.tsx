"use client";

import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import type { Category, Difficulty } from "@/data/types";
import { CourseCard } from "@/components/course/CourseCard";
import { AICourseDialog } from "@/components/ui/AICourseDialog";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Category, { id: string; en: string }> = {
  culinary: { id: "Kuliner", en: "Culinary" },
  creative: { id: "Kreatif", en: "Creative" },
  marketing: { id: "Marketing", en: "Marketing" },
  tech: { id: "Teknologi", en: "Tech" },
  service: { id: "Jasa", en: "Service" },
};

const difficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];

export default function CoursesPage() {
  const { t, locale } = useI18n();
  const { allCourses, addCourse } = useCustomCourses();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [level, setLevel] = useState<Difficulty | "all">("all");
  const [aiOpen, setAiOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(allCourses.map((c) => c.category))),
    [allCourses]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCourses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (level !== "all" && c.difficulty !== level) return false;
      if (!q) return true;
      return (
        c.title.id.toLowerCase().includes(q) ||
        c.title.en.toLowerCase().includes(q) ||
        c.description.id.toLowerCase().includes(q) ||
        c.description.en.toLowerCase().includes(q)
      );
    });
  }, [allCourses, query, category, level]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {t.courses.catalogTitle}
      </h1>
      <p className="mt-2 text-muted">{t.courses.catalogSubtitle}</p>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.courses.search}
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </label>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted" />
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            {t.courses.allCategories}
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
            >
              {pick(locale, categoryLabels[c])}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        <FilterChip active={level === "all"} onClick={() => setLevel("all")}>
          {t.courses.allLevels}
        </FilterChip>
        {difficulties.map((d) => (
          <FilterChip key={d} active={level === d} onClick={() => setLevel(d)}>
            {t.common[d]}
          </FilterChip>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}

          {/* Add-new-skill card (last position) */}
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className="group flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card/60 p-6 text-center transition-all hover:border-primary/60 hover:bg-primary/5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft transition-transform group-hover:scale-110">
              <Plus className="h-7 w-7" />
            </span>
            <span className="font-display text-lg font-bold text-foreground group-hover:text-primary">
              {t.courses.addSkillButton}
            </span>
            <span className="max-w-[220px] text-xs leading-relaxed text-muted">
              {t.courses.addSkillDesc}
            </span>
          </button>
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted">
          {t.courses.noResult}
        </div>
      )}

      {/* Add-new-skill modal */}
      <AICourseDialog
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onCreated={(course) => {
          addCourse(course);
          setAiOpen(false);
        }}
      />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors",
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-card text-muted hover:border-primary hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}
