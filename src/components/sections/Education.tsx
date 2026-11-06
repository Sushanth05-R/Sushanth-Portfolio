"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { EDUCATION } from "@/data/portfolioData";

export function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>06 // EDUCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Academic foundation &amp; <br className="hidden sm:inline" />
            <span className="text-gradient-accent">specialized coursework.</span>
          </h2>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl p-6 sm:p-8 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-emerald-400 font-medium text-xs sm:text-sm mt-0.5">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {edu.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300 self-start">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Highlights */}
              {edu.highlights && (
                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-slate-300">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
