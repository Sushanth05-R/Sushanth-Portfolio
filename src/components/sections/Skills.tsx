"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Database,
  Terminal,
  Sparkles,
  Check,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export function Skills() {
  const categoryIcons = [Code2, Layout, Database, Terminal];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>04 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Specialized toolkit &amp; <br className="hidden sm:inline" />
            <span className="text-gradient-accent">architectural competencies.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {SKILL_CATEGORIES.map((category, catIndex) => {
            const Icon = categoryIcons[catIndex % categoryIcons.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="rounded-3xl border border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl p-6 sm:p-8 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Chip List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`flex items-center justify-between rounded-xl p-3 border transition-colors ${
                          skill.highlight
                            ? "border-emerald-500/25 bg-emerald-500/[0.04] text-slate-200"
                            : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-semibold">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 rounded-md bg-white/5 px-2 py-0.5">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer category badge */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{category.skills.length} core technologies</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Production-ready
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

