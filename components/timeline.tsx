'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TimelineItem } from '@/lib/types';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={itemVariants}
          transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {item.type === 'work' ? (
                      <Briefcase className="h-5 w-5 text-primary" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.organization} • {item.location}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {item.startDate} - {item.endDate || 'Present'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{item.description}</p>
              {item.highlights && item.highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
                  <ul className="space-y-1">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="mr-2 text-primary">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

