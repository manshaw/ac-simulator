import { motion, AnimatePresence } from "framer-motion";
import type { ACMode, FanSpeed } from "../types";

const MODE_ICON: Record<ACMode, string> = {
  cool: "❄",
  heat: "☀",
  fan: "🌀",
  dry: "💧",
  auto: "A",
  ice: "🧊",
};

const SPEED_BARS: Record<FanSpeed, number> = { low: 1, med: 2, high: 3 };

export function HaierRemote({
  power,
  mode,
  temp,
  speed,
  swing,
  lcdGlow,
  flash,
  showIce = false,
  compact = false,
  onTogglePower,
  onSetMode,
  onCycleSpeed,
  onToggleSwing,
  onChangeTemp,
  onQuiet,
  onToggleLight,
  onDecorative,
}: {
  power: boolean;
  mode: ACMode;
  temp: number;
  speed: FanSpeed;
  swing: boolean;
  lcdGlow: boolean;
  flash: string | null;
  showIce?: boolean;
  compact?: boolean;
  onTogglePower: () => void;
  onSetMode: (m: ACMode) => void;
  onCycleSpeed: () => void;
  onToggleSwing: () => void;
  onChangeTemp: (delta: number) => void;
  onQuiet: () => void;
  onToggleLight: () => void;
  onDecorative: (label: string) => void;
}) {
  const bars = SPEED_BARS[speed];

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className={`relative flex w-full flex-col items-center rounded-t-[3rem] rounded-b-3xl border-4 border-slate-200 bg-[#fdfdfc] shadow-2xl ${
        compact ? "max-w-[230px] gap-3 p-4 pt-6" : "max-w-[340px] gap-4 p-6 pt-8"
      }`}
    >
      {/* LCD screen */}
      <div
        className={`relative w-full rounded-lg border-2 border-slate-300 shadow-inner transition-shadow ${compact ? "p-2.5" : "p-4"}`}
        style={{
          background: "#c9d3c6",
          boxShadow: lcdGlow ? "0 0 18px 4px rgba(250,204,21,0.55), inset 0 2px 6px rgba(0,0,0,0.25)" : "inset 0 2px 6px rgba(0,0,0,0.25)",
        }}
      >
        <div className={`flex items-center justify-center gap-1 ${compact ? "text-base" : "text-xl"}`} style={{ color: "#3a463d", opacity: power ? 1 : 0.15 }}>
          <span>{MODE_ICON[mode]}</span>
        </div>
        <div
          className="flex items-end justify-center gap-2 font-mono"
          style={{ color: "#2f3a32", opacity: power ? 1 : 0.15 }}
        >
          <span className={compact ? "text-2xl" : "text-4xl"}>{bars >= 1 ? "◟" : ""}</span>
          <span className={`font-extrabold leading-none tabular-nums ${compact ? "text-4xl" : "text-6xl"}`}>
            {power ? temp : "24"}
          </span>
          <span className={`mb-2 ${compact ? "text-xs" : "text-base"}`}>°C</span>
        </div>
        <div className="flex items-center justify-between px-1" style={{ opacity: power ? 1 : 0.15 }}>
          <div className="flex items-end gap-0.5">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className="block w-2 rounded-sm"
                style={{ height: 5 + n * 4, background: n <= bars ? "#2f3a32" : "transparent", border: "1px solid #2f3a32" }}
              />
            ))}
          </div>
          <span className={`font-bold tracking-widest ${compact ? "text-[10px]" : "text-xs"}`} style={{ color: "#2f3a32" }}>
            {swing ? "SWING" : ""}
          </span>
        </div>
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 -bottom-6 text-center text-sm font-bold text-slate-500"
            >
              {flash}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quiet + Power */}
      <div className="flex w-full items-center justify-around">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onQuiet}
          className={`rounded-full bg-emerald-400 font-extrabold text-white shadow-md ${compact ? "px-4 py-2 text-xs" : "px-7 py-3 text-sm"}`}
        >
          QUIET
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onTogglePower}
          aria-label="Power"
          className={`flex items-center justify-center rounded-full text-white shadow-md ${compact ? "h-10 w-10 text-lg" : "h-14 w-14 text-2xl"}`}
          style={{ background: power ? "#dc2626" : "#f87171" }}
        >
          ⏻
        </motion.button>
      </div>

      {/* Cool / Heat / Dry / (Ice) */}
      <div className={`grid w-full gap-2 ${showIce ? "grid-cols-4" : "grid-cols-3"}`}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onSetMode("cool")}
          className={`rounded-xl border-2 font-extrabold shadow ${compact ? "py-2 text-[10px]" : "py-3 text-xs sm:text-sm"}`}
          style={{
            background: mode === "cool" && power ? "#93c5fd" : "#dbe4fb",
            borderColor: "#5b7fd1",
            color: "#1e3a8a",
          }}
        >
          COOL
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onSetMode("heat")}
          className={`rounded-xl border-2 font-extrabold shadow ${compact ? "py-2 text-[10px]" : "py-3 text-xs sm:text-sm"}`}
          style={{
            background: mode === "heat" && power ? "#fdba74" : "#fee3c8",
            borderColor: "#e08a3c",
            color: "#7c2d12",
          }}
        >
          HEAT
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onSetMode("dry")}
          className={`rounded-xl border-2 font-extrabold shadow ${compact ? "py-2 text-[10px]" : "py-3 text-xs sm:text-sm"}`}
          style={{
            background: mode === "dry" && power ? "#e2e8f0" : "#f8fafc",
            borderColor: "#94a3b8",
            color: "#334155",
          }}
        >
          DRY
        </motion.button>
        {showIce && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onSetMode("ice")}
            className={`rounded-xl border-2 font-extrabold shadow ${compact ? "py-2 text-[10px]" : "py-3 text-xs sm:text-sm"}`}
            style={{
              background: mode === "ice" && power ? "#67e8f9" : "#e0fbff",
              borderColor: "#22b8d8",
              color: "#0e6379",
            }}
          >
            ICE
          </motion.button>
        )}
      </div>

      {/* Temp / Auto / Fan / Swing wheel */}
      <div className={`grid w-full grid-cols-3 grid-rows-3 rounded-[2rem] border-2 border-slate-200 bg-slate-50 ${compact ? "gap-1.5 p-2" : "gap-2 p-3"}`}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onChangeTemp(1)}
          className={`col-start-2 row-start-1 rounded-full bg-white font-extrabold text-slate-600 shadow ${compact ? "py-1.5 text-[10px]" : "py-2 text-xs"}`}
        >
          TEMP+
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onSetMode("auto")}
          className={`col-start-1 row-start-2 rounded-full font-extrabold shadow ${compact ? "py-1.5 text-[10px]" : "py-2 text-xs"}`}
          style={{ background: mode === "auto" && power ? "#c4b5fd" : "#fff", color: "#5b21b6" }}
        >
          AUTO
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCycleSpeed}
          className={`col-start-2 row-start-2 flex flex-col items-center justify-center gap-0.5 rounded-full font-extrabold text-white shadow-md ${compact ? "text-[10px]" : "text-xs"}`}
          style={{ background: "#64748b" }}
        >
          <span className={`leading-none ${compact ? "text-sm" : "text-lg"}`}>🌀</span>
          FAN
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onToggleSwing}
          className={`col-start-3 row-start-2 rounded-full font-extrabold shadow ${compact ? "py-1.5 text-[10px]" : "py-2 text-xs"}`}
          style={{ background: swing ? "#7dd3fc" : "#fff", color: "#0c4a6e" }}
        >
          SWING
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onChangeTemp(-1)}
          className={`col-start-2 row-start-3 rounded-full bg-white font-extrabold text-slate-600 shadow ${compact ? "py-1.5 text-[10px]" : "py-2 text-xs"}`}
        >
          TEMP−
        </motion.button>
      </div>

      {!compact && (
        <>
          {/* Timer / Up / Extra function */}
          <div className="grid w-full grid-cols-3 gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("Timer")}
              className="rounded-lg bg-slate-100 py-3 text-[11px] font-bold leading-tight text-slate-600 shadow"
            >
              TIMER
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("▲")}
              className="rounded-lg bg-slate-100 py-3 text-base font-bold text-slate-600 shadow"
            >
              ▲
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("Extra Function")}
              className="flex flex-col items-center justify-center rounded-lg bg-slate-100 px-1 py-3 text-center text-[10px] font-bold leading-tight text-slate-600 shadow"
            >
              <span>EXTRA</span>
              <span>FUNCTION</span>
            </motion.button>
          </div>

          {/* Health / Down / Confirm-Cancel */}
          <div className="grid w-full grid-cols-3 gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("Health")}
              className="rounded-lg bg-slate-100 py-3 text-[11px] font-bold leading-tight text-slate-600 shadow"
            >
              HEALTH
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("▼")}
              className="rounded-lg bg-slate-100 py-3 text-base font-bold text-slate-600 shadow"
            >
              ▼
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onDecorative("Confirm")}
              className="flex flex-col items-center justify-center rounded-lg bg-slate-100 px-1 py-3 text-center text-[10px] font-bold leading-tight text-slate-600 shadow"
            >
              <span>CONFIRM</span>
              <span>/CANCEL</span>
            </motion.button>
          </div>
        </>
      )}

      {/* Lock / Light / Reset */}
      <div className={`grid w-full grid-cols-3 pt-1 ${compact ? "gap-1" : "gap-2"}`}>
        {[
          { label: "LOCK", onClick: () => onDecorative("Locked!"), active: false },
          { label: "LIGHT", onClick: onToggleLight, active: lcdGlow },
          { label: "RESET", onClick: () => onDecorative("Reset!"), active: false },
        ].map((btn) => (
          <motion.button
            key={btn.label}
            whileTap={{ scale: 0.85 }}
            onClick={btn.onClick}
            className="flex flex-col items-center gap-1.5 py-1"
          >
            <span
              className={`rounded-full border-2 ${compact ? "h-4 w-4" : "h-5 w-5"}`}
              style={{
                borderColor: "#94a3b8",
                background: btn.active ? "#facc15" : "transparent",
              }}
            />
            <span className={`font-bold text-slate-500 ${compact ? "text-[9px]" : "text-[10px]"}`}>{btn.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
