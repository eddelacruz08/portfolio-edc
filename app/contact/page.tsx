'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSendContact } from '@/hooks/use-api';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { trackContactSubmit } from '@/lib/analytics';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: sendContact, isPending } = useSendContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    sendContact(data, {
      onSuccess: () => {
        setShowSuccess(true);
        reset();
        trackContactSubmit(true);
        setTimeout(() => setShowSuccess(false), 5000);
      },
      onError: (error) => {
        trackContactSubmit(false);
        alert(error.message || 'Failed to send message. Please try again.');
      },
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                I&apos;ll respond within 2 business days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register('honeypot')}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    rows={6}
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-green-900 dark:text-green-100"
                  >
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm mt-1">
                      Thank you for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Manila, Philippines
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:hello@example.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <a
                  href="https://github.com/edmondelacruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/edmondelacruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/edmondelacruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

