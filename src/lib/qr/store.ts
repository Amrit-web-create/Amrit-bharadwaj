import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Look } from "@/lib/qr/looks";
import { defaultDesign, type Design } from "@/lib/qr/types";

type StudioState = Design & {
  patch: (partial: Partial<Design>) => void;
  applyLook: (look: Look) => void;
  applyPalette: (look: Look) => void;
};

export const useStudio = create<StudioState>()(
  persist(
    (set) => ({
      ...defaultDesign,
      patch: (partial) => set(partial),
      applyLook: (look) =>
        set({
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
          templateId: look.id,
        }),
      applyPalette: (look) =>
        set({
          fg: look.fg,
          bg: look.bg,
          paletteId: look.id,
        }),
    }),
    {
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
        markDataUrl: state.markDataUrl && state.markDataUrl.length < 450_000 ? state.markDataUrl : null,
        markScale: state.markScale,
        ground: state.ground,
        groundDataUrl:
          state.groundDataUrl && state.groundDataUrl.length < 700_000 ? state.groundDataUrl : null,
        caption: state.caption,
        captionSub: state.captionSub,
        captionBold: state.captionBold,
        captionItalic: state.captionItalic,
        captionCaps: state.captionCaps,
        captionFont: state.captionFont,
        showCaption: state.showCaption,
        paletteId: state.paletteId,
        templateId: state.templateId,
      }),
    },
  ),
);
