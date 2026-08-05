import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";
import type { Screen } from "../types";

const OPTIONS: {
  screen: Screen;
  label: string;
  emoji: string;
  from: string;
  to: string;
}[] = [
  { screen: "remote-select", label: "Remote", emoji: "📺", from: "from-pink-400", to: "to-fuchsia-500" },
  { screen: "fan", label: "Fan", emoji: "🌀", from: "from-sky-400", to: "to-cyan-500" },
  { screen: "ac", label: "Air Conditioner", emoji: "❄️", from: "from-emerald-400", to: "to-teal-500" },
];

export function HomeScreen({ onSelect }: { onSelect: (s: Screen) => void }) {
  const { click } = useSound();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-yellow-200 via-orange-100 to-pink-200 px-6 py-12 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="text-center text-4xl font-extrabold text-slate-700 drop-shadow-sm sm:text-6xl dark:text-slate-100"
      >
        What do you want to play with? 🎈
      </motion.h1>

      <div className="flex w-full max-w-4xl flex-col items-stretch justify-center gap-6 sm:flex-row">
        {OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.screen}
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15 * i, type: "spring", bounce: 0.55 }}
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              click();
              onSelect(opt.screen);
            }}
            className={`flex flex-1 flex-col items-center gap-4 rounded-[2.5rem] bg-gradient-to-br ${opt.from} ${opt.to} p-8 text-white shadow-[0_10px_0_rgba(0,0,0,0.15)] active:shadow-[0_2px_0_rgba(0,0,0,0.15)] active:translate-y-2`}
          >
            <span className="text-8xl drop-shadow-md">{opt.emoji}</span>
            <span className="text-3xl font-extrabold tracking-wide">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
