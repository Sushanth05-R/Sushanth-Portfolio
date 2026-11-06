"use client";

import { motion } from "framer-motion";

const TECH_ITEMS = [
  "FLUTTER",
  "REACT",
  "REACT NATIVE (EXPO)",
  "NEXT.JS 16",
  "SUPABASE REALTIME",
  "POSTGRESQL",
  "NODE.JS & EXPRESS",
  "MONGODB ATLAS",
  "PYTHON",
  "AI RAG PIPELINES",
  "CLEAN ARCHITECTURE",
  "DART",
  "PHP",
  "TAILWIND CSS",
  "REST APIS",
  "GOOGLE PLAY CONSOLE",
  "VERCEL",
];

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#070b14]/60 py-4 backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#05070d] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#05070d] to-transparent" />

      <motion.div
        className="flex w-max items-center gap-8 text-xs font-mono tracking-widest text-slate-400"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, index) => (
          <div key={index} className="flex items-center gap-8 whitespace-nowrap">
            <span className="hover:text-emerald-400 transition-colors cursor-default">
              {item}
            </span>
            <span className="text-emerald-400/50">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

