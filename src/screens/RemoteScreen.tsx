import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "../components/BackButton";
import { HaierRemote } from "../components/HaierRemote";
import { PowerIcon } from "../components/PowerIcon";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../hooks/useSound";
import type { ACMode, FanSpeed, RemoteTheme } from "../types";

const MODES: { id: ACMode; emoji: string; label: string }[] = [
  { id: "cool", emoji: "❄️", label: "Cool" },
  { id: "heat", emoji: "🔥", label: "Heat" },
  { id: "fan", emoji: "🌬️", label: "Fan" },
  { id: "dry", emoji: "💧", label: "Dry" },
  { id: "auto", emoji: "✨", label: "Auto" },
];

const SPEEDS: FanSpeed[] = ["low", "med", "high"];

function Decoration({ theme }: { theme: RemoteTheme }) {
  if (theme.decoration === "ears") {
    return (
      <>
        <div className="absolute -top-6 left-6 h-14 w-14 rounded-full bg-slate-900" />
        <div className="absolute -top-6 right-6 h-14 w-14 rounded-full bg-slate-900" />
      </>
    );
  }
  if (theme.decoration === "stars") {
    const stars = ["✨", "⭐", "🌟", "✨", "⭐"];
    return (
      <>
        {stars.map((s, i) => (
          <span
            key={i}
            className="pointer-events-none absolute text-xl opacity-80"
            style={{
              top: `${8 + i * 16}%`,
              left: i % 2 === 0 ? "8%" : "82%",
            }}
          >
            {s}
          </span>
        ))}
      </>
    );
  }
  if (theme.decoration === "waves") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden opacity-40">
        <svg viewBox="0 0 200 20" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V20 H0 Z" fill="#fff" />
        </svg>
      </div>
    );
  }
  if (theme.decoration === "dots") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#fff 15%, transparent 16%)",
          backgroundSize: "18px 18px",
        }}
      />
    );
  }
  return null;
}

