import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";
import { Download } from "lucide-react";
import { QrView } from "@/components/qr-view";
import { StudioPanel } from "@/components/studio-panel";
import { exportMark } from "@/lib/qr/render";
import { useStudio } from "@/lib/qr/store";
import type { Design } from "@/lib/qr/types";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Aurel" },
      { name: "description", content: "Shape, colour, icon, background, and lettering for a scannable QR card. Export PNG or JPG." },
    ],
  }),
  component: Studio,
});

function Studio() {
  const design = useStudio(
    useShallow(
      (s): Design => ({
        data: s.data,
        fg: s.fg,
        bg: s.bg,
        module: s.module,
        eye: s.eye,
        size: s.size,
        quiet: s.quiet,
        mark: s.mark,
        markDataUrl: s.markDataUrl,
        markScale: s.markScale,
        ground: s.ground,
        groundDataUrl: s.groundDataUrl,
        caption: s.caption,
        captionSub: s.captionSub,
        captionBold: s.captionBold,
        captionItalic: s.captionItalic,
        captionCaps: s.captionCaps,
        captionFont: s.captionFont,
        showCaption: s.showCaption,
        paletteId: s.paletteId,
        templateId: s.templateId,
      }),
    ),
  );
  const [busy, setBusy] = useState<"png" | "jpeg" | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function save(kind: "png" | "jpeg") {
    setBusy(kind);
    setNote(null);
    try {
      await exportMark(design, kind);
      setNote(kind === "png" ? "PNG saved." : "JPG saved.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Export failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start">
      <div className="order-2 lg:order-1">
        <p className="text-xs tracking-widest text-rose uppercase">Studio</p>
        <h1 className="display mt-2 text-5xl">Every control. One canvas.</h1>
        <p className="mt-4 text-rose">
          Templates stay on their own floor. Here you set the destination, the form, the pairing, the icon, the ground, and the words. What you see is the file.
        </p>
        <p className="mt-3 text-sm">
          <Link to="/templates" className="underline decoration-sand underline-offset-4">
            Borrow a template
          </Link>
        </p>
        <div className="mt-8">
          <StudioPanel />
        </div>
      </div>
      <div className="canvas-stage order-1 rounded-card p-4 sm:p-8 lg:sticky lg:top-24 lg:order-2">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-rose">Live card</p>
          <div className="flex gap-2">
            <ExportButton label="PNG" busy={busy === "png"} onClick={() => void save("png")} />
            <ExportButton label="JPG" busy={busy === "jpeg"} onClick={() => void save("jpeg")} />
          </div>
        </div>
        <QrView design={design} pixelRatio={2} />
        {note ? <p className="mt-2 text-sm text-rose">{note}</p> : null}
      </div>
    </main>
  );
}

function ExportButton({ label, busy, onClick }: { label: string; busy: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-60"
    >
      <Download className="size-4" aria-hidden />
      {busy ? "Saving" : label}
    </button>
  );
}
