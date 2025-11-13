'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SkillCategory } from '@/lib/types';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface SkillsProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsProps) {
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

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((category) => (
        <motion.div key={category.name} variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {skill.proficiency}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

