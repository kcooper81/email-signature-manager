import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.OAUTH_ENCRYPTION_KEY || '';
const ALGORITHM = 'aes-256-gcm';

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  console.warn('OAUTH_ENCRYPTION_KEY must be a 64-character hex string. Generate with: openssl rand -hex 32');
}

export function encryptToken(token: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('OAUTH_ENCRYPTION_KEY is not configured. Cannot store tokens without encryption.');
  }
  
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decryptToken(encryptedToken: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('OAUTH_ENCRYPTION_KEY is not configured. Cannot decrypt tokens without encryption key.');
  }
  
  const parts = encryptedToken.split(':');
  if (parts.length !== 3) {
    console.warn('decryptToken: token is not in encrypted format (iv:tag:data), returning as-is');
    return encryptedToken;
  }
  
  const [ivHex, authTagHex, encrypted] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
