import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  
  const { pathname } = request.nextUrl;
  
  // Allow public routes and static files
  if (publicRoutes.includes(pathname) || pathname.startsWith('/auth/')) {
    return response;
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
