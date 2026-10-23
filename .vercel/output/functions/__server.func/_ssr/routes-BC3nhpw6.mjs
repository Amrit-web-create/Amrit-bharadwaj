import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowUpRight, r as Link2 } from "../_libs/lucide-react.mjs";
import { n as cn } from "./router-CXt3eNWF.mjs";
import { n as LOOKS, r as defaultDesign, s as useStudio } from "./store-CLhcIncP.mjs";
import { t as QrView } from "./qr-view-D9jeQGaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BC3nhpw6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function normalizeTarget(raw) {
	const t = raw.trim();
	if (!t) return "";
	if (/^(https?:|mailto:|tel:)/i.test(t)) return t;
	if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(t)) return `mailto:${t}`;
	if (/^[+]?[\d][\d\s().-]{6,}$/.test(t)) return `tel:${t.replace(/[^\d+]/g, "")}`;
	if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(t)) return `https://${t}`;
	return t;
}
function Home() {
	const navigate = useNavigate();
	const patch = useStudio((s) => s.patch);
	const [value, setValue] = (0, import_react.useState)(defaultDesign.data);
	const [error, setError] = (0, import_react.useState)(null);
	const [tilt, setTilt] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [shift, setShift] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const sync = () => setValue(useStudio.getState().data);
		if (useStudio.persist.hasHydrated()) sync();
		return useStudio.persist.onFinishHydration(sync);
	}, []);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const mid = window.innerHeight * .5;
			setShift(Math.max(-18, Math.min(18, (window.scrollY - mid) * .04)));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const live = (0, import_react.useMemo)(() => ({
		...defaultDesign,
		data: normalizeTarget(value) || "https://aurel.studio",
		showCaption: true,
		caption: "A mark worth scanning",
		captionSub: "Aurel atelier",
		size: 320
	}), [value]);
	function generate() {
		const next = normalizeTarget(value);
		if (!next) {
			setError("Add a link or a line of text.");
			return;
		}
		setError(null);
		patch({ data: next });
		navigate({ to: "/studio" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			onMouseMove: (e) => {
				const r = e.currentTarget.getBoundingClientRect();
				setTilt({
					x: (e.clientX - r.left) / r.width - .5,
					y: (e.clientY - r.top) / r.height - .5
				});
			},
			onMouseLeave: () => setTilt({
				x: 0,
				y: 0
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-hidden": true,
				className: "ghost-word display pointer-events-none absolute -top-8 right-0 hidden text-linen select-none lg:block",
				style: { transform: `translateY(${shift}px)` },
				children: "Aurel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise text-xs tracking-widest text-rose uppercase",
						children: "QR atelier"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display rise mt-4 text-5xl text-ink sm:text-7xl",
						style: { animationDelay: "80ms" },
						children: ["Make the mark", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block italic text-rose",
							children: "feel considered."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise mt-6 max-w-xl text-lg text-rose",
						style: { animationDelay: "160ms" },
						children: "Aurel is a quiet studio for QR codes — the kind you put on a card, a menu, a poster, a window. Not a generator that looks like a settings page. Paste a destination, then shape the code until it belongs to the work."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise mt-4 max-w-xl text-base text-ink/80",
						style: { animationDelay: "220ms" },
						children: "Fifty-six colour pairings. Modules from strict squares to soft dots. A centre mark for Instagram, Facebook, WhatsApp, a website, or a picture from your gallery. Grounds that sit small, centred, or full-bleed. Export a real PNG or JPG. The code still scans."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "float-y rise",
					style: { animationDelay: "200ms" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tilt",
						style: { transform: `rotateY(${tilt.x * 10}deg) rotateX(${tilt.y * -8}deg)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrView, { design: live })
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "destination",
					className: "text-sm text-rose",
					children: "Where should this mark lead?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex flex-col gap-2 rounded-card border border-linen bg-paper p-2 shadow-lift sm:flex-row sm:items-center",
					onSubmit: (e) => {
						e.preventDefault();
						generate();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-14 flex-1 items-center gap-3 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
							className: "size-5 shrink-0 text-blush",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "destination",
							value,
							onChange: (e) => {
								setValue(e.target.value);
								if (error) setError(null);
							},
							placeholder: "https://your-site.com",
							autoCapitalize: "off",
							autoCorrect: "off",
							spellCheck: false,
							className: "w-full bg-transparent py-3 text-lg outline-none placeholder:text-sand"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-cream transition-transform duration-150 ease-out active:scale-[0.96]",
						children: ["Generate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "size-4",
							"aria-hidden": true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-3 text-sm", error ? "text-rose" : "text-blush"),
					children: error ?? "Links, phone numbers, and plain sentences all work. Generate carries this destination into the studio."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Motions, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rooms, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteRail, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateTease, {})
	] });
}
function Motions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-linen bg-paper/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-rose uppercase",
					children: "Motion, kept quiet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-3 max-w-2xl text-4xl sm:text-5xl",
					children: "Six gestures. None of them decoration for its own sake."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-rose",
					children: "Hover, a loader, a turn in light, an entrance, a press, a shift in depth. They are how this site moves — and how the studio should feel when you change a colour or export a file."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group rounded-card border border-linen bg-cream p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-blush uppercase",
									children: "Hover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display mt-2 text-3xl",
									children: "Cards that acknowledge a hand"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-6 h-36",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-8 left-4 h-20 w-32 rounded-2xl bg-blush transition-transform duration-300 ease-out group-hover:-translate-x-3 group-hover:-rotate-12" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-6 left-10 h-20 w-32 rounded-2xl bg-sand transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:rotate-6" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-3 left-8 flex h-20 w-36 items-end rounded-2xl bg-paper p-3 shadow-lift transition-transform duration-300 ease-out group-hover:-translate-y-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: "Preferences"
											})
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-card border border-linen bg-cream p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-blush uppercase",
									children: "Loader"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display mt-2 text-3xl",
									children: "A line, then the room"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-rose",
									children: "The atelier announces itself once, then gets out of the way."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 h-px w-full bg-linen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "load-rule h-px w-full bg-ink" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-card border border-linen bg-ink p-5 text-cream",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-sand uppercase",
									children: "3D motion"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display mt-2 text-3xl text-cream",
									children: "A mark that turns in light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-6 grid h-36 place-items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spin-slow absolute size-32 rounded-full border border-dashed border-sand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb size-20 rounded-full shadow-lift" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-card border border-linen bg-cream p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-blush uppercase",
									children: "Entrance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display mt-2 text-3xl",
									children: "Type that arrives"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rise mt-6 font-serif text-2xl italic text-rose",
									children: "Not a pop. A reveal."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-card border border-linen bg-cream p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-blush uppercase",
									children: "Micro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "display mt-2 text-3xl",
									children: "Buttons with a pulse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicroDemo, {})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "relative overflow-hidden rounded-card border border-linen bg-linen p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxCard, {})
						})
					]
				})
			]
		})
	});
}
function ParallaxCard() {
	const [y, setY] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setY(Math.max(-16, Math.min(16, window.scrollY % 400 * .04 - 8)));
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"aria-hidden": true,
		className: "display pointer-events-none absolute -right-2 -bottom-6 text-7xl text-sand",
		style: { transform: `translateY(${y * 1.8}px)` },
		children: "Depth"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		style: { transform: `translateY(${y}px)` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-rose uppercase",
				children: "Parallax"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "display mt-2 text-3xl",
				children: "Layers that do not share a speed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xs text-sm text-rose",
				children: "The word behind this card drifts on its own. The headline stays put."
			})
		]
	})] });
}
function MicroDemo() {
	const [on, setOn] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-pressed": on,
		onClick: () => setOn((v) => !v),
		className: "mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-4 text-sm text-cream transition-transform duration-150 ease-out active:scale-[0.96]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid size-6 place-items-center rounded-full transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", on ? "scale-100 bg-cream opacity-100 blur-none" : "scale-[0.25] bg-sand opacity-70 blur-[4px]"),
			"aria-hidden": true
		}), on ? "Bold, on" : "Press for bold"]
	});
}
function Rooms() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "display text-4xl sm:text-5xl",
			children: "Three rooms. Full control in one of them."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-6 md:grid-cols-3",
			children: [
				{
					n: "01",
					title: "Home",
					body: "The bar at the top of the house takes a link, a number, or a sentence. Generate opens the studio with that destination already set. Nothing else is asked of you."
				},
				{
					n: "02",
					title: "Templates",
					body: "Fifty-six ready looks live on their own floor — cafe cards, night lists, vows, editorial proofs. Choose one and it dresses the mark. The studio does not hide them in a drawer."
				},
				{
					n: "03",
					title: "Studio",
					body: "Shape, size, quiet margin, colour, centre icon, background, and the words on the card. Bold, italic, caps, serif or sans. Then a real PNG or JPG, drawn in the browser."
				}
			].map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-t border-ink pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-blush uppercase",
						children: room.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-2 text-3xl",
						children: room.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-rose",
						children: room.body
					})
				]
			}, room.n))
		})]
	});
}
function PaletteRail() {
	const sample = LOOKS.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-linen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-rose uppercase",
					children: "From the rose sheet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-2 text-4xl",
					children: "Ink, blush, sand, cream."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm text-rose",
					children: "The house palette is one family. The codes may wear any of the fifty-six pairings — night, coast, ceremony, signal — as long as the contrast holds."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
				children: sample.map((look) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-linen",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16",
							style: { background: look.bg }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8",
							style: { background: look.fg }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "bg-paper px-2 py-2 text-xs",
							children: look.palette
						})
					]
				}, look.id))
			})]
		})
	});
}
function TemplateTease() {
	const picks = [
		LOOKS[0],
		LOOKS[14],
		LOOKS[35],
		LOOKS[42],
		LOOKS[21],
		LOOKS[49]
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-4xl sm:text-5xl",
				children: "Looks, already dressed."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/templates",
				className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-cream transition-transform duration-150 active:scale-[0.96]",
				children: ["All templates", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
					className: "size-4",
					"aria-hidden": true
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: picks.map((look) => look ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/templates",
				className: "flex items-center justify-between rounded-2xl border border-linen bg-paper px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs tracking-widest text-blush uppercase",
					children: look.category
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "display mt-1 block text-2xl",
					children: look.name
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex h-12 w-16 overflow-hidden rounded-xl border border-linen",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-1/2",
						style: { background: look.fg }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-1/2",
						style: { background: look.bg }
					})]
				})]
			}, look.id) : null)
		})]
	});
}
//#endregion
export { Home as component };
