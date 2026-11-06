"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  MapPin,
  Sparkles,
  Trophy,
  Smartphone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { HeroCanvas } from "./HeroCanvas";
import { TerminalCard } from "@/components/ui/TerminalCard";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { QuantumReactorCore } from "@/components/ui/QuantumReactorCore";

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const nameLetters = "Sushanth R".split("");

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* 60fps Particle Canvas & Gradient Mesh */}
      <HeroCanvas />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Split Grid: Narrative on Left, 3D Quantum Reactor Core on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full mb-8">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400 mb-5 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </motion.div>

            {/* Kinetic Name Reveal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3 flex justify-center lg:justify-start items-center flex-wrap gap-x-1 sm:gap-x-2">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 60, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    char === "R"
                      ? "text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                      : "text-slate-100"
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle / Role with Cyber Text Decryptor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-2xl font-semibold tracking-tight text-gradient-accent mb-3"
            >
              <DecryptedText text={PERSONAL_INFO.role} speed={25} />
            </motion.div>

            {/* Location & Academic Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-400 font-mono mb-5"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PERSONAL_INFO.location}</span>
              <span className="text-slate-600">&bull;</span>
              <span>MCA (2024&ndash;2026)</span>
            </motion.div>

            {/* Pitch Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-xl text-sm sm:text-base text-slate-300 dark:text-slate-300 leading-relaxed font-normal mb-7"
            >
              MCA student passionate about full-stack development and scalable apps. Experienced with{" "}
              <span className="text-emerald-400 font-medium">Flutter</span>,{" "}
              <span className="text-emerald-400 font-medium">React</span>,{" "}
              <span className="text-emerald-400 font-medium">Supabase</span> and{" "}
              <span className="text-emerald-400 font-medium">PostgreSQL</span> &mdash; focused on clean architecture, secure backends, and user-centered design.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </button>

              {/* Social Links Quick Access */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Hypnotic Quantum Reactor Core */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <QuantumReactorCore />
          </div>
        </div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8"
        >
          <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-3 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Award</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">1st Place Dev Winner</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-3 text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Smartphone className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Mobile</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">Live on Google Play</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-3 text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Architecture</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">Tri-App &amp; MERN</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-3 text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Location</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">Udupi, Karnataka</p>
          </div>
        </motion.div>

        {/* Live Interactive CLI Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="w-full flex justify-center"
        >
          <TerminalCard />
        </motion.div>
      </div>
    </section>
  );
}
