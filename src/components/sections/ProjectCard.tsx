"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Trophy,
  ArrowRight,
  Sparkles,
  Bot,
  Mic,
  Star,
  Radio,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
  onOpenAIDemo?: () => void;
}

export function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
  onOpenAIDemo,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1200 }}
      className="w-full flex"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0b0f1a]/90 backdrop-blur-2xl p-6 sm:p-8 hover:border-emerald-500/40 transition-colors duration-300 shadow-xl"
      >
        {/* Glow ambient highlight */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div>
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                0{index + 1} &bull; {project.category}
              </span>
            </div>
            {project.badge && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-medium ${
                  project.badge.includes("1st Place")
                    ? "border border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {project.badge.includes("1st Place") ? (
                  <Trophy className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{project.badge}</span>
              </span>
            )}
          </div>

          {/* Title & Pitch */}
          <div className="mb-5">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-cyan-400 mt-1">
              {project.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* High-Fidelity Interactive Visual Simulation */}
          {/* =========================================================================
              PLACEHOLDER SCREENSHOT:
              To replace this mockup with your real screenshots, replace this container with:
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
                <Image src="/projects/your-screenshot.png" alt={project.title} fill className="object-cover" />
              </div>
              ========================================================================= */}
          <div className="relative w-full rounded-2xl border border-white/10 bg-[#070b14] p-4 sm:p-5 mb-5 overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.id === "evolish"
                  ? "AI Speech Analysis & RAG"
                  : project.id === "elevate-hire"
                  ? "AI Placement Simulator"
                  : "Tri-App Logistics Mesh"}
              </span>
              <span className="text-slate-500">Architecture Blueprint</span>
            </div>

            {/* Evolish Mobile Visualizer */}
            {project.id === "evolish" && (
              <div className="py-3 space-y-3">
                {/* Voice assessment waveform simulation */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>Speaking Assessment (IELTS)</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Band 8.5
                    </span>
                  </div>

                  {/* Animated Waveform Bars */}
                  <div className="flex items-center justify-center gap-1 h-7 py-1">
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-1" />
                    <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-3" />
                    <span className="w-1 bg-teal-400 rounded-full animate-wave-4" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-5" />
                    <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-3" />
                    <span className="w-1 bg-teal-400 rounded-full animate-wave-2" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-4" />
                    <span className="w-1 bg-cyan-400 rounded-full animate-wave-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Play Store</span>
                    <span className="text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      4.9 / 5
                    </span>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Payments</span>
                    <span className="text-emerald-400">Razorpay Live</span>
                  </div>
                </div>

                {onOpenAIDemo && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAIDemo();
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-[11px] font-mono text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch Interactive Speech &amp; RAG Simulator</span>
                  </button>
                )}
              </div>
            )}

            {/* ElevateHire Web Visualizer */}
            {project.id === "elevate-hire" && (
              <div className="py-3 space-y-3">
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      <span>AI Mock Interviewer</span>
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                      94% Readiness
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 italic mb-2 line-clamp-1">
                    &quot;Explain the trade-offs of PostgreSQL vs MongoDB in high-write scenarios.&quot;
                  </p>

                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 w-[94%] rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Aptitude</span>
                    <span className="text-cyan-400">AI Modules</span>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Network</span>
                    <span className="text-purple-400">Peer Forums</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feel It Buy Tri-App Visualizer */}
            {project.id === "feel-it-buy" && (
              <div className="py-3 space-y-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>1st Place Winning Ecosystem</span>
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Supabase Realtime
                    </span>
                  </div>

                  {/* 3 Devices Synced */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono pt-1">
                    <div className="rounded-lg bg-white/[0.04] p-1.5 border border-white/5">
                      <span className="text-slate-400 block">📱 Shopper</span>
                      <span className="text-emerald-400 font-semibold">Flutter</span>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-1.5 border border-white/5">
                      <span className="text-slate-400 block">💻 Admin</span>
                      <span className="text-cyan-400 font-semibold">React</span>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-1.5 border border-white/5">
                      <span className="text-slate-400 block">🛵 Delivery</span>
                      <span className="text-amber-300 font-semibold">Flutter</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    Sub-10ms WebSocket Sync
                  </span>
                  <span>PostgreSQL + RLS</span>
                </div>
              </div>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="inline-flex items-center rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1 text-[11px] font-mono text-slate-500">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/btn"
          >
            <span>Case Study &amp; Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>

          <div className="flex items-center gap-2">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on Google Play`}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Play Store</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Live App</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
