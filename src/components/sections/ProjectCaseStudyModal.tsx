"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";
import {
  X,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  useModalScrollLock(!!project);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-[#0a0e1a] text-slate-200 shadow-2xl p-6 sm:p-10 z-10"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                {project.category}
              </span>
              {project.badge && (
                <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-slate-300">
                  {project.badge}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Title & Tagline */}
          <div className="mt-6 mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-emerald-400 font-medium">
              {project.subtitle}
            </p>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Role: {project.caseStudy.role}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Smartphone className="w-4 h-4" />
                <span>View on Google Play Store</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Web Application</span>
              </a>
            )}
          </div>

          {/* Visual Showcase / Screenshot Area */}
          {/* =========================================================================
              PLACEHOLDER SCREENSHOT AREA:
              You can replace the UI simulation below with an actual image:
              <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8">
                <Image src="/projects/evolish-preview.png" alt="Evolish UI" fill className="object-cover" />
              </div>
              ========================================================================= */}
          <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1628] to-[#070b14] p-6 mb-8 overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-mono text-slate-400 border border-white/5">
              <span>Interactive UI Architecture</span>
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                System Snapshot
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                {project.title} — Production Blueprint
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Quick Metrics */}
            {project.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/[0.03] p-3 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      {stat.label}
                    </span>
                    <span className="text-xs font-semibold text-white mt-1 block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deep Dive: Overview, Challenge & Solution */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Overview &amp; Objective
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.caseStudy.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                  Technical Challenge
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  Architectural Solution
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Architecture Details */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Engineering Architecture
              </h3>
              <ul className="space-y-2">
                {project.caseStudy.architecture.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 mb-3">
                Key Features Delivered
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.caseStudy.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-slate-400 mb-3 block">
                Technologies &amp; Libraries:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

