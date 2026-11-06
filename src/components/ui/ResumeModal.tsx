"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Printer,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0f19] text-slate-200 shadow-2xl p-6 sm:p-8 z-10 print:max-h-none print:shadow-none print:border-none print:p-0 print:text-black print:bg-white"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 print:hidden">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Curriculum Vitae Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="mt-6 space-y-6 print:mt-0 print:space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="text-emerald-400 font-medium text-sm mt-1">
                    {PERSONAL_INFO.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {PERSONAL_INFO.location}
                  </p>
                </div>
                <div className="text-xs space-y-1.5 text-slate-300 font-mono">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="hover:text-emerald-400 underline underline-offset-2"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="hover:text-emerald-400"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 underline underline-offset-2"
                    >
                      LinkedIn Profile
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 underline underline-offset-2"
                    >
                      GitHub Profile
                    </a>
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Executive Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  MCA student passionate about full-stack development and scalable applications. Experienced with Flutter, React, Supabase, PostgreSQL, and Node.js. Dedicated to clean architecture, high-security backends, and user-centered intuitive interfaces.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Work Experience
                </h3>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm mb-1">
                    <span className="font-semibold text-white">
                      Full Stack Intern — Evolvetech
                    </span>
                    <span className="text-emerald-400 font-mono text-xs">
                      From 23 March 2026 • Bengaluru
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-2">
                    <li>Full-stack MERN (MongoDB, Express.js, React, Node.js) development and modern architectural implementation.</li>
                    <li>REST API integration, performance optimization, and rigorous testing across microservices.</li>
                    <li>Active participation in Agile sprints, collaborative code reviews, and comprehensive technical documentation.</li>
                  </ul>
                </div>
              </div>

              {/* Key Projects */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3">
                  Key Projects &amp; Products
                </h3>
                <div className="space-y-3">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>Evolish (Google Play Store)</span>
                      <span className="text-slate-400 font-mono text-[11px]">React Native Expo, Node.js, MongoDB</span>
                    </div>
                    <p className="text-slate-300 mt-1">
                      AI-powered English learning and exam prep app for IELTS/TOEFL. Real-time speech and essay evaluation, &quot;Talk to Book&quot; RAG assistant, Razorpay payments, and offline synchronization.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>Feel It Buy (1st Place Winner)</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Flutter, React, Supabase, Postgres</span>
                    </div>
                    <p className="text-slate-300 mt-1">
                      Tri-app e-commerce ecosystem consisting of Consumer mobile app, Admin web management portal, and Delivery partner dispatch app with real-time sync.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>ElevateHire (Live on Vercel)</span>
                      <span className="text-slate-400 font-mono text-[11px]">Next.js, React, AI Integration</span>
                    </div>
                    <p className="text-slate-300 mt-1">
                      AI-integrated networking and placement training platform providing intelligent mock interview feedback and placement aptitude tests.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Education
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-white">Master of Computer Applications (MCA)</p>
                      <p className="text-slate-400">Poornaprajna Institute of Management, Udupi</p>
                    </div>
                    <span className="font-mono text-slate-400">2024 — 2026</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <div>
                      <p className="font-semibold text-white">Bachelor of Computer Applications (BCA)</p>
                      <p className="text-slate-400">Karnataka, India</p>
                    </div>
                    <span className="font-mono text-slate-400">2021 — 2024</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <div>
                      <p className="font-semibold text-white">Advanced Diploma in AI, Big Data Analytics &amp; Cyber Security</p>
                      <p className="text-slate-400">Udupi Group of Institute, Manipal</p>
                    </div>
                    <span className="font-mono text-slate-400">Specialized</span>
                  </div>
                </div>
              </div>

              {/* Honors & Certifications */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Achievements &amp; Certifications
                </h3>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  <li><strong>1st Place Winner</strong> — Development Challenge (Feel It Buy Tri-App Ecosystem)</li>
                  <li><strong>NPTEL Certification</strong> — The Joy of Computing using Python</li>
                  <li><strong>Infosys Springboard</strong> — PHP Web Development Certification</li>
                </ul>
              </div>
            </div>

            {/* Footer / Download Button */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between print:hidden">
              <span className="text-xs text-slate-500">
                Updated for 2026 • Verified Credentials
              </span>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save / Download PDF</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

