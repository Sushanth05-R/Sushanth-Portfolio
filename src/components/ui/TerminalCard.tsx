"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, CornerDownLeft, Sparkles, Zap } from "lucide-react";
import { sounds } from "@/utils/soundEffects";
import confetti from "canvas-confetti";

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalCard() {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "whoami",
      output: (
        <span className="text-emerald-400">
          Sushanth R &mdash; Full-Stack &amp; Mobile Developer (MCA, Udupi, Karnataka)
        </span>
      ),
    },
    {
      command: "status --production",
      output: (
        <span className="text-cyan-300">
          Ready to engineer scalable systems &bull; Evolish live on Google Play &bull; 1st Place Challenge Winner
        </span>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

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
    sounds.playClick();
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = (cmdText?: string) => {
    const raw = (cmdText !== undefined ? cmdText : inputVal).trim();
    if (!raw) return;

    sounds.playClick();
    const cmd = raw.toLowerCase();

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-amber-300">Available commands:</p>
            <p><span className="text-emerald-400 font-bold">whoami</span> - Developer profile &amp; summary</p>
            <p><span className="text-emerald-400 font-bold">projects</span> - View flagship applications</p>
            <p><span className="text-emerald-400 font-bold">skills</span> - Display core technical arsenal</p>
            <p><span className="text-emerald-400 font-bold">contact</span> - Reach out via email, phone, or links</p>
            <p><span className="text-emerald-400 font-bold">warp</span> - Engage 60fps hyperdrive acceleration</p>
            <p><span className="text-emerald-400 font-bold">clear</span> - Clear terminal screen</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <span className="text-emerald-400">
            Sushanth R &mdash; Full-Stack &amp; Mobile Developer (MCA, Poornaprajna Institute of Management, Udupi). Specializing in React Native, Flutter, React, Supabase &amp; Node.js.
          </span>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">Production Applications:</p>
            <p>&bull; <span className="text-emerald-400 font-semibold">Evolish</span> &mdash; AI English &amp; Exam Prep (Google Play Live App, Razorpay, Speech Eval)</p>
            <p>&bull; <span className="text-amber-300 font-semibold">Feel It Buy</span> &mdash; Tri-App E-Commerce &amp; Logistics (1st Place Winner, Flutter + Supabase)</p>
            <p>&bull; <span className="text-cyan-300 font-semibold">ElevateHire</span> &mdash; AI Placement &amp; Mock Interview Platform (Live Vercel Web App)</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">Engineering Stack:</p>
            <p><strong className="text-white">Mobile:</strong> Flutter, React Native (Expo)</p>
            <p><strong className="text-white">Frontend:</strong> React, HTML5, CSS3, Tailwind CSS</p>
            <p><strong className="text-white">Backend &amp; DB:</strong> Node.js, Express.js, Supabase, PostgreSQL, MongoDB</p>
            <p><strong className="text-white">Languages:</strong> Python (NPTEL Certified), JavaScript, Dart, PHP</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-300">
            <p><strong className="text-emerald-400">Email:</strong> sushanthrpoojari@gmail.com</p>
            <p><strong className="text-cyan-400">Phone:</strong> +91 8105304229</p>
            <p><strong className="text-amber-300">LinkedIn:</strong> linkedin.com/in/sushanth-r-8b9329325/</p>
            <p><strong className="text-purple-400">GitHub:</strong> github.com/Sushanth05-R</p>
          </div>
        );
        break;

      case "warp":
        sounds.playChirp(880, 0.2);
        confetti({
          particleCount: 70,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#10b981", "#06b6d4", "#a855f7"],
        });
        output = (
          <span className="text-purple-300 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            [ HYPERDRIVE ENGAGED: 60FPS AT MAXIMUM INERTIA ]
          </span>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <span className="text-red-400">
            Command not recognized: &quot;{raw}&quot;. Type <span className="text-emerald-400 font-bold">help</span> for a list of available commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInputVal("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const quickPills = ["help", "projects", "skills", "contact", "warp", "clear"];

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#070b14]/95 backdrop-blur-2xl shadow-2xl overflow-hidden text-left mt-8 font-mono">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>sushanth@quantum-cli:~</span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
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
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Execution Pills */}
      <div className="px-4 py-2 bg-white/[0.015] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <span className="text-slate-500 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-emerald-400" /> Quick CLI:
        </span>
        {quickPills.map((pill) => (
          <button
            key={pill}
            onClick={() => handleExecute(pill)}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors shrink-0"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 text-xs leading-relaxed max-h-64 overflow-y-auto overscroll-contain space-y-3" data-lenis-prevent="true">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-emerald-400">&gt;</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <div className="pl-3.5 text-slate-300">{item.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecute();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="text-emerald-400">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or click quick pills above..."
            className="w-full bg-transparent text-xs text-emerald-300 placeholder-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            className="text-slate-500 hover:text-emerald-400 transition-colors p-1"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
