"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";
import { sounds } from "@/utils/soundEffects";
import {
  X,
  Mic,
  Bot,
  Sparkles,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface AISpeechDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PROMPTS = [
  {
    topic: "Speaking Part 2 (Hometown & Growth)",
    prompt: "Describe your hometown in Karnataka and how it has developed in recent years.",
    transcript:
      "Udupi is a coastal town in Karnataka celebrated for its educational institutions and vibrant temple architecture. Over the last decade, it has expanded rapidly with modern tech infrastructure while diligently preserving its coastal ecosystem.",
    scores: {
      overall: "8.5",
      fluency: "8.5",
      lexical: "9.0",
      grammar: "8.5",
      pronunciation: "8.5",
    },
    ragQuery: "What is the key grammatical complexity demonstrated?",
    ragAnswer:
      "The response effectively pairs non-restrictive relative clauses ('celebrated for its...') with participial adverbial structures ('while diligently preserving...'), satisfying Band 8+ grammatical range criteria.",
  },
  {
    topic: "Speaking Part 3 (Clean Software Architecture)",
    prompt: "Explain how Clean Architecture improves long-term software maintainability.",
    transcript:
      "Clean Architecture enforces strict separation of concerns through concentric layers and the Dependency Inversion Principle. By keeping business rules independent of databases and UI frameworks, systems remain resilient to technological churn.",
    scores: {
      overall: "9.0",
      fluency: "9.0",
      lexical: "9.0",
      grammar: "9.0",
      pronunciation: "9.0",
    },
    ragQuery: "How does 'Talk to Book' retrieve relevant textbook chapters?",
    ragAnswer:
      "The engine tokenizes the query, computes dense vector embeddings, performs cosine similarity search across textbook chunks, and injects the retrieved context into the LLM prompt.",
  },
];

export function AISpeechDemoModal({ isOpen, onClose }: AISpeechDemoModalProps) {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [activeTab, setActiveTab] = useState<"speech" | "rag">("speech");

  useModalScrollLock(isOpen);

  const current = SAMPLE_PROMPTS[selectedPromptIdx];

  const handleSimulateSpeech = () => {
    setIsProcessing(true);
    setIsEvaluated(false);
    sounds.playChirp(520, 0.1);

    setTimeout(() => {
      setIsProcessing(false);
      setIsEvaluated(true);
      sounds.playSuccess();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl border border-emerald-500/30 bg-[#070b14] text-slate-200 shadow-2xl p-6 sm:p-8 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Evolish AI Engine Simulator</span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                      Live Test
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Real-time speech evaluation &amp; RAG literature assistant
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close interactive demo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt Selector Pills */}
            <div className="mt-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Choose Practice Topic:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAMPLE_PROMPTS.map((p, idx) => (
                  <button
                    key={p.topic}
                    onClick={() => {
                      setSelectedPromptIdx(idx);
                      setIsEvaluated(false);
                      sounds.playHover();
                    }}
                    className={`text-left rounded-xl p-3 border text-xs transition-colors ${
                      selectedPromptIdx === idx
                        ? "border-emerald-500/40 bg-emerald-500/10 text-white font-medium"
                        : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <p className="font-semibold text-white">{p.topic}</p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {p.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="mt-6 flex border-b border-white/10">
              <button
                onClick={() => {
                  setActiveTab("speech");
                  sounds.playHover();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors ${
                  activeTab === "speech"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Speech &amp; Essay Evaluator</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("rag");
                  sounds.playHover();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors ${
                  activeTab === "rag"
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>&quot;Talk to Book&quot; RAG Assistant</span>
              </button>
            </div>

            {/* Tab 1: Speech Simulation */}
            {activeTab === "speech" && (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      Candidate Voice Response:
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Audio Stream (16kHz PCM)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &quot;{current.transcript}&quot;
                  </p>
                </div>

                {/* Trigger Button & Animation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <button
                    onClick={handleSimulateSpeech}
                    disabled={isProcessing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Neural Model...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run AI Evaluation Benchmark</span>
                      </>
                    )}
                  </button>

                  {/* Waveform indicator */}
                  <div className="flex items-center gap-1 h-6">
                    <span
                      className={`w-1 rounded-full ${
                        isProcessing
                          ? "bg-emerald-400 animate-wave-1"
                          : "bg-white/20 h-2"
                      }`}
                    />
                    <span
                      className={`w-1 rounded-full ${
                        isProcessing
                          ? "bg-cyan-400 animate-wave-2"
                          : "bg-white/20 h-4"
                      }`}
                    />
                    <span
                      className={`w-1 rounded-full ${
                        isProcessing
                          ? "bg-emerald-400 animate-wave-3"
                          : "bg-white/20 h-5"
                      }`}
                    />
                    <span
                      className={`w-1 rounded-full ${
                        isProcessing
                          ? "bg-teal-400 animate-wave-4"
                          : "bg-white/20 h-3"
                      }`}
                    />
                    <span
                      className={`w-1 rounded-full ${
                        isProcessing
                          ? "bg-emerald-400 animate-wave-5"
                          : "bg-white/20 h-2"
                      }`}
                    />
                  </div>
                </div>

                {/* Score Breakdown Radar */}
                {isEvaluated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-white">
                          Evaluation Metrics Complete
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="text-slate-400">Overall Score:</span>
                        <span className="text-emerald-400 font-bold text-sm bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                          Band {current.scores.overall} / 9.0
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="rounded-xl bg-white/[0.03] p-2.5 text-center border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Fluency &amp; Coherence
                        </span>
                        <span className="text-xs font-bold text-emerald-400 mt-1 block">
                          Band {current.scores.fluency}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] p-2.5 text-center border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Lexical Resource
                        </span>
                        <span className="text-xs font-bold text-cyan-400 mt-1 block">
                          Band {current.scores.lexical}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] p-2.5 text-center border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Grammar Accuracy
                        </span>
                        <span className="text-xs font-bold text-purple-400 mt-1 block">
                          Band {current.scores.grammar}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] p-2.5 text-center border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Pronunciation
                        </span>
                        <span className="text-xs font-bold text-teal-400 mt-1 block">
                          Band {current.scores.pronunciation}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Tab 2: RAG Assistant */}
            {activeTab === "rag" && (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-4">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 block mb-1">
                    Sample Query to Literature:
                  </span>
                  <p className="text-xs text-white font-medium">
                    &quot;{current.ragQuery}&quot;
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Vector Retrieved Response:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {current.ragAnswer}
                  </p>
                </div>
              </div>
            )}

            {/* Footer with Google Play Link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-center sm:text-left">
                Experience the full app live on Android devices:
              </span>
              <a
                href="https://play.google.com/store/apps/details?id=com.evolish.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-1.5 font-medium text-emerald-400 hover:bg-white/15 hover:text-white transition-colors"
              >
                <span>Google Play Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
