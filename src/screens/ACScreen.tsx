import { useEffect, useState } from "react";
import { BackButton } from "../components/BackButton";
import { HaierRemote } from "../components/HaierRemote";
import { LockIndicator } from "../components/LockIndicator";
import { ACIndoorUnit } from "../components/ACIndoorUnit";
import { ACOutdoorUnit } from "../components/ACOutdoorUnit";
import { MODE_EMOJI, SPEEDS } from "../data/acModes";
import { AC_BRANDS } from "../data/acBrands";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../hooks/useSound";
import type { ACMode, FanSpeed } from "../types";

const SPEED_HUM: Record<FanSpeed, number> = { low: 55, med: 75, high: 100 };

const MODE_AIRFLOW: Record<ACMode, { bar: string; digital: string; particle?: string }> = {
  cool: { bar: "rgba(125,211,252,0.75)", digital: "#38bdf8" },
  heat: { bar: "rgba(251,146,60,0.75)", digital: "#fb923c" },
  fan: { bar: "rgba(203,213,225,0.75)", digital: "#e2e8f0" },
  dry: { bar: "rgba(94,234,212,0.75)", digital: "#2dd4bf" },
  auto: { bar: "rgba(199,210,254,0.75)", digital: "#a5b4fc" },
  ice: { bar: "rgba(165,243,252,0.9)", digital: "#67e8f9", particle: "❄️" },
  clean: { bar: "rgba(216,180,254,0.75)", digital: "#c084fc" },
};

export function ACScreen({ onBack }: { onBack: () => void }) {
  const [power, setPower] = useState(false);
  const [mode, setMode] = useState<ACMode>("cool");
  const [temp, setTemp] = useState(24);
  const [speed, setSpeed] = useState<FanSpeed>("med");
  const [swing, setSwing] = useState(false);
  const [lcdGlow, setLcdGlow] = useState(false);
  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [brandId, setBrandId] = useState(AC_BRANDS[0].id);
  const { click, chime, startHum, stopHum } = useSound();
  const { isDark } = useTheme();

  const bump = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash((cur) => (cur === msg ? null : cur)), 700);
  };

  useEffect(() => {
    if (power) startHum(SPEED_HUM[speed]);
    else stopHum();
    return () => stopHum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [power, speed]);

  const togglePower = () => {
    click();
    chime(!power);
    setPower((p) => !p);
  };

  const changeTemp = (delta: number) => {
    if (!power) return;
    click();
    setTemp((t) => Math.min(30, Math.max(16, t + delta)));
  };

  const setModeDirect = (m: ACMode) => {
    if (!power) return;
    click();
    setMode(m);
  };

  const cycleSpeed = () => {
    if (!power) return;
    click();
    setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length]);
  };

  const toggleSwing = () => {
    if (!power) return;
    click();
    setSwing((s) => !s);
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

  const airflow = MODE_AIRFLOW[mode];
  const brand = AC_BRANDS.find((b) => b.id === brandId) ?? AC_BRANDS[0];

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-teal-100 via-emerald-50 to-slate-100 px-4 py-8 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
      <BackButton onClick={onBack} />
      <LockIndicator show={locked} />
      <h1 className="mb-3 px-16 text-center text-xl font-extrabold text-slate-700 sm:text-4xl dark:text-slate-100">
        My Air Conditioner {MODE_EMOJI[mode]}
      </h1>

      {/* Brand picker */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {AC_BRANDS.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              click();
              setBrandId(b.id);
            }}
            className="rounded-full p-1 shadow transition-transform"
            style={{
              background: b.id === brandId ? (isDark ? "#1e293b" : "#fff") : isDark ? "rgba(30,41,59,0.5)" : "rgba(255,255,255,0.5)",
              outline: b.id === brandId ? "2px solid #0ea5e9" : "none",
              transform: b.id === brandId ? "scale(1.08)" : "scale(1)",
            }}
          >
            <div
              className="flex h-6 w-24 items-center justify-center rounded-full"
              style={{ background: `linear-gradient(180deg, ${b.from}, ${b.to})` }}
            >
              <span className="text-[10px] font-extrabold italic tracking-tight" style={{ color: b.text }}>
                {b.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Visual stage */}
      <div className="relative flex w-full max-w-md flex-col items-center justify-between">
        {/* Indoor unit */}
        <div className="relative z-10 mx-auto w-full max-w-sm">
          <ACIndoorUnit
            power={power}
            swing={swing}
            mode={mode}
            temp={temp}
            digitalColor={airflow.digital}
            brand={brand}
            hideDisplay={lcdGlow}
          />
          {/* airflow */}
          {power && (
            <div className="pointer-events-none absolute left-1/2 top-full h-28 w-40 -translate-x-1/2">
              <div
                className="relative h-full w-full"
                style={{ animation: swing ? "airflow-sweep 1.6s ease-in-out infinite" : "none" }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-0 h-3 w-28 -translate-x-1/2 rounded-full blur-[1px]"
                    style={{
                      background: airflow.bar,
                      animation: `airflow-rise 1.4s ease-in ${i * 0.45}s infinite`,
                    }}
                  />
                ))}
                {airflow.particle &&
                  [0, 1, 2, 3].map((i) => (
                    <span
                      key={`ice-${i}`}
                      className="absolute top-0 text-sm"
                      style={{
                        left: `${20 + i * 18}%`,
                        animation: `ice-particle-fall 1.6s ease-in ${i * 0.3}s infinite`,
                      }}
                    >
                      {airflow.particle}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Connecting wires / pipe */}
        <svg className="relative z-0 h-24 w-full max-w-sm" viewBox="0 0 300 100" preserveAspectRatio="none">
          <path
            d="M40 0 V30 Q40 50 60 50 H240 Q260 50 260 70 V100"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M40 0 V30 Q40 50 60 50 H240 Q260 50 260 70 V100"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
        </svg>

        {/* Outdoor unit - larger, realistic condenser */}
        <div className="w-full max-w-md">
          <ACOutdoorUnit power={power} brand={brand} />
        </div>
      </div>

      {/* On-screen AC remote (compact) */}
      <div className="mt-8 flex w-full justify-center px-2">
        <HaierRemote
          power={power}
          mode={mode}
          temp={temp}
          speed={speed}
          swing={swing}
          lcdGlow={lcdGlow}
          flash={flash}
          showIce
          compact
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
    </div>
  );
}
