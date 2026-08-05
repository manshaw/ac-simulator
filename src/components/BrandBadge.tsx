import type { ACBrand } from "../data/acBrands";

export function BrandBadge({ brand, size = "md" }: { brand: ACBrand; size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow-sm ${
        isSmall ? "h-4 w-14" : "h-6 w-24"
      }`}
      style={{
        background: `linear-gradient(180deg, ${brand.from}, ${brand.to})`,
        border: "1px solid rgba(255,255,255,0.6)",
      }}
    >
      <span
        className={`font-extrabold italic tracking-tight ${isSmall ? "text-[6px]" : "text-[10px]"}`}
        style={{ color: brand.text }}
      >
        {brand.name}
      </span>
    </div>
  );
}
