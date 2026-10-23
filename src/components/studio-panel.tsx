import { useRef, useState, type ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import { ImagePlus, X } from "lucide-react";
import { LOOKS } from "@/lib/qr/looks";
import { shrinkImage } from "@/lib/qr/image";
import { useStudio } from "@/lib/qr/store";
import type { EyeShape, GroundMode, MarkKind, ModuleShape } from "@/lib/qr/types";
import { cn } from "@/lib/cn";

const SHAPES: { id: ModuleShape; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "rounded", label: "Rounded" },
  { id: "squircle", label: "Soft" },
  { id: "dot", label: "Dot" },
  { id: "diamond", label: "Diamond" },
];

const EYES: { id: EyeShape; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "rounded", label: "Rounded" },
  { id: "circle", label: "Circle" },
  { id: "leaf", label: "Leaf" },
];

const MARKS: { id: MarkKind; label: string }[] = [
  { id: "none", label: "None" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "web", label: "Website" },
  { id: "upload", label: "Gallery" },
];

const GROUNDS: { id: GroundMode; label: string }[] = [
  { id: "off", label: "Plain" },
  { id: "small", label: "Small" },
  { id: "center", label: "Centre" },
  { id: "full", label: "Full" },
];

function Section({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-linen pt-6">
      <p className="text-xs tracking-widest text-blush uppercase">{kicker}</p>
      <h2 className="display mt-1 text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Choice({
  active,
  label,
  name,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  name?: string;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={name ?? label}
      className={cn(
        "flex min-h-11 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-xs font-medium transition-transform duration-150 ease-out active:scale-[0.96]",
        active ? "border-ink bg-ink text-cream" : "border-linen bg-paper text-ink hover:border-sand",
      )}
    >
      {children}
      {label}
    </button>
  );
}

function ShapeGlyph({ id }: { id: ModuleShape }) {
  const common = "fill-current";
  if (id === "dot") return <svg viewBox="0 0 24 24" className="size-5" aria-hidden><circle className={common} cx="12" cy="12" r="6" /></svg>;
  if (id === "diamond") return <svg viewBox="0 0 24 24" className="size-5" aria-hidden><path className={common} d="M12 3 21 12 12 21 3 12Z" /></svg>;
  const r = id === "square" ? 1 : id === "rounded" ? 4 : 7;
  return <svg viewBox="0 0 24 24" className="size-5" aria-hidden><rect className={common} x="4" y="4" width="16" height="16" rx={r} /></svg>;
}

