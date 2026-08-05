import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackButton } from "../components/BackButton";
import { PowerIcon } from "../components/PowerIcon";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../hooks/useSound";
import type { FanSpeed, FanTheme } from "../types";

const SPEED_DURATION: Record<FanSpeed, number> = {
  low: 2.2,
  med: 1.1,
  high: 0.5,
};

const SPEED_HUM: Record<FanSpeed, number> = {
  low: 70,
  med: 100,
  high: 140,
};

const BLADE_ANGLES = [0, 120, 240];

const CAGE = 224;
const POLE_HEIGHT = 70;
const MOTOR_H = 34;
const BASE_H = 26;

export function FanScreen({ theme, onBack }: { theme: FanTheme; onBack: () => void }) {
  const [power, setPower] = useState(false);
  const [speed, setSpeed] = useState<FanSpeed>("low");
  const [oscillate, setOscillate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [light, setLight] = useState(false);
  const { click, whoosh, startHum, stopHum } = useSound();
  const { isDark } = useTheme();
  const idleBg = isDark ? "rgba(30,41,59,0.85)" : "rgba(255,255,255,0.8)";
  const idleText = isDark ? "#e2e8f0" : "#334155";

  useEffect(() => {
    if (power) startHum(SPEED_HUM[speed]);
    else stopHum();
    return () => stopHum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [power, speed]);

  const togglePower = () => {
    click();
    setPower((p) => !p);
  };

  const cycleSpeed = () => {
    if (!power) return;
    click();
    whoosh();
    setSpeed((s) => (s === "low" ? "med" : s === "med" ? "high" : "low"));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-b from-sky-200 via-sky-100 to-cyan-50 px-4 py-10 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
      <BackButton onClick={onBack} />

      <h1 className="text-2xl font-extrabold text-slate-700 sm:text-4xl dark:text-slate-100">My Table Fan {theme.emoji}</h1>

      {/* Fan visual */}
      <div
        className="relative flex flex-1 items-end justify-center"
        style={{ width: 340, height: CAGE + POLE_HEIGHT + BASE_H + 30 }}
      >
        {/* Pole (static) */}
        <div
          className="absolute left-1/2 w-5 -translate-x-1/2 rounded"
          style={{ bottom: BASE_H, height: POLE_HEIGHT, background: theme.pole }}
        />

        {/* Oscillating head assembly, pivots at pole top */}
        <div
          className="absolute left-1/2"
          style={{
            bottom: BASE_H + POLE_HEIGHT - 6,
            width: CAGE,
            height: CAGE + MOTOR_H,
            transformOrigin: "50% 100%",
            marginLeft: -CAGE / 2,
            animation: power && oscillate ? "oscillate-head 3.2s ease-in-out infinite" : "none",
          }}
        >
          {/* motor housing */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md"
            style={{ height: MOTOR_H, width: MOTOR_H * 1.3, background: theme.hub }}
          />

          {/* cage back ring */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full border-8 shadow-inner"
            style={{
              bottom: MOTOR_H - 10,
              height: CAGE,
              width: CAGE,
              borderColor: theme.cage,
              background: "rgba(255,255,255,0.25)",
            }}
          />

          {/* spinning blades */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              bottom: MOTOR_H - 10,
              height: CAGE,
              width: CAGE,
              animation: power
                ? `spin-blades ${SPEED_DURATION[speed]}s linear infinite ${reverse ? "reverse" : "normal"}`
                : "none",
            }}
          >
            {BLADE_ANGLES.map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 rounded-full shadow"
                style={{
                  height: CAGE * 0.42,
                  width: CAGE * 0.22,
                  background: `linear-gradient(180deg, ${theme.blade}, ${theme.bladeDark})`,
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                  transformOrigin: "50% 100%",
                }}
              />
            ))}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ height: CAGE * 0.16, width: CAGE * 0.16, background: theme.hub }}
            />
          </div>

          {/* cage front grille */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full border-4"
            style={{
              bottom: MOTOR_H - 10,
              height: CAGE,
              width: CAGE,
              borderColor: `${theme.cage}cc`,
              backgroundImage: `repeating-conic-gradient(rgba(100,116,139,0.35) 0deg 4deg, transparent 4deg 18deg)`,
            }}
          />
        </div>

        {/* Base */}
        <div
          className="absolute bottom-0 flex h-6 w-36 items-center justify-center rounded-full shadow-md"
          style={{ background: theme.base }}
        >
          <motion.div
            animate={light ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.25 }}
            transition={light ? { duration: 1.2, repeat: Infinity } : {}}
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: theme.glow,
              boxShadow: light ? `0 0 12px 4px ${theme.glow}` : "none",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex w-full max-w-md flex-col items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePower}
          aria-label="Power"
          className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
          style={{ background: power ? "#22c55e" : "#94a3b8" }}
        >
          <PowerIcon className="h-9 w-9" />
        </motion.button>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={cycleSpeed}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 py-4 text-sm font-bold text-slate-700 shadow dark:bg-slate-800/80 dark:text-slate-100"
          >
            <span className="text-2xl">💨</span>
            Speed: {speed.toUpperCase()}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (!power) return;
              click();
              setOscillate((o) => !o);
            }}
            className="flex flex-col items-center gap-1 rounded-2xl py-4 text-sm font-bold shadow"
            style={{ background: oscillate ? "#0ea5e9" : idleBg, color: oscillate ? "#fff" : idleText }}
          >
            <span className="text-2xl">↔️</span>
            Rotate
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (!power) return;
              click();
              setReverse((r) => !r);
            }}
            className="flex flex-col items-center gap-1 rounded-2xl py-4 text-sm font-bold shadow"
            style={{ background: reverse ? "#f97316" : idleBg, color: reverse ? "#fff" : idleText }}
          >
            <span className="text-2xl">{reverse ? "↺" : "↻"}</span>
            Direction
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              click();
              setLight((l) => !l);
            }}
            className="flex flex-col items-center gap-1 rounded-2xl py-4 text-sm font-bold shadow"
            style={{ background: light ? "#facc15" : idleBg, color: light ? "#78350f" : idleText }}
          >
            <span className="text-2xl">💡</span>
            Night Light
          </motion.button>
        </div>
      </div>
    </div>
  );
}
