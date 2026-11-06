"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("sushanth_intro_seen");
    }
    return true;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 90);

    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("sushanth_intro_seen", "true");
      } catch {
        // Ignore session storage errors
      }
    }, 1250);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070d] text-white"
        >
          {/* Subtle background glow */}
          <div className="absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Monogram / Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MCA DEVELOPER</span>
            </motion.div>

            {/* Kinetic Name Reveal */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl sm:text-6xl font-bold tracking-tight text-white"
              >
                Sushanth <span className="text-emerald-400">R</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-xs sm:text-sm text-slate-400 font-mono tracking-wider uppercase mb-6"
            >
              Full-Stack &amp; Mobile Developer
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
            <span className="mt-2 text-[10px] font-mono text-slate-500">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
