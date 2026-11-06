"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Clock, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (Udupi, Karnataka)
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#05070d] text-slate-400 py-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Location Clock */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#05070d]">
              <span className="text-xs font-black text-white">SR</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              Sushanth R — Full-Stack &amp; Mobile Developer
            </p>
            <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Udupi, IN (IST): {localTime || "Loading..."}</span>
            </p>
          </div>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send Email"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-600 text-center gap-2">
        <span>© 2026 Sushanth R. Designed for 60fps fluidity.</span>
        <span>Next.js 16 • React 19 • Tailwind CSS • Lenis • Framer Motion</span>
      </div>
    </footer>
  );
}
