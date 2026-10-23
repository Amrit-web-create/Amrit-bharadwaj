import { useEffect, useMemo, useRef, useState } from "react";
import type { Design } from "@/lib/qr/types";
import { renderMark, type RenderInfo } from "@/lib/qr/render";
import { cn } from "@/lib/cn";

export function QrView({
  design,
  pixelRatio = 2,
  className,
  framed = true,
}: {
  design: Design;
  pixelRatio?: number;
  className?: string;
  framed?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [info, setInfo] = useState<RenderInfo | null>(null);
  const key = useMemo(() => JSON.stringify(design), [design]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancel = false;
    renderMark(canvas, design, pixelRatio)
      .then((next) => {
        if (!cancel) setInfo(next);
      })
      .catch(() => {
        if (!cancel) setInfo({ note: "Could not draw that mark.", warn: true });
      });
    return () => {
      cancel = true;
    };
  }, [key, pixelRatio, design]);

  return (
    <figure className={cn("m-0", className)}>
      <div className={cn(framed && "overflow-hidden rounded-card bg-paper shadow-lift")}>
        <canvas ref={ref} className="block h-auto w-full" role="img" aria-label="QR code preview" />
      </div>
      {info ? (
        <figcaption className={cn("mt-3 text-sm", info.warn ? "text-rose" : "text-blush")}>{info.note}</figcaption>
      ) : (
        <figcaption className="mt-3 text-sm text-blush">Drawing the mark…</figcaption>
      )}
    </figure>
  );
}
