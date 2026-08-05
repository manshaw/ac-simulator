import { motion } from "framer-motion";
import { BackButton } from "../components/BackButton";
import { REMOTE_THEMES } from "../data/remoteThemes";
import { useSound } from "../hooks/useSound";
import type { RemoteTheme } from "../types";

function ThemeGrid({
  themes,
  offset,
  onPick,
}: {
  themes: RemoteTheme[];
  offset: number;
  onPick: (id: string) => void;
}) {
  const { click } = useSound();
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      {themes.map((theme, i) => (
        <motion.button
          key={theme.id}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: (offset + i) * 0.06, type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            click();
            onPick(theme.id);
          }}
          className="flex flex-col items-center gap-3 rounded-3xl bg-white/70 p-5 shadow-lg backdrop-blur dark:bg-slate-800/70"
        >
          <div
            className="flex h-28 w-16 items-center justify-center rounded-2xl text-3xl shadow-inner"
            style={{ background: theme.body, border: `3px solid ${theme.bodyDark}` }}
          >
            {theme.brand ? (
              <span className="text-[9px] font-extrabold tracking-tight" style={{ color: theme.bodyDark }}>
                {theme.brand}
              </span>
            ) : (
              theme.emoji
            )}
          </div>
          <span className="text-center text-base font-bold text-slate-700 sm:text-lg dark:text-slate-100">
            {theme.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export function RemoteSelectScreen({
  onPick,
  onBack,
}: {
  onPick: (themeId: string) => void;
  onBack: () => void;
}) {
  const fun = REMOTE_THEMES.filter((t) => t.layout === "cartoon" || !t.layout);
  const real = REMOTE_THEMES.filter((t) => t.layout === "realistic" || t.layout === "haier");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-violet-200 via-fuchsia-100 to-orange-100 px-6 py-16 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950">
      <BackButton onClick={onBack} />
      <h1 className="mb-8 text-center text-3xl font-extrabold text-slate-700 sm:text-5xl dark:text-slate-100">
        Pick your favorite remote! 🎨
      </h1>

      <h2 className="mb-4 text-center text-xl font-bold text-slate-600 dark:text-slate-300">Fun Designs</h2>
      <ThemeGrid themes={fun} offset={0} onPick={onPick} />

      <h2 className="mt-10 mb-4 text-center text-xl font-bold text-slate-600 dark:text-slate-300">Real Remote Styles</h2>
      <ThemeGrid themes={real} offset={fun.length} onPick={onPick} />
    </div>
  );
}
