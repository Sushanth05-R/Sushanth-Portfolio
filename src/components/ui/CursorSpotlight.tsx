"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !isTouch && !prefersReduced;
}

function getServerSnapshot(): boolean {
  return false;
}

export function CursorSpotlight() {
  const isEnabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-20 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen transition-opacity duration-500"
      style={{
        x: smoothX,
        y: smoothY,
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)",
      }}
    />
  );
}
