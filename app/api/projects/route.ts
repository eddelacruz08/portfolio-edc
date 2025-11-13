import { NextResponse } from 'next/server';
import { mockProjects } from '@/mocks';

export async function GET() {
  // In production, this could fetch from a database or CMS
  return NextResponse.json(mockProjects);
}
