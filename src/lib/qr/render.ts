import QRCode from "qrcode";
import type { Design, EyeShape, MarkKind, ModuleShape } from "@/lib/qr/types";

export type RenderInfo = {
  note: string;
  warn: boolean;
};

const FONT_READY = () =>
  typeof document !== "undefined" && document.fonts
    ? Promise.all([
        document.fonts.load("600 64px Fraunces"),
        document.fonts.load("italic 600 64px Fraunces"),
        document.fonts.load("500 32px Outfit"),
        document.fonts.load("700 48px Outfit"),
      ]).then(() => undefined)
    : Promise.resolve();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not draw that picture."));
    img.src = src;
  });
}

function channel(hex: string, i: number) {
  const h = hex.replace("#", "");
  return parseInt(h.slice(i, i + 2), 16);
}

function hexAlpha(hex: string, alpha: number) {
  return `rgba(${channel(hex, 0)}, ${channel(hex, 2)}, ${channel(hex, 4)}, ${alpha})`;
}

function lin(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  return 0.2126 * lin(channel(hex, 0)) + 0.7152 * lin(channel(hex, 2)) + 0.0722 * lin(channel(hex, 4));
}

export function contrastRatio(a: string, b: string) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function traceRound(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | [number, number, number, number],
) {
  const [tl0, tr0, br0, bl0] = typeof r === "number" ? [r, r, r, r] : r;
  const tl = Math.max(0, Math.min(tl0, w / 2, h / 2));
  const tr = Math.max(0, Math.min(tr0, w / 2, h / 2));
  const br = Math.max(0, Math.min(br0, w / 2, h / 2));
  const bl = Math.max(0, Math.min(bl0, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  if (tr) ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  else ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - br);
  if (br) ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  else ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + bl, y + h);
  if (bl) ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  else ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + tl);
  if (tl) ctx.quadraticCurveTo(x, y, x + tl, y);
  else ctx.lineTo(x, y);
  ctx.closePath();
}

