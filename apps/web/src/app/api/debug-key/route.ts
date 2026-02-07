import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '';
  
  // Analyze the raw key
  const analysis = {
    emailSet: !!email,
    rawKey: {
      length: rawKey.length,
      first30: rawKey.substring(0, 30),
      last30: rawKey.substring(Math.max(0, rawKey.length - 30)),
      startsWithQuote: rawKey.startsWith('"'),
      startsWithDash: rawKey.startsWith('-'),
      startsWithBegin: rawKey.startsWith('-----BEGIN'),
      containsLiteralBackslashN: rawKey.includes('\\n'),
      containsActualNewline: rawKey.includes('\n'),
      charCodes: rawKey.substring(0, 20).split('').map(c => c.charCodeAt(0)),
    },
    attempts: [] as any[],
  };

  // Attempt 1: Direct use (maybe it already has real newlines)
  try {
    crypto.createPrivateKey(rawKey);
    analysis.attempts.push({ method: 'direct', success: true });
  } catch (e: any) {
    analysis.attempts.push({ method: 'direct', success: false, error: e.message });
  }

  // Attempt 2: Replace \n with actual newlines
  const withNewlines = rawKey.replace(/\\n/g, '\n');
  try {
    crypto.createPrivateKey(withNewlines);
    analysis.attempts.push({ method: 'replaceBackslashN', success: true });
  } catch (e: any) {
    analysis.attempts.push({ method: 'replaceBackslashN', success: false, error: e.message });
  }

  // Attempt 3: JSON.parse if starts with quote
  if (rawKey.startsWith('"')) {
    try {
      const parsed = JSON.parse(rawKey);
      crypto.createPrivateKey(parsed);
      analysis.attempts.push({ method: 'jsonParse', success: true });
    } catch (e: any) {
      analysis.attempts.push({ method: 'jsonParse', success: false, error: e.message });
    }
  }

  // Attempt 4: Base64 decode
  try {
    const decoded = Buffer.from(rawKey, 'base64').toString('utf-8');
    analysis.attempts.push({ method: 'base64Decode', decodedFirst30: decoded.substring(0, 30) });
    crypto.createPrivateKey(decoded);
    analysis.attempts.push({ method: 'base64DecodeValidate', success: true });
  } catch (e: any) {
    analysis.attempts.push({ method: 'base64DecodeValidate', success: false, error: e.message });
  }

  // Attempt 5: Double unescape
  const doubleUnescaped = rawKey.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n');
  try {
    crypto.createPrivateKey(doubleUnescaped);
    analysis.attempts.push({ method: 'doubleUnescape', success: true });
  } catch (e: any) {
    analysis.attempts.push({ method: 'doubleUnescape', success: false, error: e.message });
  }

  // Attempt 6: Strip quotes and then replace
  if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
    const stripped = rawKey.slice(1, -1).replace(/\\n/g, '\n');
    try {
      crypto.createPrivateKey(stripped);
      analysis.attempts.push({ method: 'stripQuotesAndReplace', success: true });
    } catch (e: any) {
      analysis.attempts.push({ method: 'stripQuotesAndReplace', success: false, error: e.message });
    }
  }

  return NextResponse.json(analysis);
}
