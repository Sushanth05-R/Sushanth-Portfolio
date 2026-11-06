"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { Navbar } from "@/components/ui/Navbar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { TelemetryHUD } from "@/components/ui/TelemetryHUD";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { ResumeModal } from "@/components/ui/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#05070d] text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
          {/* Subtle noise / ambient background grid */}
          <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

          {/* Dynamic Cursor Spotlight Effect */}
          <CursorSpotlight />

          {/* 1.2s Cinematic Intro Loader */}
          <IntroLoader />

          {/* Custom Magnetic Cursor */}
          <CustomCursor />

          {/* Sticky Navigation Bar */}
          <Navbar
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenCommand={() => setIsCommandOpen(true)}
          />

          {/* Main Sections */}
          <main className="relative z-10 flex flex-col">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <TechMarquee />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <Education />
            <Contact />
          </main>

          {/* Cinematic Footer */}
          <Footer />

          {/* Interactive Resume Modal / Viewer */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />

          {/* Quick Command HUD Palette (Cmd + K / Ctrl + K) */}
          <CommandMenu
            isOpen={isCommandOpen}
            onClose={() => setIsCommandOpen(false)}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Futuristic Cyber Telemetry HUD & Warp Controller */}
          <TelemetryHUD />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
