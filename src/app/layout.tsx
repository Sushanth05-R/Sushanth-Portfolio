import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sushanth R — Full-Stack & Mobile Developer",
  description:
    "Personal portfolio of Sushanth R, Full-Stack & Mobile Developer (MCA, Udupi, Karnataka). Creator of Evolish (AI English Learning), ElevateHire, and Feel It Buy. Specializing in React, Flutter, Node.js, and Supabase.",
  keywords: [
    "Sushanth R",
    "Full-Stack Developer",
    "Mobile Developer",
    "React Native",
    "Flutter",
    "Node.js",
    "Supabase",
    "Evolish",
    "ElevateHire",
    "Udupi",
    "Portfolio",
  ],
  authors: [{ name: "Sushanth R", url: "https://github.com/Sushanth05-R" }],
  creator: "Sushanth R",
  metadataBase: new URL("https://sushanth-r.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sushanth-r.vercel.app",
    title: "Sushanth R — Full-Stack & Mobile Developer",
    description:
      "Crafting high-performance web & mobile experiences with React, Flutter, Node.js, and modern AI architectures.",
    siteName: "Sushanth R Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushanth R — Full-Stack & Mobile Developer",
    description:
      "Crafting high-performance web & mobile experiences with React, Flutter, Node.js, and modern AI architectures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#07090e] text-[#e6edf3] font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
