export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Mobile" | "Web & AI" | "E-Commerce / Ecosystem";
  featured: boolean;
  tags: string[];
  playStoreUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string[];
    features: string[];
    role: string;
  };
  mockupType: "mobile" | "web" | "tri-app";
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  isUpcomingOrCurrent: boolean;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Familiar";
    iconName?: string;
    highlight?: boolean;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description: string;
  tag: "Award" | "Certification";
  credentialNote?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  location: string;
  period: string;
  highlights?: string[];
}

