'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Profile,
  ProjectSummary,
  ProjectDetail,
  BlogPost,
  ContactPayload,
  ApiResponse,
} from '@/lib/types';
import {
  mockProfile,
  mockProjects,
  getProjectBySlug,
  mockBlogPosts,
} from '@/mocks';

// Profile hook
export function useProfile() {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      } catch (err) {
        console.warn('Failed to fetch profile, using mock data:', err);
        return mockProfile;
      }
    },
  });
}

// Projects list hook
export function useProjects() {
  return useQuery<ProjectSummary[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      } catch (err) {
        console.warn('Failed to fetch projects, using mock data:', err);
        return mockProjects;
      }
    },
  });
}

// Project detail hook
export function useProject(slug: string) {
  return useQuery<ProjectDetail | undefined>({
    queryKey: ['project', slug],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      } catch (err) {
        console.warn('Failed to fetch project detail, using mock data:', err);
        return getProjectBySlug(slug);
      }
    },
    enabled: !!slug,
  });
}

// Blog posts hook
export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ['blog'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/blog');
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      } catch (err) {
        console.warn('Failed to fetch blog posts, using mock data:', err);
        return mockBlogPosts;
      }
    },
  });
}

// Contact mutation hook
export function useSendContact() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, ContactPayload>({
    mutationFn: async (payload: ContactPayload) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send message');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });
}
