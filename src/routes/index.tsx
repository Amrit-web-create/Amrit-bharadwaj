import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Link2 } from "lucide-react";
import { QrView } from "@/components/qr-view";
import { LOOKS } from "@/lib/qr/looks";
import { normalizeTarget } from "@/lib/qr/text";
import { useStudio } from "@/lib/qr/store";
import { defaultDesign, type Design } from "@/lib/qr/types";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurel — QR Atelier" },
      {
        name: "description",
        content: "Paste a link. Shape a scannable mark. Export PNG or JPG from a quiet studio built for cards, menus, and posters.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const patch = useStudio((s) => s.patch);
  const [value, setValue] = useState(defaultDesign.data);
  const [error, setError] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const sync = () => setValue(useStudio.getState().data);
    if (useStudio.persist.hasHydrated()) sync();
    return useStudio.persist.onFinishHydration(sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      setShift(Math.max(-18, Math.min(18, (window.scrollY - mid) * 0.04)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const live = useMemo<Design>(
    () => ({
      ...defaultDesign,
      data: normalizeTarget(value) || "https://aurel.studio",
      showCaption: true,
      caption: "A mark worth scanning",
      captionSub: "Aurel atelier",
      size: 320,
    }),
    [value],
  );

  function generate() {
    const next = normalizeTarget(value);
    if (!next) {
      setError("Add a link or a line of text.");
      return;
    }
    setError(null);
    patch({ data: next });
    void navigate({ to: "/studio" });
  }

  return (
    <main>
      <section
        className="relative overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: (e.clientX - r.left) / r.width - 0.5,
            y: (e.clientY - r.top) / r.height - 0.5,
          });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <p
          aria-hidden
          className="ghost-word display pointer-events-none absolute -top-8 right-0 hidden text-linen select-none lg:block"
          style={{ transform: `translateY(${shift}px)` }}
        >
          Aurel
        </p>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
          <div>
            <p className="rise text-xs tracking-widest text-rose uppercase">QR atelier</p>
            <h1 className="display rise mt-4 text-5xl text-ink sm:text-7xl" style={{ animationDelay: "80ms" }}>
              Make the mark
              <span className="block italic text-rose">feel considered.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-rose" style={{ animationDelay: "160ms" }}>
              Aurel is a quiet studio for QR codes — the kind you put on a card, a menu, a poster, a window. Not a generator that looks like a settings page. Paste a destination, then shape the code until it belongs to the work.
            </p>
            <p className="rise mt-4 max-w-xl text-base text-ink/80" style={{ animationDelay: "220ms" }}>
              Fifty-six colour pairings. Modules from strict squares to soft dots. A centre mark for Instagram, Facebook, WhatsApp, a website, or a picture from your gallery. Grounds that sit small, centred, or full-bleed. Export a real PNG or JPG. The code still scans.
            </p>
          </div>
          <div className="float-y rise" style={{ animationDelay: "200ms" }}>
            <div
              className="tilt"
              style={{ transform: `rotateY(${tilt.x * 10}deg) rotateX(${tilt.y * -8}deg)` }}
            >
              <QrView design={live} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <label htmlFor="destination" className="text-sm text-rose">
          Where should this mark lead?
        </label>
        <form
          className="mt-3 flex flex-col gap-2 rounded-card border border-linen bg-paper p-2 shadow-lift sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            generate();
          }}
        >
          <div className="flex min-h-14 flex-1 items-center gap-3 px-3">
            <Link2 className="size-5 shrink-0 text-blush" aria-hidden />
            <input
              id="destination"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://your-site.com"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full bg-transparent py-3 text-lg outline-none placeholder:text-sand"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-cream transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            Generate
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </form>
        <p className={cn("mt-3 text-sm", error ? "text-rose" : "text-blush")}>
          {error ??
            "Links, phone numbers, and plain sentences all work. Generate carries this destination into the studio."}
        </p>
      </section>

      <Motions />
      <Rooms />
      <PaletteRail />
      <TemplateTease />
    </main>
  );
}

function Motions() {
  return (
    <section className="border-t border-linen bg-paper/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-widest text-rose uppercase">Motion, kept quiet</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">Six gestures. None of them decoration for its own sake.</h2>
        <p className="mt-4 max-w-2xl text-rose">
          Hover, a loader, a turn in light, an entrance, a press, a shift in depth. They are how this site moves — and how the studio should feel when you change a colour or export a file.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="group rounded-card border border-linen bg-cream p-5">
            <p className="text-xs tracking-widest text-blush uppercase">Hover</p>
            <h3 className="display mt-2 text-3xl">Cards that acknowledge a hand</h3>
            <div className="relative mt-6 h-36">
              <div className="absolute top-8 left-4 h-20 w-32 rounded-2xl bg-blush transition-transform duration-300 ease-out group-hover:-translate-x-3 group-hover:-rotate-12" />
              <div className="absolute top-6 left-10 h-20 w-32 rounded-2xl bg-sand transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:rotate-6" />
              <div className="absolute top-3 left-8 flex h-20 w-36 items-end rounded-2xl bg-paper p-3 shadow-lift transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <span className="text-sm font-medium">Preferences</span>
              </div>
            </div>
          </article>
          <article className="rounded-card border border-linen bg-cream p-5">
            <p className="text-xs tracking-widest text-blush uppercase">Loader</p>
            <h3 className="display mt-2 text-3xl">A line, then the room</h3>
            <p className="mt-3 text-sm text-rose">The atelier announces itself once, then gets out of the way.</p>
            <div className="mt-8 h-px w-full bg-linen">
              <div className="load-rule h-px w-full bg-ink" />
            </div>
          </article>
          <article className="rounded-card border border-linen bg-ink p-5 text-cream">
            <p className="text-xs tracking-widest text-sand uppercase">3D motion</p>
            <h3 className="display mt-2 text-3xl text-cream">A mark that turns in light</h3>
            <div className="relative mt-6 grid h-36 place-items-center">
              <div className="spin-slow absolute size-32 rounded-full border border-dashed border-sand" />
              <div className="orb size-20 rounded-full shadow-lift" />
            </div>
          </article>
          <article className="rounded-card border border-linen bg-cream p-5">
            <p className="text-xs tracking-widest text-blush uppercase">Entrance</p>
            <h3 className="display mt-2 text-3xl">Type that arrives</h3>
            <p className="rise mt-6 font-serif text-2xl italic text-rose">Not a pop. A reveal.</p>
          </article>
          <article className="rounded-card border border-linen bg-cream p-5">
            <p className="text-xs tracking-widest text-blush uppercase">Micro</p>
            <h3 className="display mt-2 text-3xl">Buttons with a pulse</h3>
            <MicroDemo />
          </article>
          <article className="relative overflow-hidden rounded-card border border-linen bg-linen p-5">
            <ParallaxCard />
          </article>
        </div>
      </div>
    </section>
  );
}

