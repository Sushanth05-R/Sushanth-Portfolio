"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  MapPin,
  GraduationCap,
} from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: Layers,
      title: "Clean Architecture",
      desc: "Modular separation of concerns, maintainable codebases, and robust design patterns across Flutter, React, and Node.js.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Backends",
      desc: "Row-Level Security (RLS) in Supabase, validated RESTful endpoints, and encrypted authentication workflows.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Mobile",
      desc: "Native-grade fluidity with React Native (Expo) and Flutter, featuring offline synchronization and hardware integrations.",
    },
    {
      icon: Cpu,
      title: "AI Integration",
      desc: "Implementing practical AI pipelines including RAG assistants ('Talk to Book'), speech recognition, and automated evaluation.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>01 // PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Driven by clean code, <br className="hidden sm:inline" />
            <span className="text-gradient-accent">built for scale &amp; performance.</span>
          </h2>
        </div>

        {/* Narrative & Highlights Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story &amp; Vision</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                I am an MCA student at Poornaprajna Institute of Management in Udupi, Karnataka, specializing in modern full-stack systems and cross-platform mobile engineering.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                My work spans hands-on production apps like <strong className="text-white">Evolish</strong> (live on the Google Play Store with AI speech evaluation and RAG assistance) and the 1st-place award-winning <strong className="text-white">Feel It Buy</strong> tri-app e-commerce ecosystem.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Whether synchronizing real-time databases with Supabase and PostgreSQL, structuring MERN backends with Express and MongoDB Atlas, or shipping responsive React Native and Flutter interfaces, I prioritize zero-jank fluidity, resilient security, and clean architecture above all.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Udupi, Karnataka
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                MCA Candidate (2024–2026)
              </span>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                1st
              </span>
              <div>
                <p className="text-xs font-semibold text-white mt-2">Place Winner</p>
                <p className="text-[11px] text-slate-400">Development Challenge</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">
                3+
              </span>
              <div>
                <p className="text-xs font-semibold text-white mt-2">Major Apps</p>
                <p className="text-[11px] text-slate-400">Mobile &amp; Web Platforms</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 tracking-tight">
                Play
              </span>
              <div>
                <p className="text-xs font-semibold text-white mt-2">Store App</p>
                <p className="text-[11px] text-slate-400">Evolish Published</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                100%
              </span>
              <div>
                <p className="text-xs font-semibold text-white mt-2">Clean Code</p>
                <p className="text-[11px] text-slate-400">Agile &amp; Scalable</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Engineering Pillars */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
