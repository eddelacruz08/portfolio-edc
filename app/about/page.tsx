'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/timeline';
import { Skills } from '@/components/skills';
import { useProfile } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { trackResumeDownload } from '@/lib/analytics';
import { mockTimeline, mockSkills } from '@/mocks';

export default function AboutPage() {
  const { data: profile, isLoading } = useProfile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    },
  };

  if (isLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="max-w-3xl"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About Me
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {profile?.summary ||
            'Full-stack engineer focused on building fast, accessible web applications with modern technologies. Passionate about clean code, user experience, and continuous learning.'}
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          I believe in writing code that not only works but is maintainable,
          scalable, and delightful to use. When I&apos;m not coding, you&apos;ll
          find me exploring new technologies, contributing to open source, or
          sharing knowledge with the developer community.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild onClick={() => trackResumeDownload()}>
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Skills & Expertise
        </h2>
        <Skills categories={mockSkills} />
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Experience & Education
        </h2>
        <Timeline items={mockTimeline} />
      </motion.div>
    </div>
  );
}
