"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";
import { useTheme } from "@/components/providers/ThemeProvider";
import { sounds } from "@/utils/soundEffects";
import confetti from "canvas-confetti";
import {
  Search,
  X,
  FileText,
  Smartphone,
  ExternalLink,
  Mail,
  Phone,
  Copy,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ArrowRight,
  Code2,
  Briefcase,
  GraduationCap,
  Layers,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface ActionItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "External Links" | "Preferences";
  icon: React.ElementType;
  shortcut?: string;
  perform: () => void;
}

export function CommandMenu({
  isOpen,
  onClose,
  onOpenResume,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);
  const { theme, toggleTheme } = useTheme();

  useModalScrollLock(isOpen);

  const actions: ActionItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-hero",
        title: "Go to Home / Hero",
        category: "Navigation",
        icon: Sparkles,
        perform: () => {
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-about",
        title: "Go to About Me",
        category: "Navigation",
        icon: Layers,
        perform: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-projects",
        title: "Go to Projects",
        category: "Navigation",
        icon: Smartphone,
        perform: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-experience",
        title: "Go to Experience (Evolvetech)",
        category: "Navigation",
        icon: Briefcase,
        perform: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-skills",
        title: "Go to Technical Skills",
        category: "Navigation",
        icon: Code2,
        perform: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-education",
        title: "Go to Education (MCA)",
        category: "Navigation",
        icon: GraduationCap,
        perform: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-contact",
        title: "Go to Contact & Inquiries",
        category: "Navigation",
        icon: Mail,
        perform: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },

      // Actions
      {
        id: "action-resume",
        title: "View & Download Resume",
        category: "Actions",
        icon: FileText,
        shortcut: "R",
        perform: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: "action-confetti",
        title: "Celebrate (Trigger Confetti)",
        category: "Actions",
        icon: Sparkles,
        perform: () => {
          sounds.playSuccess();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          onClose();
        },
      },
      {
        id: "action-copy-email",
        title: `Copy Email (${PERSONAL_INFO.email})`,
        category: "Actions",
        icon: Copy,
        perform: () => {
          navigator.clipboard.writeText(PERSONAL_INFO.email);
          sounds.playSuccess();
          onClose();
        },
      },
      {
        id: "action-copy-phone",
        title: `Copy Phone (${PERSONAL_INFO.phone})`,
        category: "Actions",
        icon: Phone,
        perform: () => {
          navigator.clipboard.writeText(PERSONAL_INFO.phone);
          sounds.playSuccess();
          onClose();
        },
      },

      // External Links
      {
        id: "link-evolish",
        title: "Open Evolish on Google Play",
        category: "External Links",
        icon: ExternalLink,
        perform: () => {
          window.open(
            "https://play.google.com/store/apps/details?id=com.evolish.app",
            "_blank"
          );
          onClose();
        },
      },
      {
        id: "link-elevatehire",
        title: "Open ElevateHire Live App",
        category: "External Links",
        icon: ExternalLink,
        perform: () => {
          window.open("https://elevate-hire-app.vercel.app", "_blank");
          onClose();
        },
      },
      {
        id: "link-github",
        title: "Open GitHub Profile",
        category: "External Links",
        icon: GithubIcon,
        perform: () => {
          window.open(PERSONAL_INFO.github, "_blank");
          onClose();
        },
      },
      {
        id: "link-linkedin",
        title: "Open LinkedIn Profile",
        category: "External Links",
        icon: LinkedinIcon,
        perform: () => {
          window.open(PERSONAL_INFO.linkedin, "_blank");
          onClose();
        },
      },

      // Preferences
      {
        id: "pref-theme",
        title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        category: "Preferences",
        icon: theme === "dark" ? Sun : Moon,
        perform: () => {
          toggleTheme();
          sounds.playClick();
          onClose();
        },
      },
      {
        id: "pref-sound",
        title: `Toggle Synthesized Audio FX (${soundEnabled ? "Enabled" : "Muted"})`,
        category: "Preferences",
        icon: soundEnabled ? Volume2 : VolumeX,
        perform: () => {
          const next = sounds.toggle();
          setSoundEnabled(next);
        },
      },
    ],
    [onClose, onOpenResume, theme, toggleTheme, soundEnabled]
  );

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [actions, query]);

  // Keyboard navigation & global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sounds.playHover();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sounds.playHover();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredActions.length) % filteredActions.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl max-h-[75vh] overflow-hidden overscroll-contain rounded-2xl border border-white/10 bg-[#070b14]/95 text-slate-200 shadow-2xl flex flex-col z-10 backdrop-blur-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, jump to section, or search..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const Icon = action.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => action.perform()}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        sounds.playHover();
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-colors ${
                        isSelected
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                            isSelected
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium">{action.title}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>{action.category}</span>
                        {action.shortcut && (
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-slate-300">
                            {action.shortcut}
                          </span>
                        )}
                        <ArrowRight
                          className={`w-3 h-3 ${
                            isSelected ? "opacity-100 text-emerald-400" : "opacity-0"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Palette Footer Help Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 text-[10px] font-mono text-slate-500 bg-black/40">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-emerald-400">Quick Navigation HUD</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
