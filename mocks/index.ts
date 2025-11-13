import type {
  Profile,
  ProjectSummary,
  ProjectDetail,
  BlogPost,
  TimelineItem,
  SkillCategory,
} from '@/lib/types';

export const mockProfile: Profile = {
  name: 'Edmon Dela Cruz',
  title: 'Software Engineer',
  location: 'Manila, Philippines',
  summary:
    'Full-stack engineer focused on building fast, accessible web applications with modern technologies. Passionate about clean code, user experience, and continuous learning.',
  avatar: '/images/avatar.jpg',
  social: [
    { network: 'github', url: 'https://github.com/edmondelacruz' },
    { network: 'linkedin', url: 'https://linkedin.com/in/edmondelacruz' },
    { network: 'twitter', url: 'https://twitter.com/edmondelacruz' },
  ],
};

export const mockProjects: ProjectSummary[] = [
  {
    id: 'proj-1',
    title: 'Open Source Design System',
    slug: 'open-source-design-system',
    short: 'A component library built with Tailwind and shadcn for rapid prototyping.',
    cover: '/images/projects/design-system.png',
    tech: ['nextjs', 'tailwind', 'shadcn', 'typescript', 'storybook'],
    year: 2025,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'E-Commerce Dashboard',
    slug: 'ecommerce-dashboard',
    short: 'Admin dashboard with real-time analytics, reports, and order management.',
    cover: '/images/projects/dashboard.png',
    tech: ['nextjs', 'react', 'tanstack-query', 'recharts', 'postgresql'],
    year: 2024,
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Task Management App',
    slug: 'task-management-app',
    short: 'Collaborative task tracker with drag-and-drop, notifications, and team workspaces.',
    cover: '/images/projects/task-app.png',
    tech: ['react', 'typescript', 'dnd-kit', 'supabase', 'tailwind'],
    year: 2024,
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'Weather Forecast PWA',
    slug: 'weather-forecast-pwa',
    short: 'Progressive web app providing hyper-local weather forecasts and alerts.',
    cover: '/images/projects/weather.png',
    tech: ['nextjs', 'pwa', 'openweather-api', 'service-worker'],
    year: 2023,
    featured: false,
  },
];

export const mockProjectDetails: Record<string, ProjectDetail> = {
  'open-source-design-system': {
    ...mockProjects[0],
    description:
      'A comprehensive design system with accessible components, theming utilities, and documentation built on Tailwind CSS and shadcn. Designed for rapid prototyping and production-ready applications.',
    images: [
      '/images/projects/design-system-1.png',
      '/images/projects/design-system-2.png',
      '/images/projects/design-system-3.png',
    ],
    role: 'Sole Engineer — design, implementation, documentation, and maintenance',
    duration: '3 months',
    links: {
      repo: 'https://github.com/edmondelacruz/design-system',
      live: 'https://design-system.example.com',
    },
    highlights: [
      'Accessible WCAG 2.1 AA compliant tokens',
      'SSR-friendly with zero runtime JS for static components',
      'Composable primitives for complex UI patterns',
      'Comprehensive Storybook documentation',
    ],
  },
  'ecommerce-dashboard': {
    ...mockProjects[1],
    description:
      'Real-time admin dashboard for e-commerce platforms featuring sales analytics, inventory management, customer insights, and order processing. Built with modern React patterns and optimized for performance.',
    images: [
      '/images/projects/dashboard-1.png',
      '/images/projects/dashboard-2.png',
      '/images/projects/dashboard-3.png',
    ],
    role: 'Lead Frontend Engineer — architecture, implementation, and team coordination',
    duration: '6 months',
    links: {
      repo: 'https://github.com/edmondelacruz/ecommerce-dashboard',
      live: 'https://dashboard.example.com',
    },
    highlights: [
      'Real-time data updates with TanStack Query',
      'Interactive charts and data visualization',
      'Role-based access control and permissions',
      'Export reports to PDF and CSV',
    ],
  },
  'task-management-app': {
    ...mockProjects[2],
    description:
      'Collaborative task management application with intuitive drag-and-drop interface, real-time collaboration, team workspaces, and notification system. Built for remote teams.',
    images: [
      '/images/projects/task-app-1.png',
      '/images/projects/task-app-2.png',
    ],
    role: 'Full-Stack Developer — end-to-end feature development',
    duration: '4 months',
    links: {
      repo: 'https://github.com/edmondelacruz/task-app',
      live: 'https://tasks.example.com',
    },
    highlights: [
      'Smooth drag-and-drop with dnd-kit',
      'Real-time collaboration via Supabase',
      'Custom notification system',
      'Mobile-responsive design',
    ],
  },
  'weather-forecast-pwa': {
    ...mockProjects[3],
    description:
      'Progressive Web App delivering hyper-local weather forecasts, severe weather alerts, and historical data. Works offline with service worker caching and push notifications.',
    images: ['/images/projects/weather-1.png', '/images/projects/weather-2.png'],
    role: 'Solo Developer — full ownership',
    duration: '2 months',
    links: {
      repo: 'https://github.com/edmondelacruz/weather-pwa',
      live: 'https://weather.example.com',
    },
    highlights: [
      'Offline-first architecture',
      'Push notifications for alerts',
      'Geolocation-based forecasts',
      'Installable on mobile devices',
    ],
  },
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building Accessible React Components',
    slug: 'building-accessible-react-components',
    excerpt:
      'Learn how to build accessible React components that work for everyone, including keyboard navigation and screen reader support.',
    date: '2025-01-15',
    readTime: '8 min',
    tags: ['react', 'accessibility', 'a11y'],
    cover: '/images/blog/accessibility.png',
  },
  {
    id: 'post-2',
    title: 'Optimizing Next.js Performance',
    slug: 'optimizing-nextjs-performance',
    excerpt:
      'Practical tips and techniques for improving your Next.js application performance, from image optimization to code splitting.',
    date: '2024-12-10',
    readTime: '10 min',
    tags: ['nextjs', 'performance', 'optimization'],
    cover: '/images/blog/performance.png',
  },
  {
    id: 'post-3',
    title: 'State Management with TanStack Query',
    slug: 'state-management-tanstack-query',
    excerpt:
      'Explore how TanStack Query simplifies server state management in React applications with caching, refetching, and mutations.',
    date: '2024-11-05',
    readTime: '12 min',
    tags: ['react', 'tanstack-query', 'state-management'],
  },
];

