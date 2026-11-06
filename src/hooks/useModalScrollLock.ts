"use client";

import { useEffect } from "react";

export function useModalScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // 1. Pause Lenis smooth scrolling engine
    const win = window as unknown as {
      __lenis?: { stop: () => void; start: () => void };
    };
    win.__lenis?.stop();

    // 2. Lock page scroll on body and document element
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      // Resume Lenis smooth scroll
      win.__lenis?.start();

      // Restore original scroll state
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isLocked]);
}

