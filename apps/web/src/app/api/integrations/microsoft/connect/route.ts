import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.redirect(
    new URL('/integrations?error=microsoft_not_implemented', request.url)
  );
}
