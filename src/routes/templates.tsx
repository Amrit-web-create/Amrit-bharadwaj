import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CATEGORIES, LOOKS, designFromLook, type Look } from "@/lib/qr/looks";
import { renderMark } from "@/lib/qr/render";
import { useStudio } from "@/lib/qr/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Aurel" },
      { name: "description", content: "Fifty-six ready QR looks. Choose one and open it in the studio." },
    ],
  }),
  component: Templates,
});

function Templates() {
  const navigate = useNavigate();
  const applyLook = useStudio((s) => s.applyLook);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOOKS.filter((look) => {
      if (category !== "All" && look.category !== category) return false;
      if (!q) return true;
      return `${look.name} ${look.palette} ${look.category} ${look.caption}`.toLowerCase().includes(q);
    });
  }, [query, category]);

  function useLook(look: Look) {
    applyLook(look);
    void navigate({ to: "/studio" });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-widest text-rose uppercase">Templates</p>
      <h1 className="display mt-3 max-w-3xl text-5xl sm:text-6xl">Fifty-six looks, already in good clothes.</h1>
      <p className="mt-5 max-w-2xl text-lg text-rose">
        These are not buried inside the studio. Pick a card — a vow, a ferry, a listening bar, a proof — and it becomes the mark. Your link stays. You can still change every control after.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <label className="sr-only" htmlFor="look-search">
          Search templates
        </label>
        <input
          id="look-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search night, vow, cafe, ink…"
          className="w-full rounded-full border border-linen bg-paper px-5 py-3 outline-none"
        />
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categories">
          {["All", ...CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm transition-transform duration-150 active:scale-[0.96]",
                category === item ? "bg-ink text-cream" : "bg-paper text-ink border border-linen",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-sm text-blush">{shown.length} templates</p>
      </div>
      {shown.length === 0 ? (
        <p className="mt-10 text-rose">Nothing under that name. Try cafe, night, or vow.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((look) => (
            <article key={look.id} className="flex flex-col rounded-card border border-linen bg-paper p-4">
              <Mini look={look} />
              <p className="mt-4 text-xs tracking-widest text-blush uppercase">{look.category}</p>
              <h2 className="display mt-1 text-3xl">{look.name}</h2>
              <p className="mt-1 text-sm text-rose">
                {look.palette}
                <span className="text-blush"> · {look.caption}</span>
              </p>
              <button
                type="button"
                onClick={() => useLook(look)}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 active:scale-[0.96]"
              >
                Use this look
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Mini({ look }: { look: Look }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: "240px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !canvas.current) return;
    const design = designFromLook(look, "https://aurel.studio", false);
    design.size = 220;
    void renderMark(canvas.current, design, 1);
  }, [visible, look]);

  return (
    <div ref={wrap} className="overflow-hidden rounded-2xl bg-linen">
      <canvas ref={canvas} className="block h-auto w-full" aria-hidden />
    </div>
  );
}
