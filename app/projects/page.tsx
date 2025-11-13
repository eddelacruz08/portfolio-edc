'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { trackProjectView } from '@/lib/analytics';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get all unique technologies
  const allTech = Array.from(
    new Set(projects?.flatMap((p) => p.tech) || [])
  ).sort();

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTech =
      selectedTech === null || project.tech.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.4 },
    },
  };

  if (isLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          A collection of my work, experiments, and side projects. Each one
          represents a journey of learning and problem-solving.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.1,
        }}
        className="mt-8 space-y-4"
      >
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tech Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTech === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTech(null)}
          >
            All
          </Button>
          {allTech.map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects && filteredProjects.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
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
                    <div className="flex items-start justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      {project.featured && (
                        <Badge variant="default" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{project.short}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="secondary">
                          +{project.tech.length - 4}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    {project.year}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-muted-foreground"
        >
          <p>No projects found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedTech(null);
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
