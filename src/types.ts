export type Screen = "home" | "remote-select" | "remote" | "fan-select" | "fan" | "ac";

export type ACMode = "cool" | "heat" | "fan" | "dry" | "auto" | "ice" | "clean";
export type FanSpeed = "low" | "med" | "high";

export interface RemoteTheme {
  id: string;
  name: string;
  emoji: string;
  body: string;
  bodyDark: string;
  screenBg: string;
  screenText: string;
  accent: string;
  accentSoft: string;
  rounded: string;
  decoration?: "none" | "stars" | "ears" | "waves" | "dots";
  layout?: "cartoon" | "realistic" | "haier";
  brand?: string;
}

export interface FanTheme {
  id: string;
  name: string;
  emoji: string;
  base: string;
  pole: string;
  hub: string;
  blade: string;
  bladeDark: string;
  cage: string;
  glow: string;
}
