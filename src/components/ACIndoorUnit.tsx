import { motion } from "framer-motion";
import { BrandBadge } from "./BrandBadge";
import type { ACBrand } from "../data/acBrands";
import type { ACMode } from "../types";

const FIN_COUNT = 6;

export function ACIndoorUnit({
  power,
  swing,
  mode,
  temp,
  digitalColor,
  brand,
  hideDisplay,
}: {
  power: boolean;
  swing: boolean;
  mode: ACMode;
  temp: number;
  digitalColor: string;
  brand: ACBrand;
  hideDisplay: boolean;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative flex h-32 w-full flex-col justify-end overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-slate-200"
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="h-2 w-8 rounded-full bg-blue-400/70" />
        {/* Digital temperature display on the unit */}
        {power && !hideDisplay && (
          <div className="rounded-md bg-slate-900 px-2.5 py-1 shadow-inner">
            <span className="font-mono text-lg font-extrabold tabular-nums transition-colors" style={{ color: digitalColor }}>
              {mode === "clean" ? "CL" : `${temp}°`}
            </span>
          </div>
        )}
        <span className="text-[10px] font-bold text-slate-400">{power ? "ON" : "OFF"}</span>
      </div>

      <div className="flex items-center justify-end px-3 pt-2">
        <BrandBadge brand={brand} size="sm" />
      </div>

      {/* louvre / vent with swing fins */}
      <div
        className="mx-3 mt-2 mb-3 h-5 origin-top rounded-md transition-all duration-500"
        style={{
          transform: power ? "rotateX(55deg)" : "rotateX(0deg)",
          background: power ? "#334155" : "#cbd5e1",
        }}
      >
        {power && (
          <div className="flex h-full items-center justify-between gap-1 px-2">
            {Array.from({ length: FIN_COUNT }, (_, i) => (
              <span
                key={i}
                className="h-3.5 w-2 rounded-full bg-slate-100"
                style={{
                  animation: swing ? `fin-flutter 1.1s ease-in-out ${i * 0.12}s infinite` : "none",
                  transform: swing ? undefined : "scaleX(1)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
