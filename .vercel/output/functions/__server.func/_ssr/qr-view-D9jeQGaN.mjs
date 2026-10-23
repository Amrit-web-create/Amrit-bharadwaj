import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./router-CXt3eNWF.mjs";
import { o as renderMark } from "./store-CLhcIncP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-view-D9jeQGaN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QrView({ design, pixelRatio = 2, className, framed = true }) {
	const ref = (0, import_react.useRef)(null);
	const [info, setInfo] = (0, import_react.useState)(null);
	const key = (0, import_react.useMemo)(() => JSON.stringify(design), [design]);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		let cancel = false;
		renderMark(canvas, design, pixelRatio).then((next) => {
			if (!cancel) setInfo(next);
		}).catch(() => {
			if (!cancel) setInfo({
				note: "Could not draw that mark.",
				warn: true
			});
		});
		return () => {
			cancel = true;
		};
	}, [
		key,
		pixelRatio,
		design
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: cn("m-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn(framed && "overflow-hidden rounded-card bg-paper shadow-lift"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				className: "block h-auto w-full",
				role: "img",
				"aria-label": "QR code preview"
			})
		}), info ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: cn("mt-3 text-sm", info.warn ? "text-rose" : "text-blush"),
			children: info.note
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mt-3 text-sm text-blush",
			children: "Drawing the mark…"
		})]
	});
}
//#endregion
export { QrView as t };