export const mockTimeline: TimelineItem[] = [
  {
    id: 'work-1',
    type: 'work',
    title: 'Senior Frontend Engineer',
    organization: 'Tech Innovations Inc.',
    location: 'Manila, Philippines',
    startDate: '2023-06',
    description:
      'Leading frontend development for enterprise SaaS products. Architecting scalable React applications and mentoring junior developers.',
    highlights: [
      'Reduced bundle size by 40% through code splitting',
      'Implemented design system adopted across 5 products',
      'Led migration from Create React App to Next.js',
    ],
  },
  {
    id: 'work-2',
    type: 'work',
    title: 'Frontend Developer',
    organization: 'Digital Solutions Co.',
    location: 'Remote',
    startDate: '2021-03',
    endDate: '2023-05',
    description:
      'Developed customer-facing web applications using React and TypeScript. Collaborated with designers and backend engineers.',
    highlights: [
      'Built 10+ responsive web applications',
      'Improved Core Web Vitals scores by 35%',
      'Integrated with RESTful and GraphQL APIs',
    ],
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'Bachelor of Science in Computer Science',
    organization: 'University of the Philippines',
    location: 'Diliman, Quezon City',
    startDate: '2017-06',
    endDate: '2021-03',
    description:
      'Focused on software engineering, algorithms, and web technologies. Graduated with honors.',
    highlights: [
      "Dean's List (2019-2021)",
      'Thesis: Machine Learning for Code Review',
      'President of CS Student Organization',
    ],
  },
];

export const mockSkills: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { id: 'react', name: 'React', category: 'Frontend', proficiency: 95 },
      { id: 'nextjs', name: 'Next.js', category: 'Frontend', proficiency: 90 },
      { id: 'typescript', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', proficiency: 85 },
      { id: 'javascript', name: 'JavaScript', category: 'Frontend', proficiency: 95 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { id: 'nodejs', name: 'Node.js', category: 'Backend', proficiency: 80 },
      { id: 'postgresql', name: 'PostgreSQL', category: 'Backend', proficiency: 75 },
      { id: 'api', name: 'REST APIs', category: 'Backend', proficiency: 85 },
      { id: 'graphql', name: 'GraphQL', category: 'Backend', proficiency: 70 },
    ],
  },
  {
    name: 'Tools & Practices',
    skills: [
      { id: 'git', name: 'Git', category: 'Tools', proficiency: 90 },
      { id: 'testing', name: 'Testing (Jest, RTL)', category: 'Tools', proficiency: 80 },
      { id: 'ci-cd', name: 'CI/CD', category: 'Tools', proficiency: 75 },
      { id: 'figma', name: 'Figma', category: 'Tools', proficiency: 70 },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return mockProjectDetails[slug];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find((post) => post.slug === slug);
}

