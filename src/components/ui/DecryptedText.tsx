"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { sounds } from "@/utils/soundEffects";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  animateOnView?: boolean;
  triggerOnHover?: boolean;
}

const CHARS = "0101XYZ_#@&%ΩΨΔΛΞ≠≈0123456789";

export function DecryptedText({
  text,
  speed = 35,
  maxIterations = 10,
  className = "",
  animateOnView = true,
  triggerOnHover = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    sounds.playChirp(700, 0.04);

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iteration += 1 / (maxIterations / text.length);
    }, speed);
  }, [text, speed, maxIterations, isScrambling]);

  useEffect(() => {
    if (!animateOnView) return;

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startScramble();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateOnView, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-default font-mono tracking-tight transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
}

