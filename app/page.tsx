'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProfile, useProjects } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { trackResumeDownload, trackProjectView } from '@/lib/analytics';

export default function HomePage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const prefersReducedMotion = usePrefersReducedMotion();

  const featuredProjects = projects?.filter(p => p.featured) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  if (profileLoading || projectsLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32 lg:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I&apos;m{' '}
              <span className="text-primary">{profile?.name || 'Edmon Dela Cruz'}</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl text-muted-foreground sm:text-2xl"
          >
            {profile?.title || 'Software Engineer'}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground max-w-2xl"
          >
            {profile?.summary || 'Full-stack engineer focused on building fast, accessible web applications.'}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              onClick={() => trackResumeDownload()}
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-muted-foreground">
              A selection of my recent work and side projects
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => trackProjectView(project.slug)}
                >
                  <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-4">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          Project Image
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.short}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      {project.year}
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className="rounded-lg border bg-card p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
