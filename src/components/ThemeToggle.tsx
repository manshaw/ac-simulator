import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../hooks/useSound";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { click } = useSound();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        click();
        toggleTheme();
      }}
      className="fixed top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg backdrop-blur dark:bg-slate-800/90"
      aria-label="Toggle dark mode"
    >
      {isDark ? "🌙" : "☀️"}
    </motion.button>
  );
}
