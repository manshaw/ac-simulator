export interface ACBrand {
  id: string;
  name: string;
  from: string;
  to: string;
  text: string;
}

export const AC_BRANDS: ACBrand[] = [
  { id: "euro-aire", name: "EURO-AIRE", from: "#3b82f6", to: "#1e3a8a", text: "#ffffff" },
  { id: "haier", name: "HAIER", from: "#38bdf8", to: "#0369a1", text: "#ffffff" },
  { id: "gree", name: "GREE", from: "#4ade80", to: "#0f766e", text: "#ffffff" },
  { id: "panasonic", name: "PANASONIC", from: "#6366f1", to: "#1e1b4b", text: "#ffffff" },
  { id: "dawlance", name: "DAWLANCE", from: "#fb923c", to: "#c2410c", text: "#ffffff" },
];
