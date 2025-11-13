// Core type definitions for the portfolio

export interface Profile {
  name: string;
  title: string;
  location: string;
  summary: string;
  avatar: string;
  social: SocialLink[];
}

export interface SocialLink {
  network: string;
  url: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  short: string;
  cover: string;
  tech: string[];
  year: number;
  featured: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  description: string;
  images: string[];
  role: string;
  duration: string;
  links: {
    repo: string;
    live: string;
  };
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  cover?: string;
}

export interface BlogPostDetail extends BlogPost {
  content: string;
  author: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
