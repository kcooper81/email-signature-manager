import { NextResponse } from 'next/server';

// Serves the IndexNow verification key
// Key file must be accessible at a public URL for IndexNow to verify domain ownership
export async function GET() {
  const key = process.env.INDEXNOW_API_KEY;

  if (!key) {
    return NextResponse.json({ error: 'Not configured' }, { status: 404 });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
