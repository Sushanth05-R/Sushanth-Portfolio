"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Mail,
  Trophy,
  Smartphone,
  Check,
  Copy,
  Zap,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  badge?: {
    type: "playstore" | "award" | "contact" | "projects";
    label: string;
    url?: string;
  };
}

const PRESET_QUESTIONS = [
  {
    label: "📱 Mobile & Flutter Stack",
    query: "Tell me about your mobile development experience with Flutter and React Native.",
  },
  {
    label: "🏆 1st Place Dev Challenge",
    query: "How did you win 1st Place in the Development Challenge with Feel It Buy?",
  },
  {
    label: "🧠 Evolish AI Architecture",
    query: "What is the technical architecture behind Evolish on Google Play?",
  },
  {
    label: "💼 Hiring & Availability",
    query: "Are you available for full-time software engineering roles or internships?",
  },
  {
    label: "🛠️ Backend & Databases",
    query: "What databases and backend technologies do you specialize in?",
  },
  {
    label: "🎓 Education & Location",
    query: "What is your educational background and where are you currently based?",
  },
];

export function AskSushanthAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      sender: "ai",
      text: "Hello! I am Sushanth's interactive AI assistant. You can ask me anything about his production applications, technical stack (Flutter, React, Node.js, Supabase, PostgreSQL), hackathon victory, or hiring availability.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef(1);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateAIResponse = (userQuery: string): { text: string; badge?: Message["badge"] } => {
    const q = userQuery.toLowerCase();

    // 1. Mobile & Flutter / React Native
    if (q.includes("flutter") || q.includes("react native") || q.includes("mobile") || q.includes("app") || q.includes("dart")) {
      return {
        text: "Sushanth is deeply experienced in cross-platform mobile engineering. He published 'Evolish' to Google Play using React Native (Expo) with native audio recording, Razorpay, and offline sync. He also architected 'Feel It Buy' using Flutter and Dart, building dual synchronized apps (Consumer + Delivery Partner) that won 1st Place in a major Development Challenge.",
        badge: {
          type: "playstore",
          label: "View Evolish on Google Play",
          url: "https://play.google.com/store/apps/details?id=com.evolish.app",
        },
      };
    }

    // 2. 1st Place Award / Feel It Buy
    if (q.includes("1st place") || q.includes("challenge") || q.includes("award") || q.includes("feel it buy") || q.includes("winner") || q.includes("hackathon")) {
      return {
        text: "Sushanth won 1st Place in the Development Challenge with 'Feel It Buy'—a comprehensive tri-app on-demand logistics ecosystem. He unified a Flutter Consumer app, a Flutter Delivery Partner app, and a React Admin web portal with Supabase Realtime WebSocket channels and PostgreSQL Row-Level Security, achieving sub-second multi-device order dispatch.",
        badge: {
          type: "award",
          label: "1st Place Winner — Feel It Buy",
        },
      };
    }

    // 3. Evolish & AI / RAG
    if (q.includes("evolish") || q.includes("rag") || q.includes("speech") || q.includes("ielts") || q.includes("ai architecture")) {
      return {
        text: "Evolish is an AI-powered English exam prep app for IELTS/TOEFL live on Google Play. Built with React Native (Expo), Node.js, Express, and MongoDB Atlas, it integrates real-time speech evaluation, an innovative 'Talk to Book' textbook RAG engine for contextual retrieval, and secure Razorpay subscription payments with offline SQLite/async storage caching.",
        badge: {
          type: "playstore",
          label: "Evolish on Google Play",
          url: "https://play.google.com/store/apps/details?id=com.evolish.app",
        },
      };
    }

    // 4. Hiring & Availability / Roles
    if (q.includes("hire") || q.includes("available") || q.includes("full-time") || q.includes("intern") || q.includes("job") || q.includes("opportunity") || q.includes("role") || q.includes("salary") || q.includes("remote")) {
      return {
        text: "Sushanth is actively seeking Full-Stack and Mobile Developer roles (open to full-time opportunities, high-impact internships, and remote/hybrid setups). He brings strong full-stack MERN expertise, enterprise experience from Evolvetech Bengaluru, and proven production application delivery.",
        badge: {
          type: "contact",
          label: "Email sushanthrpoojari@gmail.com",
        },
      };
    }

    // 5. Backend & Databases
    if (q.includes("backend") || q.includes("database") || q.includes("db") || q.includes("supabase") || q.includes("postgres") || q.includes("mongodb") || q.includes("node") || q.includes("express") || q.includes("api") || q.includes("sql")) {
      return {
        text: "On the backend, Sushanth engineers scalable REST APIs with Node.js and Express.js, employing clean modular architecture and token authentication. For data storage, he works fluently with Supabase and PostgreSQL (relational schema design, Row-Level Security, Realtime channels) as well as MongoDB Atlas for document-based aggregation pipelines.",
        badge: {
          type: "projects",
          label: "Jump to Projects Showcase",
          url: "#projects",
        },
      };
    }

    // 6. ElevateHire
    if (q.includes("elevate") || q.includes("elevatehire") || q.includes("placement") || q.includes("interview")) {
      return {
        text: "ElevateHire is an AI-integrated placement training and candidate networking web app built with React, Node.js, Express, and Supabase. It features an AI mock interview evaluator assessing response depth and clarity, aptitude preparation modules, and peer preparation forums.",
        badge: {
          type: "projects",
          label: "Visit Live ElevateHire Web App",
          url: "https://elevate-hire-app.vercel.app",
        },
      };
    }

    // 7. Education & Location
    if (q.includes("education") || q.includes("mca") || q.includes("bca") || q.includes("college") || q.includes("udupi") || q.includes("location") || q.includes("where")) {
      return {
        text: "Sushanth is currently pursuing his Master of Computer Applications (MCA, 2024–2026) at Poornaprajna Institute of Management in Udupi, Karnataka, India. Prior to this, he completed his BCA (2021–2024) and earned an Advanced Diploma in AI, Big Data Analytics, and Cyber Security.",
      };
    }

    // 8. Contact & Socials
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin") || q.includes("github") || q.includes("number")) {
      return {
        text: "You can reach Sushanth directly via email at sushanthrpoojari@gmail.com or by phone at +91 8105304229. You can also view his open source code on GitHub (github.com/Sushanth05-R) or connect on LinkedIn (linkedin.com/in/sushanth-r-8b9329325).",
        badge: {
          type: "contact",
          label: "Email Sushanth Now",
        },
      };
    }

    // 9. Languages & Certifications
    if (q.includes("python") || q.includes("php") || q.includes("certif") || q.includes("nptel") || q.includes("infosys")) {
      return {
        text: "Sushanth is NPTEL-certified in 'The Joy of Computing using Python' and Infosys Springboard-certified in 'PHP Web Development'. His programming language competencies span Python, JavaScript (ES6+), Dart, and PHP.",
      };
    }

    // Default Fallback
    return {
      text: `Sushanth is a Full-Stack & Mobile Developer based in Udupi, Karnataka (MCA 2024–2026). He specializes in React Native, Flutter, React, Node.js, Supabase, and PostgreSQL. Feel free to contact him directly at ${PERSONAL_INFO.email} or ask another question!`,
      badge: {
        type: "contact",
        label: "Send Email Directly",
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const raw = (textToSend !== undefined ? textToSend : inputVal).trim();
    if (!raw || isTyping) return;

    sounds.playClick();
    counterRef.current += 1;
    const userMsg: Message = {
      id: `user-${counterRef.current}`,
      sender: "user",
      text: raw,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulated streaming response delay
    setTimeout(() => {
      const { text, badge } = generateAIResponse(raw);
      sounds.playChirp(640, 0.08);

      counterRef.current += 1;
      const aiMsg: Message = {
        id: `ai-${counterRef.current}`,
        sender: "ai",
        text,
        badge,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    sounds.playClick();
    setMessages([
      {
        id: "intro-reset",
        sender: "ai",
        text: "Chat cleared! Pick a prompt below or type any question about Sushanth's development experience, mobile apps, or hiring availability.",
      },
    ]);
  };

  return (
    <div className="w-full rounded-3xl border border-emerald-500/30 bg-[#070b14]/90 backdrop-blur-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#070b14]">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Ask Sushanth&apos;s AI Assistant
              </h3>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-semibold">
                Online // v2.6
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Ask about full-stack projects, Flutter mobile apps, awards &amp; availability
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Quick Question Chips */}
      <div className="mb-4 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Recommended Prompts (Click to Ask):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              disabled={isTyping}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white transition-all text-left disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div
        className="h-64 sm:h-72 overflow-y-auto overscroll-contain pr-2 space-y-3 relative z-10 rounded-2xl bg-black/40 border border-white/5 p-4"
        data-lenis-prevent="true"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-black font-semibold rounded-br-xs shadow-md shadow-emerald-500/20"
                    : "bg-[#0f1422] text-slate-200 border border-white/10 rounded-bl-xs shadow-md"
                }`}
              >
                {msg.text}

                {/* Optional interactive badge attachment */}
                {msg.badge && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
                    {msg.badge.type === "playstore" && msg.badge.url && (
                      <a
                        href={msg.badge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-xs font-mono text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>{msg.badge.label}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}

                    {msg.badge.type === "award" && (
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-xs font-mono text-amber-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{msg.badge.label}</span>
                      </div>
                    )}

                    {msg.badge.type === "contact" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-xs font-mono text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied Email</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Email Address</span>
                            </>
                          )}
                        </button>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white underline"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Open Mail App</span>
                        </a>
                      </div>
                    )}

                    {msg.badge.type === "projects" && msg.badge.url && (
                      <a
                        href={msg.badge.url}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-1 text-xs font-mono text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{msg.badge.label}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pl-1">
            <span className="flex gap-1 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce [animation-delay:0.4s]" />
            </span>
            <span className="ml-1 text-emerald-400">Synthesizing response...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-4 flex items-center gap-2 relative z-10"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask a question about Sushanth's skills, Flutter, apps, or availability..."
          className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
