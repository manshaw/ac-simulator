import { motion, AnimatePresence } from "framer-motion";

export function LockIndicator({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          className="fixed top-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-2xl shadow-lg"
        >
          🔒
        </motion.div>
      )}
    </AnimatePresence>
  );
}
