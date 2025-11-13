'use client';

import { track } from '@vercel/analytics';

// Custom event tracking wrapper
export const trackEvent = (eventName: string, properties?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined') {
    track(eventName, properties);
  }
};

// Specific tracking functions for common events
export const trackResumeDownload = () => {
  trackEvent('resume_download');
};

export const trackProjectView = (projectSlug: string) => {
  trackEvent('project_view', { project: projectSlug });
};

export const trackProjectLinkClick = (projectSlug: string, linkType: 'repo' | 'live') => {
  trackEvent('project_link_click', { project: projectSlug, type: linkType });
};

export const trackContactSubmit = (success: boolean) => {
  trackEvent('contact_submit', { success });
};

export const trackNavigation = (page: string) => {
  trackEvent('navigation', { page });
};

