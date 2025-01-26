import { generateSignature } from '../utils/signature';
import type { Env } from '../index';

const API_BASE = 'https://api.dandanplay.net';

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-AppId, X-Timestamp, X-Signature',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    const url = new URL(request.url);
    let apiPath = url.pathname;
    const params = url.searchParams;

    // 规范化路径
    apiPath = apiPath.replace(/\/+/g, '/');

    // 构建目标URL
    const targetUrl = new URL(apiPath, API_BASE);
    params.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    // 生成签名
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await generateSignature(
      env.DANDAN_APP_ID,
      timestamp,
      apiPath,
      env.DANDAN_APP_SECRET
    );

    // 发送请求
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'X-AppId': env.DANDAN_APP_ID,
        'X-Timestamp': timestamp.toString(),
        'X-Signature': signature,
        'Accept': 'application/json'
      }
    });

    // 处理响应
    const data = await response.json();
    
    // 设置CORS头
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-AppId, X-Timestamp, X-Signature',
      'Content-Type': 'application/json'
    });

    return new Response(JSON.stringify(data), { headers });

  } catch (error: any) { // 修改错误处理
    return new Response(JSON.stringify({
      success: false,
      errorCode: 500,
      errorMessage: error.message || 'Internal Server Error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
