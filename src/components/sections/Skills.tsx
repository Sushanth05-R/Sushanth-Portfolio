"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layout,
  Database,
  Terminal,
  Sparkles,
  Check,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { sounds } from "@/utils/soundEffects";

interface SkillDeploymentMeta {
  projectTitle: string;
  role: string;
  anchor: string;
  badge?: string;
}

const SKILL_DEPLOYMENT_MAP: Record<string, SkillDeploymentMeta> = {
  "Python": {
    projectTitle: "NPTEL 'The Joy of Computing using Python' Certification",
    role: "Algorithmic logic, scripting, data manipulation & academic excellence",
    anchor: "#achievements",
    badge: "Certified",
  },
  "JavaScript (ES6+)": {
    projectTitle: "Evolish, ElevateHire, Feel It Buy & Evolvetech",
    role: "Full-stack asynchronous event architecture, React & Node.js services",
    anchor: "#projects",
    badge: "Core Stack",
  },
  "Dart": {
    projectTitle: "Feel It Buy (1st Place Development Challenge)",
    role: "Reactive mobile state management, streams & cross-platform Flutter engine",
    anchor: "#projects",
    badge: "1st Place Winner",
  },
  "PHP": {
    projectTitle: "Infosys Springboard PHP Web Development",
    role: "Enterprise web development patterns, server-side scripting & databases",
    anchor: "#achievements",
    badge: "Certified",
  },
  "React": {
    projectTitle: "Evolish, ElevateHire & Feel It Buy Admin Portal",
    role: "Component lifecycle, modern hooks, responsive glassmorphism & dashboard systems",
    anchor: "#projects",
    badge: "Production Web",
  },
  "React Native (Expo)": {
    projectTitle: "Evolish (Google Play Store Live App)",
    role: "Native audio recording, Razorpay SDK, offline cache & cross-platform mobile UI",
    anchor: "#projects",
    badge: "Google Play Store",
  },
  "Flutter": {
    projectTitle: "Feel It Buy (Shopper App & Delivery Partner App)",
    role: "Award-winning dual mobile client apps with sub-second order dispatch",
    anchor: "#projects",
    badge: "1st Place Winner",
  },
  "HTML5 & CSS3": {
    projectTitle: "All Web Deployments & Modern UI Design",
    role: "Semantic layouts, responsive flexbox/grid, CSS animations & accessibility standards",
    anchor: "#projects",
  },
  "Tailwind CSS": {
    projectTitle: "Portfolio & ElevateHire Modern UI",
    role: "Utility-first design tokens, dark mode design system & 60fps animations",
    anchor: "#hero",
    badge: "UI Design",
  },
  "Node.js": {
    projectTitle: "Evolish & Evolvetech (Bengaluru Internship)",
    role: "Scalable REST APIs, token authentication, async file streams & background tasks",
    anchor: "#experience",
    badge: "Enterprise API",
  },
  "Express.js": {
    projectTitle: "Evolish & Evolvetech Backend Services",
    role: "Middleware routing, rate limiting, request validation & microservices integration",
    anchor: "#experience",
  },
  "MongoDB / Atlas": {
    projectTitle: "Evolish & Evolvetech Intern Projects",
    role: "Schema design, aggregation pipelines, document indexing & high-throughput Atlas cluster",
    anchor: "#projects",
    badge: "Cloud DB",
  },
  "Supabase": {
    projectTitle: "Feel It Buy (1st Place Winner) & ElevateHire",
    role: "Realtime WebSocket channels, PostgreSQL Row-Level Security (RLS) & Auth engine",
    anchor: "#projects",
    badge: "Realtime Engine",
  },
  "PostgreSQL": {
    projectTitle: "Feel It Buy E-Commerce Database",
    role: "Relational schema integrity, foreign keys, transactional reliability & instant queries",
    anchor: "#projects",
  },
  "Git": {
    projectTitle: "Collaborative Git-Flow at Evolvetech & All Repos",
    role: "Branch protection, interactive rebasing, merge resolutions & version tagging",
    anchor: "#experience",
  },
  "GitHub": {
    projectTitle: "github.com/Sushanth05-R",
    role: "Open-source repositories, automated actions & continuous portfolio maintenance",
    anchor: "https://github.com/Sushanth05-R",
    badge: "Open Source",
  },
  "Vercel": {
    projectTitle: "ElevateHire & Personal Portfolio",
    role: "Edge serverless functions, automatic Git deployments & zero-downtime releases",
    anchor: "https://elevate-hire-app.vercel.app",
    badge: "Live Edge",
  },
  "Google Play Console": {
    projectTitle: "Evolish Mobile Production Release",
    role: "AAB bundle signing, store listing, privacy compliance & production release management",
    anchor: "https://play.google.com/store/apps/details?id=com.evolish.app",
    badge: "Production App",
  },
};

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string>("Flutter");
  const categoryIcons = [Code2, Layout, Database, Terminal];

  const deployment = SKILL_DEPLOYMENT_MAP[selectedSkill];

  const handleSelectSkill = (name: string) => {
    setSelectedSkill(name);
    sounds.playHover();
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>04 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Specialized toolkit &amp; <br className="hidden sm:inline" />
              <span className="text-gradient-accent">architectural competencies.</span>
            </h2>
          </div>

          <p className="text-xs font-mono text-slate-400 max-w-xs">
            <span className="text-emerald-400 font-semibold">&bull; Click any skill</span> to trace its real-world implementation across Sushanth&apos;s production apps and challenges.
          </p>
        </div>

        {/* Dynamic Skill Deployment Inspector Banner */}
        <AnimatePresence mode="wait">
          {deployment && (
            <motion.div
              key={selectedSkill}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mb-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent p-4 sm:p-5 backdrop-blur-xl shadow-lg shadow-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Applied In Production:
                    </span>
                    <span className="text-sm font-bold text-white">
                      {selectedSkill}
                    </span>
                    {deployment.badge && (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                        {deployment.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">{deployment.projectTitle}</strong> &mdash; {deployment.role}
                  </p>
                </div>
              </div>

              {deployment.anchor.startsWith("http") ? (
                <a
                  href={deployment.anchor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>Inspect Live Evidence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href={deployment.anchor}
                  onClick={() => sounds.playClick()}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>View in Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => handleSelectSkill(skill.name)}
                          className={`flex items-center justify-between rounded-xl p-3 border transition-all text-left ${
                            isSelected
                              ? "border-emerald-400 bg-emerald-500/20 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-400/50 scale-[1.02]"
                              : skill.highlight
                              ? "border-emerald-500/25 bg-emerald-500/[0.04] text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/[0.08]"
                              : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Check
                              className={`w-3.5 h-3.5 ${
                                isSelected ? "text-emerald-300" : "text-emerald-400"
                              }`}
                            />
                            <span className="text-xs font-semibold">
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-mono rounded-md px-2 py-0.5 ${
                              isSelected
                                ? "bg-emerald-400 text-black font-bold"
                                : "text-slate-400 bg-white/5"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </button>
                      );
                    })}
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