function fillRound(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | [number, number, number, number],
  color: string,
) {
  traceRound(ctx, x, y, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();
}

function cover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const ir = img.width / img.height;
  const r = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;
  if (ir > r) {
    sw = img.height * r;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / r;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

const ALIGN: number[][] = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];

function finderOrigin(row: number, col: number, n: number) {
  if (row < 7 && col < 7) return { r0: 0, c0: 0 };
  if (row < 7 && col >= n - 7) return { r0: 0, c0: n - 7 };
  if (row >= n - 7 && col < 7) return { r0: n - 7, c0: 0 };
  return null;
}

function inAlignment(row: number, col: number, version: number, n: number) {
  const centers = ALIGN[version - 1] ?? [];
  for (const r of centers) {
    for (const c of centers) {
      if (finderOrigin(r, c, n)) continue;
      if (Math.abs(row - r) <= 2 && Math.abs(col - c) <= 2) return true;
    }
  }
  return false;
}

function keepSolid(row: number, col: number, version: number, n: number) {
  if (row === 6 || col === 6) return true;
  return inAlignment(row, col, version, n);
}

function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  shape: ModuleShape,
  north: boolean,
  east: boolean,
  south: boolean,
  west: boolean,
) {
  if (shape === "square") {
    ctx.fillRect(x, y, s + 0.35, s + 0.35);
    return;
  }
  if (shape === "dot") {
    ctx.beginPath();
    ctx.arc(x + s / 2, y + s / 2, s * 0.4, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  if (shape === "diamond") {
    const cut = s * 0.28;
    ctx.beginPath();
    ctx.moveTo(x + cut, y);
    ctx.lineTo(x + s - cut, y);
    ctx.lineTo(x + s, y + cut);
    ctx.lineTo(x + s, y + s - cut);
    ctx.lineTo(x + s - cut, y + s);
    ctx.lineTo(x + cut, y + s);
    ctx.lineTo(x, y + s - cut);
    ctx.lineTo(x, y + cut);
    ctx.closePath();
    ctx.fill();
    return;
  }
  const rad = shape === "squircle" ? s * 0.46 : s * 0.34;
  const nw = !north && !west ? rad : 0;
  const ne = !north && !east ? rad : 0;
  const se = !south && !east ? rad : 0;
  const sw = !south && !west ? rad : 0;
  traceRound(ctx, x, y, s + 0.35, s + 0.35, [nw, ne, se, sw]);
  ctx.fill();
}

function drawEye(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  fg: string,
  bg: string,
  eye: EyeShape,
) {
  const o = 7 * s;
  ctx.fillStyle = bg;
  ctx.fillRect(x - s * 0.2, y - s * 0.2, o + s * 0.4, o + s * 0.4);
  if (eye === "circle") {
    const cx = x + o / 2;
    const cy = y + o / 2;
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.arc(cx, cy, o / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.arc(cx, cy, 1.5 * s, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  const outer = eye === "square" ? 0 : eye === "leaf" ? s * 1.7 : s * 1.25;
  const mid = eye === "square" ? 0 : eye === "leaf" ? s * 0.95 : s * 0.8;
  const core = eye === "square" ? 0 : eye === "leaf" ? s * 0.5 : s * 0.55;
  const leaf = (n: number): [number, number, number, number] => [n, n, n * 0.18, n];
  fillRound(ctx, x, y, o, o, eye === "leaf" ? leaf(outer) : outer, fg);
  fillRound(ctx, x + s, y + s, 5 * s, 5 * s, eye === "leaf" ? leaf(mid) : mid, bg);
  fillRound(ctx, x + 2 * s, y + 2 * s, 3 * s, 3 * s, eye === "leaf" ? leaf(core) : core, fg);
}

function drawInstagram(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  const g = ctx.createLinearGradient(x, y + s, x + s, y);
  g.addColorStop(0, "#F7CE68");
  g.addColorStop(0.45, "#E1306C");
  g.addColorStop(1, "#833AB4");
  traceRound(ctx, x, y, s, s, s * 0.28);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "#F7EFE7";
  ctx.lineWidth = Math.max(1.5, s * 0.07);
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s / 2, s * 0.22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#F7EFE7";
  ctx.beginPath();
  ctx.arc(x + s * 0.73, y + s * 0.27, s * 0.055, 0, Math.PI * 2);
  ctx.fill();
}

function drawFacebook(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = "#1877F2";
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#F7EFE7";
  ctx.font = `700 ${Math.round(s * 0.62)}px Outfit, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("f", x + s * 0.54, y + s * 0.54);
}

function drawWhatsApp(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = "#128C7E";
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#F7EFE7";
  ctx.fillStyle = "#F7EFE7";
  ctx.lineWidth = Math.max(1.5, s * 0.065);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const cx = x + s * 0.5;
  const cy = y + s * 0.48;
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.22, 0.4, Math.PI * 2 - 0.4);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.16, cy + s * 0.12);
  ctx.lineTo(cx - s * 0.22, cy + s * 0.26);
  ctx.lineTo(cx - s * 0.04, cy + s * 0.16);
  ctx.stroke();
}

function drawWeb(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, fg: string) {
  const cx = x + s / 2;
  const cy = y + s / 2;
  ctx.strokeStyle = fg;
  ctx.lineWidth = Math.max(1.5, s * 0.06);
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, s * 0.16, s * 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.4, cy);
  ctx.lineTo(cx + s * 0.4, cy);
  ctx.moveTo(cx, cy - s * 0.4);
  ctx.lineTo(cx, cy + s * 0.4);
  ctx.stroke();
}

function drawMarkIcon(
  ctx: CanvasRenderingContext2D,
  kind: MarkKind,
  x: number,
  y: number,
  s: number,
  fg: string,
  upload: HTMLImageElement | null,
) {
  if (kind === "instagram") drawInstagram(ctx, x, y, s);
  else if (kind === "facebook") drawFacebook(ctx, x, y, s);
  else if (kind === "whatsapp") drawWhatsApp(ctx, x, y, s);
  else if (kind === "web") drawWeb(ctx, x, y, s, fg);
  else if (kind === "upload" && upload) {
    ctx.save();
    traceRound(ctx, x, y, s, s, s * 0.18);
    ctx.clip();
    cover(ctx, upload, x, y, s, s);
    ctx.restore();
  }
}

function fillTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
) {
  const chars = Array.from(text);
  if (!chars.length) return;
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let cursor = x - total / 2;
  const prev = ctx.textAlign;
  ctx.textAlign = "center";
  for (let i = 0; i < chars.length; i++) {
    const w = widths[i] ?? 0;
    ctx.fillText(chars[i] ?? "", cursor + w / 2, y);
    cursor += w + tracking;
  }
  ctx.textAlign = prev;
}

function statusFor(ratio: number, hasArt: boolean): RenderInfo {
  if (ratio < 3) {
    return { note: "Contrast is too soft for a reliable scan. Push the two colours further apart.", warn: true };
  }
  if (ratio < 4.5) {
    return { note: "Soft contrast. It may scan, but a deeper pairing is safer.", warn: true };
  }
  if (hasArt) {
    return { note: "Ready to scan. The centre art uses high error recovery.", warn: false };
  }
  return { note: "Ready to scan.", warn: false };
}

export async function renderMark(
  canvas: HTMLCanvasElement,
  design: Design,
  pixelRatio = 2,
): Promise<RenderInfo> {
  const text = design.data.trim();
  const ratioContrast = contrastRatio(design.fg, design.bg);
  const hasArt =
    design.mark !== "none" || (design.ground !== "off" && Boolean(design.groundDataUrl));
  if (!text) {
    paintEmpty(canvas, design, pixelRatio);
    return { note: "Add a link or a line of text to draw the mark.", warn: true };
  }

  let matrix;
  let version = 1;
  try {
    const qr = QRCode.create(text, { errorCorrectionLevel: hasArt ? "H" : "Q" });
    matrix = qr.modules;
    version = qr.version;
  } catch {
    paintEmpty(canvas, design, pixelRatio, "That text is too long for one mark.");
    return { note: "That text is too long for a single code. Shorten it and try again.", warn: true };
  }

  await FONT_READY();
  const groundImg =
    design.ground !== "off" && design.groundDataUrl ? await loadImage(design.groundDataUrl).catch(() => null) : null;
  const markImg =
    design.mark === "upload" && design.markDataUrl ? await loadImage(design.markDataUrl).catch(() => null) : null;

  const n = matrix.size;
  const quiet = Math.max(2, Math.min(8, Math.round(design.quiet)));
  const span = n + quiet * 2;
  const qrSize = Math.max(180, design.size);
  const cell = qrSize / span;
  const pad = Math.round(qrSize * 0.085);
  const caption = (design.captionCaps ? design.caption.toUpperCase() : design.caption).trim();
  const sub = (design.captionCaps ? design.captionSub.toUpperCase() : design.captionSub).trim();
  const showCaption = design.showCaption && Boolean(caption || sub);
  const capH = showCaption ? Math.round(qrSize * (caption && sub ? 0.24 : 0.16)) : 0;
  const w = qrSize + pad * 2;
  const h = qrSize + pad * 2 + capH;
  const ratio = Math.min(pixelRatio, 2400 / Math.max(w, h));

  canvas.width = Math.max(1, Math.round(w * ratio));
  canvas.height = Math.max(1, Math.round(h * ratio));
  const ctx = canvas.getContext("2d");
  if (!ctx) return { note: "Could not draw the mark.", warn: true };
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.imageSmoothingEnabled = true;

  const full = design.ground === "full" && groundImg;
  if (full && groundImg) {
    cover(ctx, groundImg, 0, 0, w, h);
    ctx.fillStyle = hexAlpha(design.bg, 0.9);
    ctx.fillRect(pad, pad, qrSize, qrSize);
  } else {
    ctx.fillStyle = design.bg;
    ctx.fillRect(0, 0, w, h);
  }

  const ox = pad + quiet * cell;
  const oy = pad + quiet * cell;
  ctx.fillStyle = design.fg;

  const dark = (row: number, col: number) => {
    if (row < 0 || col < 0 || row >= n || col >= n) return false;
    return matrix.get(row, col);
  };

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (finderOrigin(row, col, n)) continue;
      if (!matrix.get(row, col)) continue;
      const shape = keepSolid(row, col, version, n) ? "square" : design.module;
      drawModule(
        ctx,
        ox + col * cell,
        oy + row * cell,
        cell,
        shape,
        dark(row - 1, col),
        dark(row, col + 1),
        dark(row + 1, col),
        dark(row, col - 1),
      );
    }
  }

  const eyes = [
    { r0: 0, c0: 0 },
    { r0: 0, c0: n - 7 },
    { r0: n - 7, c0: 0 },
  ];
  for (const eye of eyes) {
    drawEye(ctx, ox + eye.c0 * cell, oy + eye.r0 * cell, cell, design.fg, design.bg, design.eye);
  }

  const cx = pad + qrSize / 2;
  const cy = pad + qrSize / 2;

  if (design.ground === "center" && groundImg) {
    const side = qrSize * 0.36;
    ctx.save();
    traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * 0.16);
    ctx.clip();
    cover(ctx, groundImg, cx - side / 2, cy - side / 2, side, side);
    ctx.restore();
  }

  if (design.ground === "small" && groundImg) {
    const side = qrSize * 0.16;
    ctx.save();
    traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * 0.22);
    ctx.clip();
    cover(ctx, groundImg, cx - side / 2, cy - side / 2, side, side);
    ctx.restore();
    ctx.strokeStyle = design.bg;
    ctx.lineWidth = Math.max(3, cell * 0.35);
    traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * 0.22);
    ctx.stroke();
  }

  if (design.mark !== "none" && (design.mark !== "upload" || markImg)) {
    const plate = qrSize * Math.max(0.16, Math.min(0.3, design.markScale));
    const px = cx - plate / 2;
    const py = cy - plate / 2;
    fillRound(ctx, px, py, plate, plate, plate * 0.22, design.bg);
    const inset = plate * 0.16;
    drawMarkIcon(ctx, design.mark, px + inset, py + inset, plate - inset * 2, design.fg, markImg);
  }

  if (showCaption) {
    if (full) {
      ctx.fillStyle = design.bg;
      ctx.fillRect(0, pad + qrSize, w, h - (pad + qrSize));
    }
    const family = design.captionFont === "serif" ? "Fraunces, Georgia, serif" : "Outfit, sans-serif";
    const weight = design.captionBold ? 600 : 500;
    const style = design.captionItalic ? "italic" : "normal";
    const maxW = w - pad * 1.4;
    let fontSize = Math.round(qrSize * (design.captionCaps ? 0.062 : 0.072));
    ctx.textBaseline = "middle";
    ctx.fillStyle = design.fg;
    if (caption) {
      ctx.font = `${style} ${weight} ${fontSize}px ${family}`;
      while (fontSize > 12 && ctx.measureText(caption).width > maxW) {
        fontSize -= 1;
        ctx.font = `${style} ${weight} ${fontSize}px ${family}`;
      }
      const y = pad + qrSize + capH * (sub ? 0.36 : 0.5);
      fillTracked(ctx, caption, w / 2, y, design.captionCaps ? fontSize * 0.14 : fontSize * 0.02);
    }
    if (sub) {
      const subSize = Math.max(11, Math.round(fontSize * 0.62));
      ctx.font = `400 ${subSize}px ${family}`;
      ctx.fillStyle = hexAlpha(design.fg, 0.72);
      const y = pad + qrSize + capH * (caption ? 0.72 : 0.5);
      fillTracked(ctx, sub, w / 2, y, design.captionCaps ? subSize * 0.16 : subSize * 0.04);
    }
  }

  return statusFor(ratioContrast, hasArt);
}

function paintEmpty(canvas: HTMLCanvasElement, design: Design, pixelRatio: number, message = "Paste a link") {
  const size = Math.max(220, design.size + 80);
  const ratio = Math.min(pixelRatio, 2);
  canvas.width = Math.round(size * ratio);
  canvas.height = Math.round(size * 0.86 * ratio);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = design.bg;
  ctx.fillRect(0, 0, size, size * 0.86);
  ctx.fillStyle = design.fg;
  ctx.font = "500 22px Fraunces, Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, size / 2, size * 0.4);
  ctx.font = "400 14px Outfit, sans-serif";
  ctx.fillStyle = hexAlpha(design.fg, 0.7);
  ctx.fillText("The studio will draw it here.", size / 2, size * 0.52);
}

export async function exportMark(design: Design, kind: "png" | "jpeg") {
  const canvas = document.createElement("canvas");
  const info = await renderMark(canvas, design, 3);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, kind === "png" ? "image/png" : "image/jpeg", 0.93),
  );
  if (!blob) throw new Error("Could not export.");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const slug = (design.templateId || "mark").replace(/[^a-z0-9-]+/gi, "").slice(0, 32) || "mark";
  a.href = url;
  a.download = `aurel-${slug}.${kind === "png" ? "png" : "jpg"}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return info;
}