function shiftStyle(n: number) {
  return n;
}

function ParallaxCard() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(Math.max(-16, Math.min(16, (window.scrollY % 400) * 0.04 - 8)));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <p
        aria-hidden
        className="display pointer-events-none absolute -right-2 -bottom-6 text-7xl text-sand"
        style={{ transform: `translateY(${y * 1.8}px)` }}
      >
        Depth
      </p>
      <div className="relative" style={{ transform: `translateY(${y}px)` }}>
        <p className="text-xs tracking-widest text-rose uppercase">Parallax</p>
        <h3 className="display mt-2 text-3xl">Layers that do not share a speed</h3>
        <p className="mt-3 max-w-xs text-sm text-rose">The word behind this card drifts on its own. The headline stays put.</p>
      </div>
    </div>
  );
}

function MicroDemo() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 ease-out active:scale-[0.96]"
    >
      <span
        className={cn(
          "grid size-6 place-items-center rounded-full transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          on ? "scale-100 bg-cream opacity-100 blur-none" : "scale-[0.25] bg-sand opacity-70 blur-[4px]",
        )}
        aria-hidden
      />
      {on ? "Bold, on" : "Press for bold"}
    </button>
  );
}

function Rooms() {
  const rooms = [
    {
      n: "01",
      title: "Home",
      body: "The bar at the top of the house takes a link, a number, or a sentence. Generate opens the studio with that destination already set. Nothing else is asked of you.",
    },
    {
      n: "02",
      title: "Templates",
      body: "Fifty-six ready looks live on their own floor — cafe cards, night lists, vows, editorial proofs. Choose one and it dresses the mark. The studio does not hide them in a drawer.",
    },
    {
      n: "03",
      title: "Studio",
      body: "Shape, size, quiet margin, colour, centre icon, background, and the words on the card. Bold, italic, caps, serif or sans. Then a real PNG or JPG, drawn in the browser.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="display text-4xl sm:text-5xl">Three rooms. Full control in one of them.</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {rooms.map((room) => (
          <article key={room.n} className="border-t border-ink pt-4">
            <p className="text-xs tracking-widest text-blush uppercase">{room.n}</p>
            <h3 className="display mt-2 text-3xl">{room.title}</h3>
            <p className="mt-3 text-sm text-rose">{room.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaletteRail() {
  const sample = LOOKS.slice(0, 8);
  return (
    <section className="border-t border-linen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-rose uppercase">From the rose sheet</p>
            <h2 className="display mt-2 text-4xl">Ink, blush, sand, cream.</h2>
          </div>
          <p className="max-w-md text-sm text-rose">
            The house palette is one family. The codes may wear any of the fifty-six pairings — night, coast, ceremony, signal — as long as the contrast holds.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {sample.map((look) => (
            <div key={look.id} className="overflow-hidden rounded-2xl border border-linen">
              <div className="h-16" style={{ background: look.bg }} />
              <div className="h-8" style={{ background: look.fg }} />
              <p className="bg-paper px-2 py-2 text-xs">{look.palette}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateTease() {
  const picks = [LOOKS[0], LOOKS[14], LOOKS[35], LOOKS[42], LOOKS[21], LOOKS[49]].filter(Boolean);
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="display text-4xl sm:text-5xl">Looks, already dressed.</h2>
        <Link
          to="/templates"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-cream transition-transform duration-150 active:scale-[0.96]"
        >
          All templates
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((look) =>
          look ? (
            <Link
              key={look.id}
              to="/templates"
              className="flex items-center justify-between rounded-2xl border border-linen bg-paper px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span>
                <span className="block text-xs tracking-widest text-blush uppercase">{look.category}</span>
                <span className="display mt-1 block text-2xl">{look.name}</span>
              </span>
              <span className="flex h-12 w-16 overflow-hidden rounded-xl border border-linen">
                <span className="w-1/2" style={{ background: look.fg }} />
                <span className="w-1/2" style={{ background: look.bg }} />
              </span>
            </Link>
          ) : null,
        )}
      </div>
    </section>
  );
}