export function RemoteScreen({ theme, onBack }: { theme: RemoteTheme; onBack: () => void }) {
  const [power, setPower] = useState(false);
  const [mode, setMode] = useState<ACMode>("cool");
  const [temp, setTemp] = useState(24);
  const [speed, setSpeed] = useState<FanSpeed>("med");
  const [swing, setSwing] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [timer, setTimer] = useState(false);
  const [lcdGlow, setLcdGlow] = useState(false);
  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const { click, chime } = useSound();
  const { isDark } = useTheme();

  const bump = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash((cur) => (cur === msg ? null : cur)), 700);
  };

  const togglePower = () => {
    click();
    chime(!power);
    setPower((p) => !p);
    bump(!power ? "Power On" : "Power Off");
  };

  const changeTemp = (delta: number) => {
    if (!power) return;
    click();
    setTemp((t) => Math.min(30, Math.max(16, t + delta)));
  };

  const cycleMode = () => {
    if (!power) return;
    click();
    const idx = MODES.findIndex((m) => m.id === mode);
    setMode(MODES[(idx + 1) % MODES.length].id);
  };

  const cycleSpeed = () => {
    if (!power) return;
    click();
    const idx = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const toggleSwing = () => {
    if (!power) return;
    click();
    setSwing((s) => !s);
  };

  const toggleTurbo = () => {
    if (!power) return;
    click();
    setTurbo((t) => !t);
  };

  const toggleTimer = () => {
    if (!power) return;
    click();
    setTimer((t) => !t);
  };

  const setModeDirect = (m: ACMode) => {
    if (!power) return;
    click();
    setMode(m);
  };

  const quiet = () => {
    if (!power) return;
    click();
    setSpeed("low");
    bump("Quiet Mode");
  };

  const toggleLight = () => {
    click();
    setLcdGlow((l) => !l);
  };

  const toggleLock = () => {
    click();
    setLocked((l) => !l);
    bump(!locked ? "Locked!" : "Unlocked!");
  };

  const decorative = (label: string) => {
    click();
    bump(label);
  };

  const currentMode = MODES.find((m) => m.id === mode)!;
  const isRealistic = theme.layout === "realistic";

  if (theme.layout === "haier") {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center px-4 py-10"
        style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, ${isDark ? "#0f172a" : "#ffffff"})` }}
      >
        <BackButton onClick={onBack} />
        <HaierRemote
          power={power}
          mode={mode}
          temp={temp}
          speed={speed}
          swing={swing}
          lcdGlow={lcdGlow}
          flash={flash}
          locked={locked}
          onTogglePower={togglePower}
          onSetMode={setModeDirect}
          onCycleSpeed={cycleSpeed}
          onToggleSwing={toggleSwing}
          onChangeTemp={changeTemp}
          onQuiet={quiet}
          onToggleLight={toggleLight}
          onToggleLock={toggleLock}
          onDecorative={decorative}
        />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 py-10"
      style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, #ffffff)` }}
    >
      <BackButton onClick={onBack} />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className={`relative flex w-full flex-col items-center gap-5 p-6 shadow-2xl ${theme.rounded} ${
          isRealistic ? "max-w-[280px] py-8" : "max-w-sm"
        }`}
        style={{ background: theme.body, border: `4px solid ${theme.bodyDark}` }}
      >
        <Decoration theme={theme} />

        {isRealistic && theme.brand && (
          <div
            className="relative z-10 -mt-2 text-sm font-extrabold tracking-widest"
            style={{ color: theme.bodyDark }}
          >
            {theme.brand}
          </div>
        )}

        {/* LCD Screen */}
        <div
          className={`relative z-10 w-full rounded-2xl p-4 shadow-inner ${isRealistic ? "font-mono" : ""}`}
          style={{ background: theme.screenBg, color: theme.screenText }}
        >
          <div className="flex items-center justify-between text-sm font-bold opacity-70">
            <span>{power ? "ON" : "OFF"}</span>
            <span>{isRealistic ? (turbo ? "TURBO" : timer ? "TIMER" : "") : theme.name}</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="text-4xl">{power ? currentMode.emoji : "💤"}</span>
            <span className="text-5xl font-extrabold tabular-nums">
              {power ? temp : "--"}
              <span className="text-2xl">°</span>
            </span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-4 text-sm font-semibold opacity-80">
            <span>Fan: {power ? speed.toUpperCase() : "-"}</span>
            <span>Swing: {power && swing ? "ON" : "OFF"}</span>
          </div>
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-center text-xs font-bold"
              >
                {flash}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Power button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={togglePower}
          className={`relative z-10 flex items-center justify-center rounded-full text-white shadow-md ${
            isRealistic ? "h-12 w-12" : "h-16 w-16"
          }`}
          style={{ background: power ? "#ef4444" : "#94a3b8" }}
          aria-label="Power"
        >
          <PowerIcon className={isRealistic ? "h-6 w-6" : "h-8 w-8"} />
        </motion.button>

        {/* Temp controls */}
        <div className="relative z-10 flex w-full items-center justify-center gap-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => changeTemp(-1)}
            className={`flex items-center justify-center rounded-full font-extrabold text-white shadow-md ${
              isRealistic ? "h-11 w-11 text-xl" : "h-16 w-16 text-3xl"
            }`}
            style={{ background: theme.accent }}
          >
            −
          </motion.button>
          <span className="text-lg font-bold" style={{ color: theme.bodyDark }}>
            Temp
          </span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => changeTemp(1)}
            className={`flex items-center justify-center rounded-full font-extrabold text-white shadow-md ${
              isRealistic ? "h-11 w-11 text-xl" : "h-16 w-16 text-3xl"
            }`}
            style={{ background: theme.accent }}
          >
            +
          </motion.button>
        </div>

        {/* Mode / Fan / Swing */}
        <div className="relative z-10 grid w-full grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={cycleMode}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/70 py-3 text-sm font-bold shadow"
          >
            <span className="text-2xl">{currentMode.emoji}</span>
            Mode
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={cycleSpeed}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/70 py-3 text-sm font-bold shadow"
          >
            <span className="text-2xl">💨</span>
            Fan
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleSwing}
            className="flex flex-col items-center gap-1 rounded-2xl py-3 text-sm font-bold shadow"
            style={{ background: swing ? theme.accent : "rgba(255,255,255,0.7)", color: swing ? "#fff" : "#000" }}
          >
            <span className="text-2xl">↕️</span>
            Swing
          </motion.button>
        </div>

        {/* Turbo / Timer - realistic remotes only */}
        {isRealistic && (
          <div className="relative z-10 grid w-full grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTurbo}
              className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-bold shadow"
              style={{ background: turbo ? theme.accent : "rgba(255,255,255,0.7)", color: turbo ? "#fff" : "#000" }}
            >
              <span className="text-xl">⚡</span>
              Turbo
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTimer}
              className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-bold shadow"
              style={{ background: timer ? theme.accent : "rgba(255,255,255,0.7)", color: timer ? "#fff" : "#000" }}
            >
              <span className="text-xl">⏱️</span>
              Timer
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
