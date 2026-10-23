import { i as __toESM } from "../_runtime.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
import { n as persist, r as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CLhcIncP.js
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var FONT_READY = () => typeof document !== "undefined" && document.fonts ? Promise.all([
	document.fonts.load("600 64px Fraunces"),
	document.fonts.load("italic 600 64px Fraunces"),
	document.fonts.load("500 32px Outfit"),
	document.fonts.load("700 48px Outfit")
]).then(() => void 0) : Promise.resolve();
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not draw that picture."));
		img.src = src;
	});
}
function channel(hex, i) {
	const h = hex.replace("#", "");
	return parseInt(h.slice(i, i + 2), 16);
}
function hexAlpha(hex, alpha) {
	return `rgba(${channel(hex, 0)}, ${channel(hex, 2)}, ${channel(hex, 4)}, ${alpha})`;
}
function lin(c) {
	const s = c / 255;
	return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
}
function luminance(hex) {
	return .2126 * lin(channel(hex, 0)) + .7152 * lin(channel(hex, 2)) + .0722 * lin(channel(hex, 4));
}
function contrastRatio(a, b) {
	const l1 = luminance(a);
	const l2 = luminance(b);
	const hi = Math.max(l1, l2);
	const lo = Math.min(l1, l2);
	return (hi + .05) / (lo + .05);
}
function traceRound(ctx, x, y, w, h, r) {
	const [tl0, tr0, br0, bl0] = typeof r === "number" ? [
		r,
		r,
		r,
		r
	] : r;
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
function fillRound(ctx, x, y, w, h, r, color) {
	traceRound(ctx, x, y, w, h, r);
	ctx.fillStyle = color;
	ctx.fill();
}
function cover(ctx, img, x, y, w, h) {
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
var ALIGN = [
	[],
	[6, 18],
	[6, 22],
	[6, 26],
	[6, 30],
	[6, 34],
	[
		6,
		22,
		38
	],
	[
		6,
		24,
		42
	],
	[
		6,
		26,
		46
	],
	[
		6,
		28,
		50
	],
	[
		6,
		30,
		54
	],
	[
		6,
		32,
		58
	],
	[
		6,
		34,
		62
	],
	[
		6,
		26,
		46,
		66
	],
	[
		6,
		26,
		48,
		70
	],
	[
		6,
		26,
		50,
		74
	],
	[
		6,
		30,
		54,
		78
	],
	[
		6,
		30,
		56,
		82
	],
	[
		6,
		30,
		58,
		86
	],
	[
		6,
		34,
		62,
		90
	],
	[
		6,
		28,
		50,
		72,
		94
	],
	[
		6,
		26,
		50,
		74,
		98
	],
	[
		6,
		30,
		54,
		78,
		102
	],
	[
		6,
		28,
		54,
		80,
		106
	],
	[
		6,
		32,
		58,
		84,
		110
	],
	[
		6,
		30,
		58,
		86,
		114
	],
	[
		6,
		34,
		62,
		90,
		118
	],
	[
		6,
		26,
		50,
		74,
		98,
		122
	],
	[
		6,
		30,
		54,
		78,
		102,
		126
	],
	[
		6,
		26,
		52,
		78,
		104,
		130
	],
	[
		6,
		30,
		56,
		82,
		108,
		134
	],
	[
		6,
		34,
		60,
		86,
		112,
		138
	],
	[
		6,
		30,
		58,
		86,
		114,
		142
	],
	[
		6,
		34,
		62,
		90,
		118,
		146
	],
	[
		6,
		30,
		54,
		78,
		102,
		126,
		150
	],
	[
		6,
		24,
		50,
		76,
		102,
		128,
		154
	],
	[
		6,
		28,
		54,
		80,
		106,
		132,
		158
	],
	[
		6,
		32,
		58,
		84,
		110,
		136,
		162
	],
	[
		6,
		26,
		54,
		82,
		110,
		138,
		166
	],
	[
		6,
		30,
		58,
		86,
		114,
		142,
		170
	]
];
function finderOrigin(row, col, n) {
	if (row < 7 && col < 7) return {
		r0: 0,
		c0: 0
	};
	if (row < 7 && col >= n - 7) return {
		r0: 0,
		c0: n - 7
	};
	if (row >= n - 7 && col < 7) return {
		r0: n - 7,
		c0: 0
	};
	return null;
}
function inAlignment(row, col, version, n) {
	const centers = ALIGN[version - 1] ?? [];
	for (const r of centers) for (const c of centers) {
		if (finderOrigin(r, c, n)) continue;
		if (Math.abs(row - r) <= 2 && Math.abs(col - c) <= 2) return true;
	}
	return false;
}
function keepSolid(row, col, version, n) {
	if (row === 6 || col === 6) return true;
	return inAlignment(row, col, version, n);
}
function drawModule(ctx, x, y, s, shape, north, east, south, west) {
	if (shape === "square") {
		ctx.fillRect(x, y, s + .35, s + .35);
		return;
	}
	if (shape === "dot") {
		ctx.beginPath();
		ctx.arc(x + s / 2, y + s / 2, s * .4, 0, Math.PI * 2);
		ctx.fill();
		return;
	}
	if (shape === "diamond") {
		const cut = s * .28;
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
	const rad = shape === "squircle" ? s * .46 : s * .34;
	const nw = !north && !west ? rad : 0;
	const ne = !north && !east ? rad : 0;
	const se = !south && !east ? rad : 0;
	const sw = !south && !west ? rad : 0;
	traceRound(ctx, x, y, s + .35, s + .35, [
		nw,
		ne,
		se,
		sw
	]);
	ctx.fill();
}
function drawEye(ctx, x, y, s, fg, bg, eye) {
	const o = 7 * s;
	ctx.fillStyle = bg;
	ctx.fillRect(x - s * .2, y - s * .2, o + s * .4, o + s * .4);
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
	const mid = eye === "square" ? 0 : eye === "leaf" ? s * .95 : s * .8;
	const core = eye === "square" ? 0 : eye === "leaf" ? s * .5 : s * .55;
	const leaf = (n) => [
		n,
		n,
		n * .18,
		n
	];
	fillRound(ctx, x, y, o, o, eye === "leaf" ? leaf(outer) : outer, fg);
	fillRound(ctx, x + s, y + s, 5 * s, 5 * s, eye === "leaf" ? leaf(mid) : mid, bg);
	fillRound(ctx, x + 2 * s, y + 2 * s, 3 * s, 3 * s, eye === "leaf" ? leaf(core) : core, fg);
}
function drawInstagram(ctx, x, y, s) {
	const g = ctx.createLinearGradient(x, y + s, x + s, y);
	g.addColorStop(0, "#F7CE68");
	g.addColorStop(.45, "#E1306C");
	g.addColorStop(1, "#833AB4");
	traceRound(ctx, x, y, s, s, s * .28);
	ctx.fillStyle = g;
	ctx.fill();
	ctx.strokeStyle = "#F7EFE7";
	ctx.lineWidth = Math.max(1.5, s * .07);
	ctx.beginPath();
	ctx.arc(x + s / 2, y + s / 2, s * .22, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = "#F7EFE7";
	ctx.beginPath();
	ctx.arc(x + s * .73, y + s * .27, s * .055, 0, Math.PI * 2);
	ctx.fill();
}
function drawFacebook(ctx, x, y, s) {
	ctx.fillStyle = "#1877F2";
	ctx.beginPath();
	ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#F7EFE7";
	ctx.font = `700 ${Math.round(s * .62)}px Outfit, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("f", x + s * .54, y + s * .54);
}
function drawWhatsApp(ctx, x, y, s) {
	ctx.fillStyle = "#128C7E";
	ctx.beginPath();
	ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#F7EFE7";
	ctx.fillStyle = "#F7EFE7";
	ctx.lineWidth = Math.max(1.5, s * .065);
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	const cx = x + s * .5;
	const cy = y + s * .48;
	ctx.beginPath();
	ctx.arc(cx, cy, s * .22, .4, Math.PI * 2 - .4);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - s * .16, cy + s * .12);
	ctx.lineTo(cx - s * .22, cy + s * .26);
	ctx.lineTo(cx - s * .04, cy + s * .16);
	ctx.stroke();
}
function drawWeb(ctx, x, y, s, fg) {
	const cx = x + s / 2;
	const cy = y + s / 2;
	ctx.strokeStyle = fg;
	ctx.lineWidth = Math.max(1.5, s * .06);
	ctx.beginPath();
	ctx.arc(cx, cy, s * .4, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.ellipse(cx, cy, s * .16, s * .4, 0, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(cx - s * .4, cy);
	ctx.lineTo(cx + s * .4, cy);
	ctx.moveTo(cx, cy - s * .4);
	ctx.lineTo(cx, cy + s * .4);
	ctx.stroke();
}
function drawMarkIcon(ctx, kind, x, y, s, fg, upload) {
	if (kind === "instagram") drawInstagram(ctx, x, y, s);
	else if (kind === "facebook") drawFacebook(ctx, x, y, s);
	else if (kind === "whatsapp") drawWhatsApp(ctx, x, y, s);
	else if (kind === "web") drawWeb(ctx, x, y, s, fg);
	else if (kind === "upload" && upload) {
		ctx.save();
		traceRound(ctx, x, y, s, s, s * .18);
		ctx.clip();
		cover(ctx, upload, x, y, s, s);
		ctx.restore();
	}
}
function fillTracked(ctx, text, x, y, tracking) {
	const chars = Array.from(text);
	if (!chars.length) return;
	const widths = chars.map((ch) => ctx.measureText(ch).width);
	let cursor = x - (widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)) / 2;
	const prev = ctx.textAlign;
	ctx.textAlign = "center";
	for (let i = 0; i < chars.length; i++) {
		const w = widths[i] ?? 0;
		ctx.fillText(chars[i] ?? "", cursor + w / 2, y);
		cursor += w + tracking;
	}
	ctx.textAlign = prev;
}
function statusFor(ratio, hasArt) {
	if (ratio < 3) return {
		note: "Contrast is too soft for a reliable scan. Push the two colours further apart.",
		warn: true
	};
	if (ratio < 4.5) return {
		note: "Soft contrast. It may scan, but a deeper pairing is safer.",
		warn: true
	};
	if (hasArt) return {
		note: "Ready to scan. The centre art uses high error recovery.",
		warn: false
	};
	return {
		note: "Ready to scan.",
		warn: false
	};
}
async function renderMark(canvas, design, pixelRatio = 2) {
	const text = design.data.trim();
	const ratioContrast = contrastRatio(design.fg, design.bg);
	const hasArt = design.mark !== "none" || design.ground !== "off" && Boolean(design.groundDataUrl);
	if (!text) {
		paintEmpty(canvas, design, pixelRatio);
		return {
			note: "Add a link or a line of text to draw the mark.",
			warn: true
		};
	}
	let matrix;
	let version = 1;
	try {
		const qr = import_lib.create(text, { errorCorrectionLevel: hasArt ? "H" : "Q" });
		matrix = qr.modules;
		version = qr.version;
	} catch {
		paintEmpty(canvas, design, pixelRatio, "That text is too long for one mark.");
		return {
			note: "That text is too long for a single code. Shorten it and try again.",
			warn: true
		};
	}
	await FONT_READY();
	const groundImg = design.ground !== "off" && design.groundDataUrl ? await loadImage(design.groundDataUrl).catch(() => null) : null;
	const markImg = design.mark === "upload" && design.markDataUrl ? await loadImage(design.markDataUrl).catch(() => null) : null;
	const n = matrix.size;
	const quiet = Math.max(2, Math.min(8, Math.round(design.quiet)));
	const span = n + quiet * 2;
	const qrSize = Math.max(180, design.size);
	const cell = qrSize / span;
	const pad = Math.round(qrSize * .085);
	const caption = (design.captionCaps ? design.caption.toUpperCase() : design.caption).trim();
	const sub = (design.captionCaps ? design.captionSub.toUpperCase() : design.captionSub).trim();
	const showCaption = design.showCaption && Boolean(caption || sub);
	const capH = showCaption ? Math.round(qrSize * (caption && sub ? .24 : .16)) : 0;
	const w = qrSize + pad * 2;
	const h = qrSize + pad * 2 + capH;
	const ratio = Math.min(pixelRatio, 2400 / Math.max(w, h));
	canvas.width = Math.max(1, Math.round(w * ratio));
	canvas.height = Math.max(1, Math.round(h * ratio));
	const ctx = canvas.getContext("2d");
	if (!ctx) return {
		note: "Could not draw the mark.",
		warn: true
	};
	ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
	ctx.imageSmoothingEnabled = true;
	const full = design.ground === "full" && groundImg;
	if (full && groundImg) {
		cover(ctx, groundImg, 0, 0, w, h);
		ctx.fillStyle = hexAlpha(design.bg, .9);
		ctx.fillRect(pad, pad, qrSize, qrSize);
	} else {
		ctx.fillStyle = design.bg;
		ctx.fillRect(0, 0, w, h);
	}
	const ox = pad + quiet * cell;
	const oy = pad + quiet * cell;
	ctx.fillStyle = design.fg;
	const dark = (row, col) => {
		if (row < 0 || col < 0 || row >= n || col >= n) return false;
		return matrix.get(row, col);
	};
	for (let row = 0; row < n; row++) for (let col = 0; col < n; col++) {
		if (finderOrigin(row, col, n)) continue;
		if (!matrix.get(row, col)) continue;
		const shape = keepSolid(row, col, version, n) ? "square" : design.module;
		drawModule(ctx, ox + col * cell, oy + row * cell, cell, shape, dark(row - 1, col), dark(row, col + 1), dark(row + 1, col), dark(row, col - 1));
	}
	const eyes = [
		{
			r0: 0,
			c0: 0
		},
		{
			r0: 0,
			c0: n - 7
		},
		{
			r0: n - 7,
			c0: 0
		}
	];
	for (const eye of eyes) drawEye(ctx, ox + eye.c0 * cell, oy + eye.r0 * cell, cell, design.fg, design.bg, design.eye);
	const cx = pad + qrSize / 2;
	const cy = pad + qrSize / 2;
	if (design.ground === "center" && groundImg) {
		const side = qrSize * .36;
		ctx.save();
		traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * .16);
		ctx.clip();
		cover(ctx, groundImg, cx - side / 2, cy - side / 2, side, side);
		ctx.restore();
	}
	if (design.ground === "small" && groundImg) {
		const side = qrSize * .16;
		ctx.save();
		traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * .22);
		ctx.clip();
		cover(ctx, groundImg, cx - side / 2, cy - side / 2, side, side);
		ctx.restore();
		ctx.strokeStyle = design.bg;
		ctx.lineWidth = Math.max(3, cell * .35);
		traceRound(ctx, cx - side / 2, cy - side / 2, side, side, side * .22);
		ctx.stroke();
	}
	if (design.mark !== "none" && (design.mark !== "upload" || markImg)) {
		const plate = qrSize * Math.max(.16, Math.min(.3, design.markScale));
		const px = cx - plate / 2;
		const py = cy - plate / 2;
		fillRound(ctx, px, py, plate, plate, plate * .22, design.bg);
		const inset = plate * .16;
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
		let fontSize = Math.round(qrSize * (design.captionCaps ? .062 : .072));
		ctx.textBaseline = "middle";
		ctx.fillStyle = design.fg;
		if (caption) {
			ctx.font = `${style} ${weight} ${fontSize}px ${family}`;
			while (fontSize > 12 && ctx.measureText(caption).width > maxW) {
				fontSize -= 1;
				ctx.font = `${style} ${weight} ${fontSize}px ${family}`;
			}
			const y = pad + qrSize + capH * (sub ? .36 : .5);
			fillTracked(ctx, caption, w / 2, y, design.captionCaps ? fontSize * .14 : fontSize * .02);
		}
		if (sub) {
			const subSize = Math.max(11, Math.round(fontSize * .62));
			ctx.font = `400 ${subSize}px ${family}`;
			ctx.fillStyle = hexAlpha(design.fg, .72);
			const y = pad + qrSize + capH * (caption ? .72 : .5);
			fillTracked(ctx, sub, w / 2, y, design.captionCaps ? subSize * .16 : subSize * .04);
		}
	}
	return statusFor(ratioContrast, hasArt);
}
function paintEmpty(canvas, design, pixelRatio, message = "Paste a link") {
	const size = Math.max(220, design.size + 80);
	const ratio = Math.min(pixelRatio, 2);
	canvas.width = Math.round(size * ratio);
	canvas.height = Math.round(size * .86 * ratio);
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
	ctx.fillStyle = design.bg;
	ctx.fillRect(0, 0, size, size * .86);
	ctx.fillStyle = design.fg;
	ctx.font = "500 22px Fraunces, Georgia, serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(message, size / 2, size * .4);
	ctx.font = "400 14px Outfit, sans-serif";
	ctx.fillStyle = hexAlpha(design.fg, .7);
	ctx.fillText("The studio will draw it here.", size / 2, size * .52);
}
async function exportMark(design, kind) {
	const canvas = document.createElement("canvas");
	const info = await renderMark(canvas, design, 3);
	const blob = await new Promise((resolve) => canvas.toBlob(resolve, kind === "png" ? "image/png" : "image/jpeg", .93));
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
var defaultDesign = {
	data: "https://aurel.studio",
	fg: "#3E3239",
	bg: "#F7EFE7",
	module: "rounded",
	eye: "rounded",
	size: 360,
	quiet: 4,
	mark: "none",
	markDataUrl: null,
	markScale: .22,
	ground: "off",
	groundDataUrl: null,
	caption: "Scan to enter",
	captionSub: "Aurel atelier",
	captionBold: true,
	captionItalic: false,
	captionCaps: false,
	captionFont: "serif",
	showCaption: true,
	paletteId: "pressed-card",
	templateId: null
};
var ROWS = [
	[
		"pressed-card",
		"Ink Rose",
		"Pressed Card",
		"Atelier",
		"#3E3239",
		"#F7EFE7",
		"rounded",
		"rounded",
		"The private view",
		"Thursday, after six",
		1,
		1,
		"serif"
	],
	[
		"milk-glass",
		"Dust Veil",
		"Milk Glass",
		"Atelier",
		"#3E3239",
		"#E8D2C4",
		"squircle",
		"leaf",
		"Soft launch",
		"By invitation",
		1,
		0,
		"serif"
	],
	[
		"cocoa-note",
		"Cocoa Milk",
		"Cocoa Note",
		"Atelier",
		"#3A2A24",
		"#F6EDE4",
		"square",
		"square",
		"Table four",
		"Hold until nine",
		1,
		0,
		"sans"
	],
	[
		"plum-editorial",
		"Plum Paper",
		"Plum Editorial",
		"Atelier",
		"#3F2C38",
		"#F4E4DC",
		"rounded",
		"circle",
		"Issue 04",
		"Printed in rose",
		1,
		1,
		"serif"
	],
	[
		"night-bloom",
		"Night Bloom",
		"Night Bloom",
		"Atelier",
		"#F7EFE7",
		"#3E3239",
		"dot",
		"circle",
		"After dark",
		"Doors at ten",
		1,
		0,
		"serif"
	],
	[
		"velvet-room",
		"Velvet",
		"Velvet Room",
		"Atelier",
		"#F3E4DC",
		"#2A2226",
		"squircle",
		"rounded",
		"Members",
		"Show this mark",
		1,
		0,
		"sans"
	],
	[
		"wine-hour",
		"Wine Hour",
		"Wine Hour",
		"Atelier",
		"#F7EFE7",
		"#4A2430",
		"rounded",
		"leaf",
		"Last seating",
		"Kitchen closes",
		1,
		1,
		"serif"
	],
	[
		"carbon-proof",
		"Carbon",
		"Carbon Proof",
		"Editorial",
		"#1A1A1A",
		"#F4F1EC",
		"square",
		"square",
		"Read the piece",
		"No. 18",
		1,
		0,
		"sans"
	],
	[
		"sunday-paper",
		"Newsprint",
		"Sunday Paper",
		"Editorial",
		"#22201C",
		"#E7E2D8",
		"rounded",
		"square",
		"The interview",
		"This weekend",
		1,
		0,
		"serif"
	],
	[
		"white-wall",
		"Gallery",
		"White Wall",
		"Editorial",
		"#141414",
		"#FFFFFF",
		"square",
		"rounded",
		"Now showing",
		"North room",
		1,
		0,
		"sans"
	],
	[
		"night-proof",
		"Graphite",
		"Night Proof",
		"Editorial",
		"#F2F0EB",
		"#1C1C1C",
		"dot",
		"circle",
		"Black edition",
		"Limited run",
		1,
		0,
		"sans"
	],
	[
		"margin-notes",
		"Slate",
		"Margin Notes",
		"Editorial",
		"#1E2933",
		"#E8EEF2",
		"rounded",
		"rounded",
		"Field notes",
		"Volume two",
		0,
		1,
		"serif"
	],
	[
		"warm-charcoal",
		"Charcoal",
		"Warm Charcoal",
		"Editorial",
		"#2C2825",
		"#F3EEE6",
		"squircle",
		"leaf",
		"Studio visit",
		"By appointment",
		1,
		0,
		"serif"
	],
	[
		"the-index",
		"Index",
		"The Index",
		"Editorial",
		"#1A1614",
		"#F7F4EF",
		"square",
		"square",
		"Contents",
		"Start here",
		1,
		0,
		"sans"
	],
	[
		"espresso-card",
		"Espresso",
		"Espresso Card",
		"Cafe",
		"#2B1B14",
		"#F3E6D4",
		"rounded",
		"rounded",
		"Order ahead",
		"Bar opens at 8",
		1,
		0,
		"serif"
	],
	[
		"morning-latte",
		"Latte",
		"Morning Latte",
		"Cafe",
		"#3D2918",
		"#F8F1E7",
		"squircle",
		"circle",
		"The daily",
		"Single origin",
		1,
		0,
		"serif"
	],
	[
		"mocha-night",
		"Mocha",
		"Mocha Night",
		"Cafe",
		"#F6E8D8",
		"#3C2A22",
		"dot",
		"rounded",
		"Dessert menu",
		"After four",
		1,
		0,
		"sans"
	],
	[
		"honey-jar",
		"Honey",
		"Honey Jar",
		"Cafe",
		"#3A2A10",
		"#F8F0D8",
		"rounded",
		"leaf",
		"Sunday bake",
		"Until sold out",
		1,
		1,
		"serif"
	],
	[
		"olive-branch",
		"Olive",
		"Olive Branch",
		"Cafe",
		"#2E3420",
		"#F3F0E4",
		"square",
		"square",
		"Lunch, set",
		"Twelve to three",
		1,
		0,
		"sans"
	],
	[
		"clay-cup",
		"Terracotta",
		"Clay Cup",
		"Cafe",
		"#5A2C1C",
		"#F8EDE3",
		"squircle",
		"rounded",
		"House blend",
		"Ask the bar",
		1,
		0,
		"serif"
	],
	[
		"last-cup",
		"Cocoa Dark",
		"Last Cup",
		"Cafe",
		"#F6EDE4",
		"#2A1C16",
		"rounded",
		"circle",
		"Closed kitchen",
		"Tomorrow at 8",
		1,
		0,
		"serif"
	],
	[
		"sage-room",
		"Sage",
		"Sage Room",
		"Wellness",
		"#243028",
		"#E7F0E6",
		"rounded",
		"circle",
		"Book an hour",
		"Quiet floor",
		1,
		0,
		"serif"
	],
	[
		"moss-light",
		"Moss",
		"Moss Light",
		"Wellness",
		"#E8F2E4",
		"#24332A",
		"dot",
		"circle",
		"Dawn class",
		"Bring water",
		1,
		0,
		"sans"
	],
	[
		"still-water",
		"Spa",
		"Still Water",
		"Wellness",
		"#1F3A38",
		"#E5F2EF",
		"squircle",
		"rounded",
		"The treatment",
		"Arrive early",
		1,
		0,
		"serif"
	],
	[
		"green-rest",
		"Eucalyptus",
		"Green Rest",
		"Wellness",
		"#1E3330",
		"#E4EFE8",
		"rounded",
		"leaf",
		"Breathwork",
		"Small group",
		0,
		1,
		"serif"
	],
	[
		"warm-clay",
		"Clay",
		"Warm Clay",
		"Wellness",
		"#5C3A32",
		"#F6EBE4",
		"square",
		"rounded",
		"Slow morning",
		"Phones aside",
		1,
		0,
		"serif"
	],
	[
		"soft-blossom",
		"Blossom",
		"Soft Blossom",
		"Wellness",
		"#3E3239",
		"#F3E7E4",
		"squircle",
		"circle",
		"Facial, forty-five",
		"Book below",
		1,
		0,
		"sans"
	],
	[
		"deep-forest",
		"Forest",
		"Deep Forest",
		"Wellness",
		"#E7F3EA",
		"#1A2C22",
		"rounded",
		"rounded",
		"Trail map",
		"Start at the gate",
		1,
		0,
		"sans"
	],
	[
		"harbor-light",
		"Navy",
		"Harbor Light",
		"Coast",
		"#10243F",
		"#E7EEF6",
		"square",
		"square",
		"Boarding",
		"Slip four",
		1,
		0,
		"sans"
	],
	[
		"night-tide",
		"Tide",
		"Night Tide",
		"Coast",
		"#E8F1F8",
		"#0E2438",
		"dot",
		"circle",
		"Last ferry",
		"Nine forty",
		1,
		0,
		"sans"
	],
	[
		"sea-glass",
		"Sea Glass",
		"Sea Glass",
		"Coast",
		"#12343A",
		"#E5F3F1",
		"rounded",
		"rounded",
		"The coast list",
		"Summer",
		1,
		1,
		"serif"
	],
	[
		"sandbar",
		"Sandbar",
		"Sandbar",
		"Coast",
		"#243044",
		"#F4EFE6",
		"squircle",
		"leaf",
		"Rooms left",
		"Ocean side",
		1,
		0,
		"serif"
	],
	[
		"dark-harbor",
		"Harbor",
		"Dark Harbor",
		"Coast",
		"#F2F6F8",
		"#163044",
		"rounded",
		"circle",
		"Chart a course",
		"Tap to open",
		1,
		0,
		"sans"
	],
	[
		"shell-white",
		"Shell",
		"Shell White",
		"Coast",
		"#3A2E2A",
		"#F7F1EA",
		"rounded",
		"rounded",
		"Low tide",
		"Walk with us",
		0,
		1,
		"serif"
	],
	[
		"atlantic",
		"Atlantic",
		"Atlantic",
		"Coast",
		"#0E1C2C",
		"#E6EEF4",
		"square",
		"square",
		"Regatta",
		"Saturday",
		1,
		0,
		"sans"
	],
	[
		"obsidian",
		"Obsidian",
		"Obsidian",
		"Night",
		"#F5F2EE",
		"#0E0E10",
		"square",
		"square",
		"Guest list",
		"Name at the door",
		1,
		0,
		"sans"
	],
	[
		"midnight-ink",
		"Midnight",
		"Midnight Ink",
		"Night",
		"#E8E4F2",
		"#12141C",
		"dot",
		"circle",
		"Set times",
		"Room two",
		1,
		0,
		"sans"
	],
	[
		"rose-after",
		"Rose Dark",
		"Rose After",
		"Night",
		"#F7EFE7",
		"#1A1216",
		"squircle",
		"leaf",
		"Encore",
		"One more hour",
		1,
		1,
		"serif"
	],
	[
		"emerald-night",
		"Emerald",
		"Emerald Night",
		"Night",
		"#E7F6EC",
		"#0E1F18",
		"rounded",
		"circle",
		"Listening bar",
		"No photos, please",
		1,
		0,
		"serif"
	],
	[
		"cobalt-room",
		"Cobalt",
		"Cobalt Room",
		"Night",
		"#EAF0FF",
		"#10182E",
		"dot",
		"rounded",
		"Late set",
		"Starts at eleven",
		1,
		0,
		"sans"
	],
	[
		"amber-dark",
		"Amber",
		"Amber Dark",
		"Night",
		"#F8E7C4",
		"#1A140C",
		"squircle",
		"leaf",
		"Whisky list",
		"Ask upstairs",
		1,
		0,
		"serif"
	],
	[
		"black-tie",
		"Black Tie",
		"Black Tie",
		"Night",
		"#F7F4EF",
		"#111111",
		"square",
		"square",
		"You are expected",
		"Formal",
		1,
		0,
		"serif"
	],
	[
		"ivory-vow",
		"Ivory",
		"Ivory Vow",
		"Ceremony",
		"#2C2420",
		"#FBF7F2",
		"rounded",
		"rounded",
		"Our day",
		"Scan for the details",
		1,
		1,
		"serif"
	],
	[
		"champagne",
		"Champagne",
		"Champagne",
		"Ceremony",
		"#3A2C24",
		"#F6EBD9",
		"squircle",
		"leaf",
		"To the couple",
		"Table plan",
		1,
		0,
		"serif"
	],
	[
		"blush-vow",
		"Blush",
		"Blush Vow",
		"Ceremony",
		"#4A3040",
		"#F8E8EA",
		"rounded",
		"circle",
		"Save the date",
		"June the twelfth",
		1,
		1,
		"serif"
	],
	[
		"gold-line",
		"Gold",
		"Gold Line",
		"Ceremony",
		"#3A2E18",
		"#F8F1DE",
		"square",
		"square",
		"The reception",
		"Dancing after",
		1,
		0,
		"serif"
	],
	[
		"pearl",
		"Pearl",
		"Pearl",
		"Ceremony",
		"#2A2628",
		"#F4F0F2",
		"squircle",
		"rounded",
		"Kindly reply",
		"By the first",
		0,
		1,
		"serif"
	],
	[
		"garden-party",
		"Garden",
		"Garden Party",
		"Ceremony",
		"#243028",
		"#F3F6EF",
		"rounded",
		"leaf",
		"In the garden",
		"Four o'clock",
		1,
		0,
		"serif"
	],
	[
		"dusk-vow",
		"Dusk",
		"Dusk Vow",
		"Ceremony",
		"#F6EEE8",
		"#3A2A32",
		"dot",
		"circle",
		"Evening vows",
		"Under the lights",
		1,
		1,
		"serif"
	],
	[
		"signal-blue",
		"Klein",
		"Signal Blue",
		"Signal",
		"#0C2F8A",
		"#E8EEF8",
		"square",
		"square",
		"Open the work",
		"Case study",
		1,
		0,
		"sans"
	],
	[
		"pine-signal",
		"Pine",
		"Pine Signal",
		"Signal",
		"#143024",
		"#E6F0E4",
		"rounded",
		"rounded",
		"Download",
		"The deck",
		1,
		0,
		"sans"
	],
	[
		"indigo-note",
		"Indigo",
		"Indigo Note",
		"Signal",
		"#1E1B4B",
		"#EEEAF6",
		"squircle",
		"circle",
		"Join the call",
		"Link inside",
		1,
		0,
		"sans"
	],
	[
		"copperplate",
		"Copper",
		"Copperplate",
		"Signal",
		"#6B3418",
		"#F8EDE3",
		"square",
		"leaf",
		"The lookbook",
		"Spring",
		1,
		0,
		"serif"
	],
	[
		"bone-paper",
		"Bone",
		"Bone Paper",
		"Signal",
		"#1F1A17",
		"#EFEAE2",
		"rounded",
		"square",
		"Portfolio",
		"Selected work",
		1,
		0,
		"sans"
	],
	[
		"lilac-ink",
		"Lilac",
		"Lilac Ink",
		"Signal",
		"#2A2438",
		"#F3EEF6",
		"dot",
		"circle",
		"New essay",
		"Twelve minutes",
		0,
		1,
		"serif"
	],
	[
		"crimson-seal",
		"Crimson",
		"Crimson Seal",
		"Signal",
		"#F8E8E6",
		"#3A1218",
		"squircle",
		"rounded",
		"Limited drop",
		"Tonight only",
		1,
		0,
		"sans"
	]
];
function rowToLook(row) {
	const [id, palette, name, category, fg, bg, module, eye, caption, sub, bold, italic, font] = row;
	return {
		id,
		palette,
		name,
		category,
		fg,
		bg,
		module,
		eye,
		caption,
		sub,
		bold: bold === 1,
		italic: italic === 1,
		font
	};
}
var LOOKS = ROWS.map(rowToLook);
var CATEGORIES = [
	"Atelier",
	"Editorial",
	"Cafe",
	"Wellness",
	"Coast",
	"Night",
	"Ceremony",
	"Signal"
];
function designFromLook(look, data = defaultDesign.data, withCaption = false) {
	return {
		...defaultDesign,
		data,
		fg: look.fg,
		bg: look.bg,
		module: look.module,
		eye: look.eye,
		caption: look.caption,
		captionSub: look.sub,
		captionBold: look.bold,
		captionItalic: look.italic,
		captionFont: look.font,
		captionCaps: false,
		showCaption: withCaption,
		paletteId: look.id,
		templateId: look.id,
		mark: "none",
		ground: "off",
		size: withCaption ? defaultDesign.size : 280
	};
}
var useStudio = create()(persist((set) => ({
	...defaultDesign,
	patch: (partial) => set(partial),
	applyLook: (look) => set({
		fg: look.fg,
		bg: look.bg,
		module: look.module,
		eye: look.eye,
		caption: look.caption,
		captionSub: look.sub,
		captionBold: look.bold,
		captionItalic: look.italic,
		captionCaps: false,
		captionFont: look.font,
		showCaption: true,
		paletteId: look.id,
		templateId: look.id
	}),
	applyPalette: (look) => set({
		fg: look.fg,
		bg: look.bg,
		paletteId: look.id
	})
}), {
	name: "aurel-studio",
	partialize: (state) => ({
		data: state.data,
		fg: state.fg,
		bg: state.bg,
		module: state.module,
		eye: state.eye,
		size: state.size,
		quiet: state.quiet,
		mark: state.mark,
		markDataUrl: state.markDataUrl && state.markDataUrl.length < 45e4 ? state.markDataUrl : null,
		markScale: state.markScale,
		ground: state.ground,
		groundDataUrl: state.groundDataUrl && state.groundDataUrl.length < 7e5 ? state.groundDataUrl : null,
		caption: state.caption,
		captionSub: state.captionSub,
		captionBold: state.captionBold,
		captionItalic: state.captionItalic,
		captionCaps: state.captionCaps,
		captionFont: state.captionFont,
		showCaption: state.showCaption,
		paletteId: state.paletteId,
		templateId: state.templateId
	})
}));
//#endregion
export { exportMark as a, designFromLook as i, LOOKS as n, renderMark as o, defaultDesign as r, useStudio as s, CATEGORIES as t };
