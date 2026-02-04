import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Microsoft 365 integration is not yet implemented. Please use Google Workspace or HubSpot for now.' 
    },
    { status: 501 }
  );
}
