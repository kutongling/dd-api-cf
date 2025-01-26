import crypto from 'crypto';

export function generateSignature(appId: string, appSecret: string, timestamp: number, path: string): string {
    const data = appId + timestamp + path + appSecret;
    return crypto.createHash('sha256').update(data).digest('base64');
}