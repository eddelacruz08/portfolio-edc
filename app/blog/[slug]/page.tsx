'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlogPosts } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: posts, isLoading } = useBlogPosts();
  const prefersReducedMotion = usePrefersReducedMotion();

  const post = posts?.find((p) => p.slug === slug);

  const fadeInVariants = {
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
        <div className="animate-pulse text-muted-foreground">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-muted-foreground">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <motion.article
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mt-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        {post.cover && (
          <div className="mt-8 aspect-video relative overflow-hidden rounded-lg bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Blog Cover Image
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">{post.excerpt}</p>
          
          <div className="mt-8 p-6 bg-muted rounded-lg text-center">
            <p className="text-muted-foreground">
              📝 This is a placeholder for blog content. In production, this would be rendered from MDX files.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The blog system is ready to integrate with MDX or a headless CMS.
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

