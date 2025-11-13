'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlogPosts } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export default function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
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
        <div className="animate-pulse text-muted-foreground">Loading posts...</div>
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Thoughts on software development, technology, and lessons learned along the way.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  {post.cover && (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Blog Cover Image
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="col-span-full text-center text-muted-foreground py-12"
          >
            <p>No blog posts yet. Check back soon!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

