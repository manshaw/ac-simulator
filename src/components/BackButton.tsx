import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";

export function BackButton({ onClick }: { onClick: () => void }) {
  const { click } = useSound();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        click();
        onClick();
      }}
      className="fixed top-4 left-4 z-50 flex items-center gap-1 rounded-full bg-white/90 px-4 py-3 text-lg font-bold text-slate-700 shadow-lg backdrop-blur active:bg-white dark:bg-slate-800/90 dark:text-slate-100 dark:active:bg-slate-700"
      aria-label="Go back"
    >
      <span className="text-2xl leading-none">⬅️</span>
      <span className="hidden sm:inline">Back</span>
    </motion.button>
  );
}
