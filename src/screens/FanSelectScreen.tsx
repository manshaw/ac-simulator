import { motion } from "framer-motion";
import { BackButton } from "../components/BackButton";
import { FAN_THEMES } from "../data/fanThemes";
import { useSound } from "../hooks/useSound";

export function FanSelectScreen({
  onPick,
  onBack,
}: {
  onPick: (themeId: string) => void;
  onBack: () => void;
}) {
  const { click } = useSound();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-100 px-6 py-16 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
      <BackButton onClick={onBack} />
      <h1 className="mb-10 text-center text-3xl font-extrabold text-slate-700 sm:text-5xl dark:text-slate-100">
        Pick your favorite fan! 🌀
      </h1>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
        {FAN_THEMES.map((theme, i) => (
          <motion.button
            key={theme.id}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              click();
              onPick(theme.id);
            }}
            className="flex flex-col items-center gap-3 rounded-3xl bg-white/70 p-5 shadow-lg backdrop-blur dark:bg-slate-800/70"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-inner"
              style={{ background: theme.cage, border: `4px solid ${theme.base}` }}
            >
              {theme.emoji}
            </div>
            <span className="text-center text-base font-bold text-slate-700 sm:text-lg dark:text-slate-100">
              {theme.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
