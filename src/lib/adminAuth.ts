import crypto from 'crypto'
import { NextRequest } from 'next/server'

function getSecret(): string {
  return (process.env.ADMIN_SECRET || 'dev_admin_secret_change_me').trim()
}
function getFullAccessUsername(): string {
  return (process.env.ADMIN_USERNAME_FULL || 'admin').trim()
}
function getRestrictedUsername(): string {
  return (process.env.ADMIN_USERNAME_RESTRICTED || 'Ray-aquabion').trim()
}

const COOKIE_NAME = 'admin_token'

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function issueToken(username: string, ttlSeconds = 8 * 60 * 60) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttlSeconds;
  const payload = { iat, exp, username };
  const b = base64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', getSecret()).update(b).digest('base64');
  const s = base64url(sig);
  return `${b}.${s}`;
}

export function verifyToken(token?: string): { valid: boolean; username?: string } {
  if (!token) return { valid: false };
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };
  const [b, s] = parts;
  try {
    const expectedSig = base64url(crypto.createHmac('sha256', getSecret()).update(b).digest('base64'));
    if (s !== expectedSig) return { valid: false };
    const payloadRaw = Buffer.from(b, 'base64').toString('utf8');
    const payload = JSON.parse(payloadRaw);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return { valid: false };
    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

export function getUsernameFromRequest(request: NextRequest): string | undefined {
  try {
    const cookie = request.headers.get('cookie') || '';
    const match = cookie.split(';').map(s => s.trim()).find(c => c.startsWith(COOKIE_NAME + '='));
    if (match) {
      const token = match.split('=')[1];
      const result = verifyToken(token);
      return result.valid ? result.username : undefined;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export function getTokenFromRequest(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const match = cookie.split(';').map(s=>s.trim()).find(c=>c.startsWith(COOKIE_NAME+'='))
    if (match) return match.split('=')[1]
    const header = req.headers.get('x-admin-secret')
    if (header && header === getSecret()) return 'header:' + header
    return undefined
  } catch {
    return undefined
  }
}

export function isAdminRequest(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  if (token.startsWith('header:')) return true;
  const result = verifyToken(token);
  return result.valid;
}

export function validateCredentials(username: string, password: string): { valid: boolean; username: string } {
  const expectedFullUsername = getFullAccessUsername();
  const expectedRestrictedUsername = getRestrictedUsername();
  const expectedPassword = getSecret();
  
  console.log('[validateCredentials] Inputs:', {
    username: username.trim(),
    expectedFullUsername,
    expectedRestrictedUsername,
    passwordProvided: password.trim() ? 'yes' : 'no',
    passwordMatch: password.trim() === expectedPassword
  });
  
  if (!username || !password) return { valid: false, username: "" };
  
  const isFullAccess = username.trim().toLowerCase() === expectedFullUsername.toLowerCase();
  const isRestricted = username.trim().toLowerCase() === expectedRestrictedUsername.toLowerCase();
  const passwordOk = password.trim() === expectedPassword;
  
  const isValid = (isFullAccess || isRestricted) && passwordOk;
  
  console.log('[validateCredentials] Result:', { isValid, isFullAccess, isRestricted, passwordOk });
  
  return { valid: isValid, username: isValid ? username.trim() : "" };
}
