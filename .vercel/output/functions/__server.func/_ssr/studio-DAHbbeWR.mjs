import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Download, i as ImagePlus, t as X } from "../_libs/lucide-react.mjs";
import { n as cn } from "./router-CXt3eNWF.mjs";
import { t as useShallow } from "../_libs/zustand.mjs";
import { a as exportMark, n as LOOKS, s as useStudio } from "./store-CLhcIncP.mjs";
import { t as QrView } from "./qr-view-D9jeQGaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-DAHbbeWR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shrinkImage(file, max = 960) {
	const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, max / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("Could not read that picture."));
				return;
			}
			if (mime === "image/jpeg") {
				ctx.fillStyle = "#F7EFE7";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL(mime, .88));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read that picture."));
		};
		img.src = url;
	});
}
var SHAPES = [
	{
		id: "square",
		label: "Square"
	},
	{
		id: "rounded",
		label: "Rounded"
	},
	{
		id: "squircle",
		label: "Soft"
	},
	{
		id: "dot",
		label: "Dot"
	},
	{
		id: "diamond",
		label: "Diamond"
	}
];
var EYES = [
	{
		id: "square",
		label: "Square"
	},
	{
		id: "rounded",
		label: "Rounded"
	},
	{
		id: "circle",
		label: "Circle"
	},
	{
		id: "leaf",
		label: "Leaf"
	}
];
var MARKS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "instagram",
		label: "Instagram"
	},
	{
		id: "facebook",
		label: "Facebook"
	},
	{
		id: "whatsapp",
		label: "WhatsApp"
	},
	{
		id: "web",
		label: "Website"
	},
	{
		id: "upload",
		label: "Gallery"
	}
];
var GROUNDS = [
	{
		id: "off",
		label: "Plain"
	},
	{
		id: "small",
		label: "Small"
	},
	{
		id: "center",
		label: "Centre"
	},
	{
		id: "full",
		label: "Full"
	}
];
function Section({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-t border-linen pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-blush uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display mt-1 text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})
		]
	});
}
function Choice({ active, label, name, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		"aria-label": name ?? label,
		className: cn("flex min-h-11 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-xs font-medium transition-transform duration-150 ease-out active:scale-[0.96]", active ? "border-ink bg-ink text-cream" : "border-linen bg-paper text-ink hover:border-sand"),
		children: [children, label]
	});
}
function ShapeGlyph({ id }) {
	const common = "fill-current";
	if (id === "dot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: common,
			cx: "12",
			cy: "12",
			r: "6"
		})
	});
	if (id === "diamond") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			className: common,
			d: "M12 3 21 12 12 21 3 12Z"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			className: common,
			x: "4",
			y: "4",
			width: "16",
			height: "16",
			rx: id === "square" ? 1 : id === "rounded" ? 4 : 7
		})
	});
}
function StudioPanel() {
	const design = useStudio(useShallow((s) => ({
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
		groundDataUrl: s.groundDataUrl
	})));
	const patch = useStudio((s) => s.patch);
	const applyPalette = useStudio((s) => s.applyPalette);
	const markInput = (0, import_react.useRef)(null);
	const groundInput = (0, import_react.useRef)(null);
	const [fileNote, setFileNote] = (0, import_react.useState)(null);
	async function onFile(file, slot) {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setFileNote("Use a JPG or PNG.");
			return;
		}
		if (file.size > 8e6) {
			setFileNote("That file is over 8MB. Try a smaller picture.");
			return;
		}
		try {
			const url = await shrinkImage(file, slot === "mark" ? 640 : 1200);
			if (slot === "mark") patch({
				mark: "upload",
				markDataUrl: url
			});
			else patch({
				groundDataUrl: url,
				ground: design.ground === "off" ? "center" : design.ground
			});
			setFileNote(null);
		} catch (error) {
			setFileNote(error instanceof Error ? error.message : "Could not read that picture.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "01 — Content",
				title: "Where it leads",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm text-rose",
					htmlFor: "qr-data",
					children: "Link, phone, or a sentence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "qr-data",
					value: design.data,
					onChange: (e) => patch({ data: e.target.value }),
					rows: 3,
					className: "mt-2 w-full resize-none rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "02 — Form",
				title: "Shape and scale",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-rose",
						children: "Modules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5 gap-2",
						children: SHAPES.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							active: design.module === shape.id,
							label: shape.label,
							name: `${shape.label} modules`,
							onClick: () => patch({ module: shape.id }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeGlyph, { id: shape.id })
						}, shape.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 mb-2 text-sm text-rose",
						children: "Eyes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: EYES.map((eye) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							active: design.eye === eye.id,
							label: eye.label,
							name: `${eye.label} eyes`,
							onClick: () => patch({ eye: eye.id })
						}, eye.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 flex items-center justify-between text-sm",
						htmlFor: "qr-size",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-rose",
							children: [design.size, "px"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "qr-size",
						type: "range",
						min: 220,
						max: 640,
						step: 10,
						value: design.size,
						onChange: (e) => patch({ size: Number(e.target.value) }),
						className: "mt-2 w-full accent-ink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-center justify-between text-sm",
						htmlFor: "qr-quiet",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quiet margin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-rose",
							children: design.quiet
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "qr-quiet",
						type: "range",
						min: 2,
						max: 6,
						step: 1,
						value: design.quiet,
						onChange: (e) => patch({ quiet: Number(e.target.value) }),
						className: "mt-2 w-full accent-ink"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "03 — Colour",
				title: "Fifty-six pairings",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-rose",
						children: "Foreground and ground, chosen as a pair. Or set each yourself."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid max-h-64 grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-8",
						children: LOOKS.map((look) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							title: `${look.palette} — ${look.name}`,
							"aria-label": `${look.palette}, ${look.fg} on ${look.bg}`,
							"aria-pressed": design.paletteId === look.id,
							onClick: () => applyPalette(look),
							className: cn("relative h-11 overflow-hidden rounded-full border transition-transform duration-150 ease-out active:scale-[0.96]", design.paletteId === look.id ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-cream" : "border-linen"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 left-0 w-1/2",
								style: { background: look.fg }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 right-0 w-1/2",
								style: { background: look.bg }
							})]
						}, look.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 rounded-2xl border border-linen bg-paper px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: design.fg,
								"aria-label": "Foreground colour",
								onChange: (e) => patch({
									fg: e.target.value,
									paletteId: null
								}),
								className: "size-11 rounded-full border border-linen bg-transparent"
							}), "Foreground"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 rounded-2xl border border-linen bg-paper px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: design.bg,
								"aria-label": "Background colour",
								onChange: (e) => patch({
									bg: e.target.value,
									paletteId: null
								}),
								className: "size-11 rounded-full border border-linen bg-transparent"
							}), "Background"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "04 — Mark",
				title: "Centre icon",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: MARKS.map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							active: design.mark === mark.id,
							label: mark.label,
							onClick: () => {
								if (mark.id === "upload") markInput.current?.click();
								else patch({ mark: mark.id });
							}
						}, mark.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: markInput,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						className: "sr-only",
						onChange: (e) => {
							onFile(e.target.files?.[0], "mark");
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => markInput.current?.click(),
							className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-linen bg-paper px-4 text-sm transition-transform duration-150 active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
								className: "size-4",
								"aria-hidden": true
							}), "Upload from gallery"]
						}), design.markDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => patch({
								markDataUrl: null,
								mark: design.mark === "upload" ? "none" : design.mark
							}),
							className: "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-rose",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-4",
								"aria-hidden": true
							}), "Remove"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-center justify-between text-sm",
						htmlFor: "mark-scale",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Icon size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-rose",
							children: [Math.round(design.markScale * 100), "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "mark-scale",
						type: "range",
						min: 16,
						max: 30,
						step: 1,
						value: Math.round(design.markScale * 100),
						onChange: (e) => patch({ markScale: Number(e.target.value) / 100 }),
						className: "mt-2 w-full accent-ink"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "05 — Ground",
				title: "Picture behind",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: GROUNDS.map((ground) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							active: design.ground === ground.id,
							label: ground.label,
							name: `${ground.label} background`,
							onClick: () => patch({ ground: ground.id })
						}, ground.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-rose",
						children: "Small sits like a stamp. Centre is a plate. Full bleeds the photo to the edge and veils the code so it still scans."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => groundInput.current?.click(),
							className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-linen bg-paper px-4 text-sm transition-transform duration-150 active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
								className: "size-4",
								"aria-hidden": true
							}), "Upload background"]
						}), design.groundDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => patch({
								groundDataUrl: null,
								ground: "off"
							}),
							className: "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-rose",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-4",
								"aria-hidden": true
							}), "Clear"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: groundInput,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						className: "sr-only",
						onChange: (e) => {
							onFile(e.target.files?.[0], "ground");
							e.target.value = "";
						}
					}),
					fileNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-rose",
						children: fileNote
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				kicker: "06 — Lettering",
				title: "Words on the card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm text-rose",
						htmlFor: "cap",
						children: "Main line"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "cap",
						value: design.caption,
						onChange: (e) => patch({ caption: e.target.value }),
						className: "mt-2 w-full rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-sm text-rose",
						htmlFor: "sub",
						children: "Second line"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "sub",
						value: design.captionSub,
						onChange: (e) => patch({ captionSub: e.target.value }),
						className: "mt-2 w-full rounded-2xl border border-linen bg-paper px-4 py-3 outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: design.showCaption,
								label: "Show",
								pressed: () => patch({ showCaption: !design.showCaption })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: design.captionBold,
								label: "Bold",
								pressed: () => patch({ captionBold: !design.captionBold })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: design.captionItalic,
								label: "Italic",
								pressed: () => patch({ captionItalic: !design.captionItalic })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: design.captionCaps,
								label: "Caps",
								pressed: () => patch({ captionCaps: !design.captionCaps })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: design.captionFont === "serif",
								label: design.captionFont === "serif" ? "Serif" : "Sans",
								pressed: () => patch({ captionFont: design.captionFont === "serif" ? "sans" : "serif" })
							})
						]
					})
				]
			})
		]
	});
}
function Toggle({ on, label, pressed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick: pressed,
		className: cn("min-h-11 rounded-full px-4 text-sm font-medium transition-transform duration-150 active:scale-[0.96]", on ? "bg-ink text-cream" : "border border-linen bg-paper text-ink"),
		children: label
	});
}
function Studio() {
	const design = useStudio(useShallow((s) => ({
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
		templateId: s.templateId
	})));
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	async function save(kind) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "order-2 lg:order-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-rose uppercase",
					children: "Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display mt-2 text-5xl",
					children: "Every control. One canvas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-rose",
					children: "Templates stay on their own floor. Here you set the destination, the form, the pairing, the icon, the ground, and the words. What you see is the file."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/templates",
						className: "underline decoration-sand underline-offset-4",
						children: "Borrow a template"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioPanel, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "canvas-stage order-1 rounded-card p-4 sm:p-8 lg:sticky lg:top-24 lg:order-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-rose",
						children: "Live card"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportButton, {
							label: "PNG",
							busy: busy === "png",
							onClick: () => void save("png")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportButton, {
							label: "JPG",
							busy: busy === "jpeg",
							onClick: () => void save("jpeg")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrView, {
					design,
					pixelRatio: 2
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-rose",
					children: note
				}) : null
			]
		})]
	});
}
function ExportButton({ label, busy, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		disabled: busy,
		className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
			className: "size-4",
			"aria-hidden": true
		}), busy ? "Saving" : label]
	});
}
//#endregion
export { Studio as component };
