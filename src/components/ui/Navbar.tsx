"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";
import { sounds } from "@/utils/soundEffects";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Sparkles,
  Search,
  Volume2,
  VolumeX,
} from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommand: () => void;
}

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navbar({ onOpenResume, onOpenCommand }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(sounds.enabled);
  const { theme, setTheme } = useTheme();

  useModalScrollLock(mobileMenuOpen);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenCommand();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenCommand]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sounds.playHover();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      setMobileMenuOpen(false);
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleAudio = () => {
    const next = sounds.toggle();
    setAudioEnabled(next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 ${
          isScrolled ? "py-3 px-4" : "py-5 px-6"
        }`}
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between w-full max-w-5xl rounded-full border transition-all duration-300 ${
            isScrolled
              ? "border-white/10 bg-[#070a13]/85 backdrop-blur-xl shadow-lg shadow-black/30 px-4 py-2"
              : "border-transparent bg-transparent px-2 py-1"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2.5 group"
            aria-label="Sushanth R Portfolio Home"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#07090e] transition-colors group-hover:bg-transparent">
                <span className="text-xs font-black tracking-tight text-white group-hover:text-black">
                  SR
                </span>
              </div>
            </div>
            <span className="hidden sm:inline font-bold tracking-tight text-sm text-slate-100 group-hover:text-emerald-400 transition-colors">
              Sushanth R
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-colors rounded-full ${
                    isActive
                      ? "text-emerald-400 font-semibold"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/30 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Command HUD Button (Cmd+K) */}
            <button
              onClick={() => {
                sounds.playHover();
                onOpenCommand();
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-mono text-slate-300 hover:border-emerald-500/30 hover:text-white transition-colors"
              title="Command Palette (Cmd + K / Ctrl + K)"
            >
              <Search className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">⌘K</span>
            </button>

            {/* Synthesized Audio FX Toggle with Live Equalizer */}
            <button
              onClick={handleToggleAudio}
              className={`relative flex items-center gap-1.5 h-8 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors ${
                audioEnabled ? "px-2.5" : "w-8 justify-center"
              }`}
              title={audioEnabled ? "Mute Sound Effects" : "Enable Cybernetic Audio"}
              aria-label="Toggle sound effects"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-wave-1" />
                    <span className="w-[2px] bg-cyan-400 rounded-full animate-wave-2" />
                    <span className="w-[2px] bg-emerald-300 rounded-full animate-wave-3" />
                  </span>
                </>
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-slate-500" />
              )}
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => {
                  sounds.playClick();
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-cyan-500" />
                )}
              </button>
            )}

            {/* Resume Action */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-200"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-white/10 bg-[#0b0f19]/95 backdrop-blur-2xl p-5 shadow-2xl md:hidden text-slate-200"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                  </a>
                );
              })}

              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Open Command Palette (⌘K)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View &amp; Download Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
