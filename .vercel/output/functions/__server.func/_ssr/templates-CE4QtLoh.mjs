import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./router-CXt3eNWF.mjs";
import { i as designFromLook, n as LOOKS, o as renderMark, s as useStudio, t as CATEGORIES } from "./store-CLhcIncP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-CE4QtLoh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Templates() {
	const navigate = useNavigate();
	const applyLook = useStudio((s) => s.applyLook);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const shown = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return LOOKS.filter((look) => {
			if (category !== "All" && look.category !== category) return false;
			if (!q) return true;
			return `${look.name} ${look.palette} ${look.category} ${look.caption}`.toLowerCase().includes(q);
		});
	}, [query, category]);
	function useLook(look) {
		applyLook(look);
		navigate({ to: "/studio" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-rose uppercase",
				children: "Templates"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-3 max-w-3xl text-5xl sm:text-6xl",
				children: "Fifty-six looks, already in good clothes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-lg text-rose",
				children: "These are not buried inside the studio. Pick a card — a vow, a ferry, a listening bar, a proof — and it becomes the mark. Your link stays. You can still change every control after."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "look-search",
						children: "Search templates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "look-search",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search night, vow, cafe, ink…",
						className: "w-full rounded-full border border-linen bg-paper px-5 py-3 outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						role: "tablist",
						"aria-label": "Categories",
						children: ["All", ...CATEGORIES].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": category === item,
							onClick: () => setCategory(item),
							className: cn("shrink-0 rounded-full px-4 py-2 text-sm transition-transform duration-150 active:scale-[0.96]", category === item ? "bg-ink text-cream" : "bg-paper text-ink border border-linen"),
							children: item
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-blush",
						children: [shown.length, " templates"]
					})
				]
			}),
			shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-rose",
				children: "Nothing under that name. Try cafe, night, or vow."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: shown.map((look) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col rounded-card border border-linen bg-paper p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, { look }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs tracking-widest text-blush uppercase",
							children: look.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display mt-1 text-3xl",
							children: look.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-rose",
							children: [look.palette, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-blush",
								children: [" · ", look.caption]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => useLook(look),
							className: "mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 active:scale-[0.96]",
							children: "Use this look"
						})
					]
				}, look.id))
			})
		]
	});
}
function Mini({ look }) {
	const wrap = (0, import_react.useRef)(null);
	const canvas = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = wrap.current;
		if (!el) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
		}, { rootMargin: "240px" });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!visible || !canvas.current) return;
		const design = designFromLook(look, "https://aurel.studio", false);
		design.size = 220;
		renderMark(canvas.current, design, 1);
	}, [visible, look]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrap,
		className: "overflow-hidden rounded-2xl bg-linen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvas,
			className: "block h-auto w-full",
			"aria-hidden": true
		})
	});
}
//#endregion
export { Templates as component };
