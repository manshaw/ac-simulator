import type { ACMode, FanSpeed } from "../types";

export const MODE_EMOJI: Record<ACMode, string> = {
  cool: "❄️",
  heat: "🔥",
  fan: "🌬️",
  dry: "💧",
  auto: "✨",
  ice: "🧊",
};

export const SPEEDS: FanSpeed[] = ["low", "med", "high"];
