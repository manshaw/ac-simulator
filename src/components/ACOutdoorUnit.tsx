import { motion } from "framer-motion";
import { BrandBadge } from "./BrandBadge";
import type { ACBrand } from "../data/acBrands";

const RING_RADII = [10, 18, 26, 34, 42];
const SPOKE_COUNT = 20;

export function ACOutdoorUnit({ power, brand }: { power: boolean; brand: ACBrand }) {
  const spokes = Array.from({ length: SPOKE_COUNT }, (_, i) => (i * 360) / SPOKE_COUNT);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative flex w-full overflow-hidden rounded-xl shadow-2xl"
      style={{
        background: "linear-gradient(180deg, #f1f3f5 0%, #dfe3e6 45%, #c7cdd2 100%)",
        border: "1px solid #b7bec4",
      }}
    >
      {/* top highlight bevel */}
      <div
        className="absolute inset-x-0 top-0 h-3"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9), transparent)" }}
      />

      {/* pipe stub connectors, top-left */}
      <div className="absolute -top-1 left-8 z-20 h-3 w-3 rounded-full border-2 border-slate-400 bg-slate-200" />
      <div className="absolute -top-1 left-14 z-20 h-3 w-3 rounded-full border-2 border-slate-400 bg-slate-200" />

      {/* Fan grille panel */}
      <div className="relative m-3 flex aspect-square w-[42%] shrink-0 items-center justify-center rounded-md bg-[#e7e9ec] shadow-inner sm:w-[38%]">
        {/* corner screws */}
        {[
          { top: 6, left: 6 },
          { top: 6, right: 6 },
          { bottom: 6, left: 6 },
          { bottom: 6, right: 6 },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full border border-slate-400 bg-slate-300"
            style={pos}
          />
        ))}

        <div className="relative h-[82%] w-[82%]">
          {/* dark interior */}
          <div className="absolute inset-0 rounded-full bg-[#161c24] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]" />

          {/* spinning blades, visible through grille gaps */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ animation: power ? "compressor-spin 0.55s linear infinite" : "none" }}
          >
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 h-[7%] rounded-full bg-slate-400/80"
                style={{
                  width: "44%",
                  transform: `translate(2px, -50%) rotate(${deg}deg)`,
                  transformOrigin: "2px 50%",
                }}
              />
            ))}
          </div>

          {/* grille rings + spokes overlay */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            {RING_RADII.map((r) => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.85" />
            ))}
            {spokes.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 50 + 8 * Math.cos(rad);
              const y1 = 50 + 8 * Math.sin(rad);
              const x2 = 50 + 47 * Math.cos(rad);
              const y2 = 50 + 47 * Math.sin(rad);
              return (
                <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="0.6" opacity="0.7" />
              );
            })}
            <circle cx="50" cy="50" r="47" fill="none" stroke="#94a3b8" strokeWidth="2" />
          </svg>

          {/* center hub */}
          <div className="absolute top-1/2 left-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 shadow" />
        </div>
      </div>

      {/* Right panel: badge sticker + vents */}
      <div className="relative flex min-w-0 flex-1 flex-col justify-between py-4 pr-6 pl-1">
        <div className="flex min-w-0 justify-end">
          <div className="max-w-full min-w-0 rounded-sm bg-white/90 p-1.5 shadow-sm">
            <BrandBadge brand={brand} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-[#c7cdd2] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
            />
          ))}
        </div>

        {/* side vent nubs */}
        <div className="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col gap-2">
          <span className="h-4 w-1.5 rounded-l-full bg-slate-500/70" />
          <span className="h-4 w-1.5 rounded-l-full bg-slate-500/70" />
        </div>
      </div>

      {/* feet */}
      <div className="absolute -bottom-1.5 left-4 h-3 w-6 rounded-sm bg-slate-600/80" />
      <div className="absolute -bottom-1.5 right-4 h-3 w-6 rounded-sm bg-slate-600/80" />
    </motion.div>
  );
}
