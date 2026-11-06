# Sushanth R — Personal Portfolio Website

An award-winning, cinematic personal portfolio website built for **Sushanth R**, a Full-Stack & Mobile Developer (MCA, Udupi, Karnataka). Designed with an obsidian dark theme, electric emerald accents, 60fps animations, kinetic typography, bento-grid layouts, and buttery-smooth Lenis scrolling.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) (60fps interpolated scrolling with reduced-motion support)
- **Interactive Particle Element**: Canvas 60fps Constellation Node Mesh (lazy-loaded, mouse-reactive, with graceful CSS fallback)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Cinematic Dark Mode + Luxury Light Mode)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG vectors for GitHub & LinkedIn
- **Form Service**: [Web3Forms](https://web3forms.com/) (Zero backend, direct inbox delivery)
- **Deployment**: [Vercel](https://vercel.com/) (Production optimized)

---

## 🚀 Key Features

1. **Short Kinetic Intro Loader**: Under 1.5 seconds reveal of "Sushanth R" with progress counter and smooth blur exit. Session-storage aware so subsequent refreshes remain instant.
2. **Hero Section**: Kinetic staggered typography, interactive 60fps canvas particle constellation, "Available for Work" beacon, "View Projects" and "Download Resume" actions.
3. **About Section**: Professional profile, technical philosophy pillars (Clean Architecture, Secure Backends, Cross-Platform Mobile, AI Integration), and animated stat cards.
4. **Experience Timeline**: Timeline for **Evolvetech, Bengaluru** (Full Stack Intern, from 23 March 2026) with MERN stack contributions, RESTful API integrations, and Agile methodology tags.
5. **Centerpiece Projects Showcase**:
   - **Evolish**: AI-Powered English Learning & Exam Prep Ecosystem (Google Play Store link, speech score simulation, "Talk to Book" RAG, Razorpay, offline sync).
   - **ElevateHire**: AI-Integrated Networking & Placement Training Platform (Live Vercel link, mock interview analytics).
   - **Feel It Buy**: Tri-App E-Commerce & On-Demand Logistics Ecosystem (1st Place Winner in Development Challenge, Flutter + React + Supabase Realtime).
   - **Interactive 3D Tilt Cards** with mouse coordinates interpolation.
   - **Deep-Dive Case Study Modal** with architecture breakdowns, problem/solution analysis, and key feature lists.
6. **Bento Grid Skills**: Grouped across Languages (Python, JavaScript, Dart, PHP), Frontend (React, React Native, Flutter, HTML, CSS), Backend & Databases (Node.js, Express, MongoDB, Supabase, PostgreSQL), and Tools (Git, GitHub, Vercel, Google Play Console).
7. **Honors & Certifications**: 1st Place Development Challenge trophy card, NPTEL "The Joy of Computing using Python", and Infosys Springboard PHP Web Development.
8. **Education Timeline**: MCA (Poornaprajna Institute of Management, Udupi 2024–2026), BCA (2021–2024), and Advanced Diploma in AI, Big Data Analytics & Cyber Security (Udupi Group of Institute, Manipal).
9. **Contact & Web3Forms Integration**: Direct email and phone cards with one-click copy feedback, social links, and a functional contact form that celebrates submissions with a confetti burst.
10. **Interactive Resume Modal**: In-browser preview of Sushanth's resume with direct print/PDF export and download triggers.
11. **Cinematic Footer**: Live real-time clock synced to Indian Standard Time (IST) in Udupi, Karnataka.

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme tokens, glassmorphism, scrollbars, motion styles
│   │   ├── layout.tsx          # Root layout with SEO metadata & Open Graph
│   │   ├── page.tsx            # Main application layout assembling all sections
│   │   ├── manifest.ts         # Web application manifest
│   │   ├── robots.ts           # Search engine crawler instructions
│   │   └── sitemap.ts          # XML sitemap configuration
│   ├── components/
│   │   ├── providers/
│   │   │   ├── SmoothScroll.tsx # Lenis smooth scroll engine
│   │   │   └── ThemeProvider.tsx# Dark/Light theme manager
│   │   ├── sections/
│   │   │   ├── About.tsx       # Bio, engineering pillars, and metrics
│   │   │   ├── Achievements.tsx# Award & certification cards
│   │   │   ├── Contact.tsx     # Web3Forms form + contact channels
│   │   │   ├── Education.tsx   # Academic milestones & diplomas
│   │   │   ├── Experience.tsx  # Evolvetech timeline
│   │   │   ├── Hero.tsx        # Kinetic hero banner
│   │   │   ├── HeroCanvas.tsx  # 60fps particle mesh element
│   │   │   ├── ProjectCard.tsx # 3D tilt project card
│   │   │   ├── ProjectCaseStudyModal.tsx # Case study deep dive modal
│   │   │   ├── Projects.tsx    # Filterable project showcase
│   │   │   └── Skills.tsx      # Bento grid technical arsenal
│   │   └── ui/
│   │       ├── CustomCursor.tsx# Smooth magnetic cursor
│   │       ├── Footer.tsx      # IST clock, social links, back-to-top
│   │       ├── Icons.tsx       # Custom SVG vectors (GitHub, LinkedIn)
│   │       ├── IntroLoader.tsx # 1.2s kinetic intro loader
│   │       ├── Navbar.tsx      # Sticky glass nav with active scroll-spy
│   │       └── ResumeModal.tsx # Interactive resume preview & export modal
│   ├── data/
│   │   └── portfolioData.ts    # Single source of truth for all projects, skills, and info
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── .env.example                # Sample environment variables
├── package.json
└── README.md
```

---

## 🛠️ Quickstart (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📸 How to Replace Project Screenshot Placeholders

The project cards and case-study modal currently feature high-fidelity simulated UI blueprints. To swap in your own app screenshots:

1. Place your PNG/JPEG screenshots in the `public/projects/` directory (e.g. `public/projects/evolish.png`, `public/projects/elevatehire.png`, `public/projects/feelitbuy.png`).
2. Open `src/components/sections/ProjectCard.tsx` and search for the comment `PLACEHOLDER SCREENSHOT`. Replace the placeholder box with Next.js `Image`:
   ```tsx
   import Image from "next/image";
   // Inside the card:
   <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
     <Image
       src="/projects/evolish.png"
       alt="Evolish UI"
       fill
       className="object-cover"
     />
   </div>
   ```
3. Open `src/components/sections/ProjectCaseStudyModal.tsx` and do the same under the `PLACEHOLDER SCREENSHOT AREA` comment.

---

## 📬 Web3Forms Setup (Contact Form)

The contact form is configured to use [Web3Forms](https://web3forms.com/) for zero-backend email delivery:

1. Visit [https://web3forms.com/](https://web3forms.com/) and enter your email `sushanthrpoojari@gmail.com`.
2. Copy your free Access Key from the confirmation email.
3. Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-actual-access-key-here
   ```
4. Submissions from the form will now arrive instantly in your inbox!

---

## 🌐 Deploy to Vercel from GitHub

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: world-class portfolio for Sushanth R"
   git branch -M main
   git remote add origin https://github.com/Sushanth05-R/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
   - Click **Add New Project** and select your `portfolio` repository.
   - Under **Environment Variables**, add:
     - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = your Web3Forms key
   - Click **Deploy**. Vercel will build and assign your free production URL (e.g. `https://sushanth-r.vercel.app`).
