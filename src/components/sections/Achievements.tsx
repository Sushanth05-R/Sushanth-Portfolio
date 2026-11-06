"use client";

import { motion } from "framer-motion";
import { Trophy, Award, CheckCircle } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/portfolioData";

export function Achievements() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>05 // HONORS &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Awards, hackathons &amp; <br className="hidden sm:inline" />
            <span className="text-gradient-accent">verified accreditations.</span>
          </h2>
        </div>

        {/* Bento Grid for Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {ACHIEVEMENTS.map((item, index) => {
            const isWinner = item.tag === "Award";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl border p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 ${
                  isWinner
                    ? "border-amber-500/40 bg-gradient-to-b from-[#17120a] to-[#0b0f19] shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:border-amber-400"
                    : "border-white/10 bg-[#0b0f19]/80 hover:border-emerald-500/30"
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isWinner
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {isWinner ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        isWinner
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-300 font-semibold"
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs font-mono mb-3 ${
                      isWinner ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {item.organization}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Note */}
                {item.credentialNote && (
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.credentialNote}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
