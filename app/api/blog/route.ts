import { NextResponse } from 'next/server';
import { mockBlogPosts } from '@/mocks';

export async function GET() {
  // In production, this could read from MDX files or a CMS
  return NextResponse.json(mockBlogPosts);
}
