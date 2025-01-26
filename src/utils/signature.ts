export async function generateSignature(appId: string, timestamp: number, path: string, appSecret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = `${appId}${timestamp}${path}${appSecret}`;
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}