export function StudioPanel() {
  const design = useStudio(
    useShallow((s) => ({
      data: s.data,
      module: s.module,
      eye: s.eye,
      size: s.size,
      quiet: s.quiet,
      mark: s.mark,
      markScale: s.markScale,
      ground: s.ground,
      fg: s.fg,
      bg: s.bg,
      paletteId: s.paletteId,
      caption: s.caption,
      captionSub: s.captionSub,
      captionBold: s.captionBold,
      captionItalic: s.captionItalic,
      captionCaps: s.captionCaps,
      captionFont: s.captionFont,
      showCaption: s.showCaption,
      markDataUrl: s.markDataUrl,
      groundDataUrl: s.groundDataUrl,
    })),
  );
  const patch = useStudio((s) => s.patch);
  const applyPalette = useStudio((s) => s.applyPalette);
  const markInput = useRef<HTMLInputElement>(null);
  const groundInput = useRef<HTMLInputElement>(null);
  const [fileNote, setFileNote] = useState<string | null>(null);

  async function onFile(file: File | undefined, slot: "mark" | "ground") {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileNote("Use a JPG or PNG.");
      return;
    }
    if (file.size > 8_000_000) {
      setFileNote("That file is over 8MB. Try a smaller picture.");
      return;
    }
    try {
      const url = await shrinkImage(file, slot === "mark" ? 640 : 1200);
      if (slot === "mark") patch({ mark: "upload", markDataUrl: url });
      else patch({ groundDataUrl: url, ground: design.ground === "off" ? "center" : design.ground });
      setFileNote(null);
    } catch (error) {
      setFileNote(error instanceof Error ? error.message : "Could not read that picture.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Section kicker="01 — Content" title="Where it leads">
        <label className="block text-sm text-rose" htmlFor="qr-data">
          Link, phone, or a sentence
        </label>
        <textarea
          id="qr-data"
          value={design.data}
          onChange={(e) => patch({ data: e.target.value })}
          rows={3}
          className="mt-2 w-full resize-none rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
        />
      </Section>

      <Section kicker="02 — Form" title="Shape and scale">
        <p className="mb-2 text-sm text-rose">Modules</p>
        <div className="grid grid-cols-5 gap-2">
          {SHAPES.map((shape) => (
            <Choice key={shape.id} active={design.module === shape.id} label={shape.label} name={`${shape.label} modules`} onClick={() => patch({ module: shape.id })}>
              <ShapeGlyph id={shape.id} />
            </Choice>
          ))}
        </div>
        <p className="mt-4 mb-2 text-sm text-rose">Eyes</p>
        <div className="grid grid-cols-4 gap-2">
          {EYES.map((eye) => (
            <Choice key={eye.id} active={design.eye === eye.id} label={eye.label} name={`${eye.label} eyes`} onClick={() => patch({ eye: eye.id })} />
          ))}
        </div>
        <label className="mt-5 flex items-center justify-between text-sm" htmlFor="qr-size">
          <span>Size</span>
          <span className="text-rose">{design.size}px</span>
        </label>
        <input
          id="qr-size"
          type="range"
          min={220}
          max={640}
          step={10}
          value={design.size}
          onChange={(e) => patch({ size: Number(e.target.value) })}
          className="mt-2 w-full accent-ink"
        />
        <label className="mt-4 flex items-center justify-between text-sm" htmlFor="qr-quiet">
          <span>Quiet margin</span>
          <span className="text-rose">{design.quiet}</span>
        </label>
        <input
          id="qr-quiet"
          type="range"
          min={2}
          max={6}
          step={1}
          value={design.quiet}
          onChange={(e) => patch({ quiet: Number(e.target.value) })}
          className="mt-2 w-full accent-ink"
        />
      </Section>

      <Section kicker="03 — Colour" title="Fifty-six pairings">
        <p className="mb-3 text-sm text-rose">Foreground and ground, chosen as a pair. Or set each yourself.</p>
        <div className="grid max-h-64 grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-8">
          {LOOKS.map((look) => (
            <button
              key={look.id}
              type="button"
              title={`${look.palette} — ${look.name}`}
              aria-label={`${look.palette}, ${look.fg} on ${look.bg}`}
              aria-pressed={design.paletteId === look.id}
              onClick={() => applyPalette(look)}
              className={cn(
                "relative h-11 overflow-hidden rounded-full border transition-transform duration-150 ease-out active:scale-[0.96]",
                design.paletteId === look.id ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-cream" : "border-linen",
              )}
            >
              <span className="absolute inset-y-0 left-0 w-1/2" style={{ background: look.fg }} />
              <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: look.bg }} />
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="flex items-center gap-3 rounded-2xl border border-linen bg-paper px-3 py-2 text-sm">
            <input
              type="color"
              value={design.fg}
              aria-label="Foreground colour"
              onChange={(e) => patch({ fg: e.target.value, paletteId: null })}
              className="size-11 rounded-full border border-linen bg-transparent"
            />
            Foreground
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-linen bg-paper px-3 py-2 text-sm">
            <input
              type="color"
              value={design.bg}
              aria-label="Background colour"
              onChange={(e) => patch({ bg: e.target.value, paletteId: null })}
              className="size-11 rounded-full border border-linen bg-transparent"
            />
            Background
          </label>
        </div>
      </Section>

      <Section kicker="04 — Mark" title="Centre icon">
        <div className="grid grid-cols-3 gap-2">
          {MARKS.map((mark) => (
            <Choice
              key={mark.id}
              active={design.mark === mark.id}
              label={mark.label}
              onClick={() => {
                if (mark.id === "upload") markInput.current?.click();
                else patch({ mark: mark.id });
              }}
            />
          ))}
        </div>
        <input
          ref={markInput}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(e) => {
            void onFile(e.target.files?.[0], "mark");
            e.target.value = "";
          }}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => markInput.current?.click()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-linen bg-paper px-4 text-sm transition-transform duration-150 active:scale-[0.96]"
          >
            <ImagePlus className="size-4" aria-hidden />
            Upload from gallery
          </button>
          {design.markDataUrl ? (
            <button
              type="button"
              onClick={() => patch({ markDataUrl: null, mark: design.mark === "upload" ? "none" : design.mark })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-rose"
            >
              <X className="size-4" aria-hidden />
              Remove
            </button>
          ) : null}
        </div>
        <label className="mt-4 flex items-center justify-between text-sm" htmlFor="mark-scale">
          <span>Icon size</span>
          <span className="text-rose">{Math.round(design.markScale * 100)}%</span>
        </label>
        <input
          id="mark-scale"
          type="range"
          min={16}
          max={30}
          step={1}
          value={Math.round(design.markScale * 100)}
          onChange={(e) => patch({ markScale: Number(e.target.value) / 100 })}
          className="mt-2 w-full accent-ink"
        />
      </Section>

      <Section kicker="05 — Ground" title="Picture behind">
        <div className="grid grid-cols-4 gap-2">
          {GROUNDS.map((ground) => (
            <Choice key={ground.id} active={design.ground === ground.id} label={ground.label} name={`${ground.label} background`} onClick={() => patch({ ground: ground.id })} />
          ))}
        </div>
        <p className="mt-3 text-sm text-rose">
          Small sits like a stamp. Centre is a plate. Full bleeds the photo to the edge and veils the code so it still scans.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => groundInput.current?.click()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-linen bg-paper px-4 text-sm transition-transform duration-150 active:scale-[0.96]"
          >
            <ImagePlus className="size-4" aria-hidden />
            Upload background
          </button>
          {design.groundDataUrl ? (
            <button
              type="button"
              onClick={() => patch({ groundDataUrl: null, ground: "off" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-rose"
            >
              <X className="size-4" aria-hidden />
              Clear
            </button>
          ) : null}
        </div>
        <input
          ref={groundInput}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(e) => {
            void onFile(e.target.files?.[0], "ground");
            e.target.value = "";
          }}
        />
        {fileNote ? <p className="mt-2 text-sm text-rose">{fileNote}</p> : null}
      </Section>

      <Section kicker="06 — Lettering" title="Words on the card">
        <label className="block text-sm text-rose" htmlFor="cap">
          Main line
        </label>
        <input
          id="cap"
          value={design.caption}
          onChange={(e) => patch({ caption: e.target.value })}
          className="mt-2 w-full rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
        />
        <label className="mt-3 block text-sm text-rose" htmlFor="sub">
          Second line
        </label>
        <input
          id="sub"
          value={design.captionSub}
          onChange={(e) => patch({ captionSub: e.target.value })}
          className="mt-2 w-full rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Toggle on={design.showCaption} label="Show" pressed={() => patch({ showCaption: !design.showCaption })} />
          <Toggle on={design.captionBold} label="Bold" pressed={() => patch({ captionBold: !design.captionBold })} />
          <Toggle on={design.captionItalic} label="Italic" pressed={() => patch({ captionItalic: !design.captionItalic })} />
          <Toggle on={design.captionCaps} label="Caps" pressed={() => patch({ captionCaps: !design.captionCaps })} />
          <Toggle
            on={design.captionFont === "serif"}
            label={design.captionFont === "serif" ? "Serif" : "Sans"}
            pressed={() => patch({ captionFont: design.captionFont === "serif" ? "sans" : "serif" })}
          />
        </div>
      </Section>
    </div>
  );
}

function Toggle({ on, label, pressed }: { on: boolean; label: string; pressed: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={pressed}
      className={cn(
        "min-h-11 rounded-full px-4 text-sm font-medium transition-transform duration-150 active:scale-[0.96]",
        on ? "bg-ink text-cream" : "border border-linen bg-paper text-ink",
      )}
    >
      {label}
    </button>
  );
}
