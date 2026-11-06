"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export function TerminalCard() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `const developer = {
  name: "Sushanth R",
  role: "Full-Stack & Mobile Developer",
  location: "Udupi, Karnataka, India",
  education: "MCA (2024–2026)",
  flagships: ["Evolish (Google Play)", "Feel It Buy (1st Place)", "ElevateHire"],
  coreStack: ["React Native", "Flutter", "React", "Node.js", "Supabase", "PostgreSQL"],
  status: "Ready to engineer scalable systems"
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#070b14]/90 backdrop-blur-xl shadow-2xl overflow-hidden text-left mt-8">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 ml-2">
            <Terminal className="w-3 h-3 text-emerald-400" />
            sushanth@udupi:~
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
          title="Copy config"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Code Body */}
      <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
        <p className="text-slate-500">{"// Technical Manifest v2026.1"}</p>
        <p>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-emerald-400">developer</span> = &#123;
        </p>
        <p className="pl-4">
          <span className="text-slate-400">name:</span>{" "}
          <span className="text-amber-300">&quot;Sushanth R&quot;</span>,
        </p>
        <p className="pl-4">
          <span className="text-slate-400">role:</span>{" "}
          <span className="text-amber-300">&quot;Full-Stack &amp; Mobile Developer&quot;</span>,
        </p>
        <p className="pl-4">
          <span className="text-slate-400">location:</span>{" "}
          <span className="text-amber-300">&quot;Udupi, Karnataka, India&quot;</span>,
        </p>
        <p className="pl-4">
          <span className="text-slate-400">education:</span>{" "}
          <span className="text-amber-300">&quot;MCA (2024–2026)&quot;</span>,
        </p>
        <p className="pl-4">
          <span className="text-slate-400">flagships:</span> [
          <span className="text-cyan-300">&quot;Evolish (Google Play)&quot;</span>,{" "}
          <span className="text-amber-300">&quot;Feel It Buy (1st Place)&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;ElevateHire&quot;</span>
          ],
        </p>
        <p className="pl-4">
          <span className="text-slate-400">coreStack:</span> [
          <span className="text-emerald-300">&quot;React Native&quot;</span>,{" "}
          <span className="text-cyan-300">&quot;Flutter&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
          <span className="text-purple-300">&quot;Node.js&quot;</span>,{" "}
          <span className="text-cyan-300">&quot;Supabase&quot;</span>,{" "}
          <span className="text-blue-300">&quot;PostgreSQL&quot;</span>
          ],
        </p>
        <p className="pl-4">
          <span className="text-slate-400">status:</span>{" "}
          <span className="text-emerald-400">&quot;Ready to engineer scalable systems&quot;</span>
        </p>
        <p>&#125;;</p>
        <p className="mt-2 text-slate-500 flex items-center gap-1.5">
          <span className="text-emerald-400">&gt;</span>
          <span>npm run innovate --with-zero-jank</span>
          <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse inline-block ml-0.5" />
        </p>
      </div>
    </div>
  );
}
