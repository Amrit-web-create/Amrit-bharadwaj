export type ModuleShape = "square" | "rounded" | "dot" | "squircle" | "diamond";
export type EyeShape = "square" | "rounded" | "circle" | "leaf";
export type MarkKind = "none" | "instagram" | "facebook" | "whatsapp" | "web" | "upload";
export type GroundMode = "off" | "small" | "center" | "full";
export type CaptionFont = "serif" | "sans";
export type LookCategory =
  | "Atelier"
  | "Editorial"
  | "Cafe"
  | "Wellness"
  | "Coast"
  | "Night"
  | "Ceremony"
  | "Signal";

export type Design = {
  data: string;
  fg: string;
  bg: string;
  module: ModuleShape;
  eye: EyeShape;
  size: number;
  quiet: number;
  mark: MarkKind;
  markDataUrl: string | null;
  markScale: number;
  ground: GroundMode;
  groundDataUrl: string | null;
  caption: string;
  captionSub: string;
  captionBold: boolean;
  captionItalic: boolean;
  captionCaps: boolean;
  captionFont: CaptionFont;
  showCaption: boolean;
  paletteId: string | null;
  templateId: string | null;
};

export const defaultDesign: Design = {
  data: "https://aurel.studio",
  fg: "#3E3239",
  bg: "#F7EFE7",
  module: "rounded",
  eye: "rounded",
  size: 360,
  quiet: 4,
  mark: "none",
  markDataUrl: null,
  markScale: 0.22,
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
  templateId: null,
};
