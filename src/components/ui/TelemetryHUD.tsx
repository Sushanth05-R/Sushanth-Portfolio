"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  Radio,
  Zap,
  ChevronDown,
  ChevronUp,
  Compass,
  Sliders,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";
import confetti from "canvas-confetti";

export function TelemetryHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(14);
  const [isWarping, setIsWarping] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);

  // FPS counter
  useEffect(() => {
    lastTimeRef.current = performance.now();
    let animId: number;
    const calcFps = () => {
      frameCountRef.current++;
      const now = performance.now();
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.min(60, frameCountRef.current));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        // Subtle latency jitter
        setLatency(Math.floor(Math.random() * 5) + 11);
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerWarpDrive = () => {
    if (isWarping) return;
    setIsWarping(true);
    sounds.playChirp(880, 0.2);

    // Cosmic multi-angle confetti burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#10b981", "#06b6d4", "#a855f7", "#ffffff"],
    });

    setTimeout(() => {
      sounds.playSuccess();
      setIsWarping(false);
    }, 1400);
  };

  const toggleScanlines = () => {
    sounds.playClick();
    setScanlinesActive(!scanlinesActive);
  };

  return (
    <>
      {/* Optional CRT Scanlines Layer */}
      {scanlinesActive && (
        <div
          className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 mix-blend-overlay"
          aria-hidden="true"
        />
      )}

      {/* Warp Speed Hyperspace Flash Overlay */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-emerald-500/10 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="rounded-2xl border border-emerald-400 bg-black/90 px-6 py-4 text-center font-mono shadow-[0_0_50px_rgba(16,185,129,0.5)]"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold tracking-widest uppercase">
                <Zap className="w-4 h-4 animate-bounce" />
                <span>[ HYPERDRIVE ENGAGED: 60FPS FLUIDITY ]</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero-jank GPU thread active &bull; Lenis inertial physics maxed
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating HUD Capsule (Bottom-Right) */}
      <div className="fixed bottom-4 right-4 z-40 font-mono text-[11px]">
        <motion.div
          layout
          className="rounded-2xl border border-emerald-500/30 bg-[#070b14]/90 backdrop-blur-2xl shadow-2xl text-slate-200 overflow-hidden"
        >
          {/* HUD Header Bar */}
          <div
            onClick={() => {
              sounds.playClick();
              setIsOpen(!isOpen);
            }}
            className="flex items-center justify-between gap-3 px-3.5 py-2 cursor-pointer hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                SYS.HUD // v2.6
              </span>
              <span className="text-slate-400 text-[10px] hidden sm:inline">
                {fps} FPS &bull; {latency}ms
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>
          </div>

          {/* Expanded Telemetry Matrix */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-3.5 pb-3.5 pt-1 space-y-2.5 border-t border-white/5 w-72 sm:w-80"
              >
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5">
                    <span className="text-slate-400 block flex items-center gap-1">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      Frame Rate
                    </span>
                    <span className="text-emerald-400 font-bold text-xs">
                      {fps} FPS (Rock-Solid)
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5">
                    <span className="text-slate-400 block flex items-center gap-1">
                      <Radio className="w-3 h-3 text-cyan-400" />
                      Ping / Latency
                    </span>
                    <span className="text-cyan-400 font-bold text-xs">
                      {latency} ms
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5">
                    <span className="text-slate-400 block flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-400" />
                      Geographic Base
                    </span>
                    <span className="text-amber-300 font-semibold text-[10px]">
                      13.34°N, 74.74°E (Udupi)
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5">
                    <span className="text-slate-400 block flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-purple-400" />
                      Core Engine
                    </span>
                    <span className="text-purple-300 font-semibold text-[10px]">
                      Next.js 16 + Lenis
                    </span>
                  </div>
                </div>

                {/* Cyber Action Controls */}
                <div className="pt-1 flex flex-col gap-1.5">
                  <button
                    onClick={triggerWarpDrive}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-1.5 text-[11px] font-bold text-black hover:opacity-90 transition-opacity shadow-md shadow-emerald-500/20"
                  >
                    <Zap className="w-3.5 h-3.5 fill-black" />
                    <span>Engage Warp Speed Pulse</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleScanlines}
                      className={`flex-1 flex items-center justify-center gap-1 rounded-lg border py-1 text-[10px] transition-colors ${
                        scanlinesActive
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Sliders className="w-3 h-3" />
                      <span>CRT Scanlines: {scanlinesActive ? "ON" : "OFF"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
