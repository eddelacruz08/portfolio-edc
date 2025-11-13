'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCarousel } from '@/components/project-carousel';
import { useProject } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { trackProjectLinkClick } from '@/lib/analytics';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading } = useProject(slug);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  if (isLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="mt-2 text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-6">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="mt-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {project.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {project.short}
              </p>
            </div>
            <div className="flex gap-2">
              {project.links?.repo && (
                <Button
                  variant="outline"
                  asChild
                  onClick={() => trackProjectLinkClick(project.slug, 'repo')}
                >
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {project.links?.live && (
                <Button
                  asChild
                  onClick={() => trackProjectLinkClick(project.slug, 'live')}
                >
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={itemVariants} className="mt-8">
          <ProjectCarousel
            images={project.images || []}
            title={project.title}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                <p>{project.description}</p>
              </CardContent>
            </Card>

            {project.highlights && project.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Role
                  </h3>
                  <p className="mt-1">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Duration
                  </h3>
                  <p className="mt-1">{project.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Year
                  </h3>
                  <p className="mt-1">{project.year}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
