import type { CaptionFont, Design, EyeShape, LookCategory, ModuleShape } from "@/lib/qr/types";
import { defaultDesign } from "@/lib/qr/types";

export type Look = {
  id: string;
  palette: string;
  name: string;
  category: LookCategory;
  fg: string;
  bg: string;
  module: ModuleShape;
  eye: EyeShape;
  caption: string;
  sub: string;
  bold: boolean;
  italic: boolean;
  font: CaptionFont;
};

type Row = [
  id: string,
  palette: string,
  name: string,
  category: LookCategory,
  fg: string,
  bg: string,
  module: ModuleShape,
  eye: EyeShape,
  caption: string,
  sub: string,
  bold: 0 | 1,
  italic: 0 | 1,
  font: CaptionFont,
];

const ROWS: Row[] = [
  ["pressed-card", "Ink Rose", "Pressed Card", "Atelier", "#3E3239", "#F7EFE7", "rounded", "rounded", "The private view", "Thursday, after six", 1, 1, "serif"],
  ["milk-glass", "Dust Veil", "Milk Glass", "Atelier", "#3E3239", "#E8D2C4", "squircle", "leaf", "Soft launch", "By invitation", 1, 0, "serif"],
  ["cocoa-note", "Cocoa Milk", "Cocoa Note", "Atelier", "#3A2A24", "#F6EDE4", "square", "square", "Table four", "Hold until nine", 1, 0, "sans"],
  ["plum-editorial", "Plum Paper", "Plum Editorial", "Atelier", "#3F2C38", "#F4E4DC", "rounded", "circle", "Issue 04", "Printed in rose", 1, 1, "serif"],
  ["night-bloom", "Night Bloom", "Night Bloom", "Atelier", "#F7EFE7", "#3E3239", "dot", "circle", "After dark", "Doors at ten", 1, 0, "serif"],
  ["velvet-room", "Velvet", "Velvet Room", "Atelier", "#F3E4DC", "#2A2226", "squircle", "rounded", "Members", "Show this mark", 1, 0, "sans"],
  ["wine-hour", "Wine Hour", "Wine Hour", "Atelier", "#F7EFE7", "#4A2430", "rounded", "leaf", "Last seating", "Kitchen closes", 1, 1, "serif"],

  ["carbon-proof", "Carbon", "Carbon Proof", "Editorial", "#1A1A1A", "#F4F1EC", "square", "square", "Read the piece", "No. 18", 1, 0, "sans"],
  ["sunday-paper", "Newsprint", "Sunday Paper", "Editorial", "#22201C", "#E7E2D8", "rounded", "square", "The interview", "This weekend", 1, 0, "serif"],
  ["white-wall", "Gallery", "White Wall", "Editorial", "#141414", "#FFFFFF", "square", "rounded", "Now showing", "North room", 1, 0, "sans"],
  ["night-proof", "Graphite", "Night Proof", "Editorial", "#F2F0EB", "#1C1C1C", "dot", "circle", "Black edition", "Limited run", 1, 0, "sans"],
  ["margin-notes", "Slate", "Margin Notes", "Editorial", "#1E2933", "#E8EEF2", "rounded", "rounded", "Field notes", "Volume two", 0, 1, "serif"],
  ["warm-charcoal", "Charcoal", "Warm Charcoal", "Editorial", "#2C2825", "#F3EEE6", "squircle", "leaf", "Studio visit", "By appointment", 1, 0, "serif"],
  ["the-index", "Index", "The Index", "Editorial", "#1A1614", "#F7F4EF", "square", "square", "Contents", "Start here", 1, 0, "sans"],

  ["espresso-card", "Espresso", "Espresso Card", "Cafe", "#2B1B14", "#F3E6D4", "rounded", "rounded", "Order ahead", "Bar opens at 8", 1, 0, "serif"],
  ["morning-latte", "Latte", "Morning Latte", "Cafe", "#3D2918", "#F8F1E7", "squircle", "circle", "The daily", "Single origin", 1, 0, "serif"],
  ["mocha-night", "Mocha", "Mocha Night", "Cafe", "#F6E8D8", "#3C2A22", "dot", "rounded", "Dessert menu", "After four", 1, 0, "sans"],
  ["honey-jar", "Honey", "Honey Jar", "Cafe", "#3A2A10", "#F8F0D8", "rounded", "leaf", "Sunday bake", "Until sold out", 1, 1, "serif"],
  ["olive-branch", "Olive", "Olive Branch", "Cafe", "#2E3420", "#F3F0E4", "square", "square", "Lunch, set", "Twelve to three", 1, 0, "sans"],
  ["clay-cup", "Terracotta", "Clay Cup", "Cafe", "#5A2C1C", "#F8EDE3", "squircle", "rounded", "House blend", "Ask the bar", 1, 0, "serif"],
  ["last-cup", "Cocoa Dark", "Last Cup", "Cafe", "#F6EDE4", "#2A1C16", "rounded", "circle", "Closed kitchen", "Tomorrow at 8", 1, 0, "serif"],

  ["sage-room", "Sage", "Sage Room", "Wellness", "#243028", "#E7F0E6", "rounded", "circle", "Book an hour", "Quiet floor", 1, 0, "serif"],
  ["moss-light", "Moss", "Moss Light", "Wellness", "#E8F2E4", "#24332A", "dot", "circle", "Dawn class", "Bring water", 1, 0, "sans"],
  ["still-water", "Spa", "Still Water", "Wellness", "#1F3A38", "#E5F2EF", "squircle", "rounded", "The treatment", "Arrive early", 1, 0, "serif"],
  ["green-rest", "Eucalyptus", "Green Rest", "Wellness", "#1E3330", "#E4EFE8", "rounded", "leaf", "Breathwork", "Small group", 0, 1, "serif"],
  ["warm-clay", "Clay", "Warm Clay", "Wellness", "#5C3A32", "#F6EBE4", "square", "rounded", "Slow morning", "Phones aside", 1, 0, "serif"],
  ["soft-blossom", "Blossom", "Soft Blossom", "Wellness", "#3E3239", "#F3E7E4", "squircle", "circle", "Facial, forty-five", "Book below", 1, 0, "sans"],
  ["deep-forest", "Forest", "Deep Forest", "Wellness", "#E7F3EA", "#1A2C22", "rounded", "rounded", "Trail map", "Start at the gate", 1, 0, "sans"],

  ["harbor-light", "Navy", "Harbor Light", "Coast", "#10243F", "#E7EEF6", "square", "square", "Boarding", "Slip four", 1, 0, "sans"],
  ["night-tide", "Tide", "Night Tide", "Coast", "#E8F1F8", "#0E2438", "dot", "circle", "Last ferry", "Nine forty", 1, 0, "sans"],
  ["sea-glass", "Sea Glass", "Sea Glass", "Coast", "#12343A", "#E5F3F1", "rounded", "rounded", "The coast list", "Summer", 1, 1, "serif"],
  ["sandbar", "Sandbar", "Sandbar", "Coast", "#243044", "#F4EFE6", "squircle", "leaf", "Rooms left", "Ocean side", 1, 0, "serif"],
  ["dark-harbor", "Harbor", "Dark Harbor", "Coast", "#F2F6F8", "#163044", "rounded", "circle", "Chart a course", "Tap to open", 1, 0, "sans"],
  ["shell-white", "Shell", "Shell White", "Coast", "#3A2E2A", "#F7F1EA", "rounded", "rounded", "Low tide", "Walk with us", 0, 1, "serif"],
  ["atlantic", "Atlantic", "Atlantic", "Coast", "#0E1C2C", "#E6EEF4", "square", "square", "Regatta", "Saturday", 1, 0, "sans"],

  ["obsidian", "Obsidian", "Obsidian", "Night", "#F5F2EE", "#0E0E10", "square", "square", "Guest list", "Name at the door", 1, 0, "sans"],
  ["midnight-ink", "Midnight", "Midnight Ink", "Night", "#E8E4F2", "#12141C", "dot", "circle", "Set times", "Room two", 1, 0, "sans"],
  ["rose-after", "Rose Dark", "Rose After", "Night", "#F7EFE7", "#1A1216", "squircle", "leaf", "Encore", "One more hour", 1, 1, "serif"],
  ["emerald-night", "Emerald", "Emerald Night", "Night", "#E7F6EC", "#0E1F18", "rounded", "circle", "Listening bar", "No photos, please", 1, 0, "serif"],
  ["cobalt-room", "Cobalt", "Cobalt Room", "Night", "#EAF0FF", "#10182E", "dot", "rounded", "Late set", "Starts at eleven", 1, 0, "sans"],
  ["amber-dark", "Amber", "Amber Dark", "Night", "#F8E7C4", "#1A140C", "squircle", "leaf", "Whisky list", "Ask upstairs", 1, 0, "serif"],
  ["black-tie", "Black Tie", "Black Tie", "Night", "#F7F4EF", "#111111", "square", "square", "You are expected", "Formal", 1, 0, "serif"],

  ["ivory-vow", "Ivory", "Ivory Vow", "Ceremony", "#2C2420", "#FBF7F2", "rounded", "rounded", "Our day", "Scan for the details", 1, 1, "serif"],
  ["champagne", "Champagne", "Champagne", "Ceremony", "#3A2C24", "#F6EBD9", "squircle", "leaf", "To the couple", "Table plan", 1, 0, "serif"],
  ["blush-vow", "Blush", "Blush Vow", "Ceremony", "#4A3040", "#F8E8EA", "rounded", "circle", "Save the date", "June the twelfth", 1, 1, "serif"],
  ["gold-line", "Gold", "Gold Line", "Ceremony", "#3A2E18", "#F8F1DE", "square", "square", "The reception", "Dancing after", 1, 0, "serif"],
  ["pearl", "Pearl", "Pearl", "Ceremony", "#2A2628", "#F4F0F2", "squircle", "rounded", "Kindly reply", "By the first", 0, 1, "serif"],
  ["garden-party", "Garden", "Garden Party", "Ceremony", "#243028", "#F3F6EF", "rounded", "leaf", "In the garden", "Four o'clock", 1, 0, "serif"],
  ["dusk-vow", "Dusk", "Dusk Vow", "Ceremony", "#F6EEE8", "#3A2A32", "dot", "circle", "Evening vows", "Under the lights", 1, 1, "serif"],

  ["signal-blue", "Klein", "Signal Blue", "Signal", "#0C2F8A", "#E8EEF8", "square", "square", "Open the work", "Case study", 1, 0, "sans"],
  ["pine-signal", "Pine", "Pine Signal", "Signal", "#143024", "#E6F0E4", "rounded", "rounded", "Download", "The deck", 1, 0, "sans"],
  ["indigo-note", "Indigo", "Indigo Note", "Signal", "#1E1B4B", "#EEEAF6", "squircle", "circle", "Join the call", "Link inside", 1, 0, "sans"],
  ["copperplate", "Copper", "Copperplate", "Signal", "#6B3418", "#F8EDE3", "square", "leaf", "The lookbook", "Spring", 1, 0, "serif"],
  ["bone-paper", "Bone", "Bone Paper", "Signal", "#1F1A17", "#EFEAE2", "rounded", "square", "Portfolio", "Selected work", 1, 0, "sans"],
  ["lilac-ink", "Lilac", "Lilac Ink", "Signal", "#2A2438", "#F3EEF6", "dot", "circle", "New essay", "Twelve minutes", 0, 1, "serif"],
  ["crimson-seal", "Crimson", "Crimson Seal", "Signal", "#F8E8E6", "#3A1218", "squircle", "rounded", "Limited drop", "Tonight only", 1, 0, "sans"],
];

function rowToLook(row: Row): Look {
  const [id, palette, name, category, fg, bg, module, eye, caption, sub, bold, italic, font] = row;
  return { id, palette, name, category, fg, bg, module, eye, caption, sub, bold: bold === 1, italic: italic === 1, font };
}

export const LOOKS: Look[] = ROWS.map(rowToLook);

export const CATEGORIES: LookCategory[] = [
  "Atelier",
  "Editorial",
  "Cafe",
  "Wellness",
  "Coast",
  "Night",
  "Ceremony",
  "Signal",
];

export function designFromLook(look: Look, data = defaultDesign.data, withCaption = false): Design {
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
    size: withCaption ? defaultDesign.size : 280,
  };
}
