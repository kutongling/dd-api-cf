/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const API_BASE = 'https://api.dandanplay.net';

export interface Env {
    DANDAN_APP_ID: string;
    DANDAN_APP_SECRET: string;
}

async function generateSignature(path: string, timestamp: number, env: Env): Promise<string> {
    // 规范化路径
    path = path.replace(/\/+/g, '/');
    const data = `${env.DANDAN_APP_ID}${timestamp}${path}${env.DANDAN_APP_SECRET}`;
    
    console.log('签名数据:', {
        appId: env.DANDAN_APP_ID,
        timestamp,
        path,
        signData: data
    });

    // 使用 TextEncoder 转换字符串为 UTF-8 字节
    const msgBuffer = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return btoa(String.fromCharCode(...hashArray));
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        // 处理 CORS 预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400',
                }
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

            // 生成认证信息
            const timestamp = Math.floor(Date.now() / 1000);
            const signature = await generateSignature(apiPath, timestamp, env);

            console.log('请求详情:', {
                目标URL: targetUrl.toString(),
                路径: apiPath,
                参数: Object.fromEntries(params),
                签名: signature
            });

            // 发送API请求
            const response = await fetch(targetUrl.toString(), {
                method: request.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AppId': env.DANDAN_APP_ID,
                    'X-Timestamp': timestamp.toString(),
                    'X-Signature': signature,
                    'User-Agent': 'Cloudflare-Worker/1.0'
                }
            });

            const responseData = await response.text();
            console.log('API响应:', {
                状态: response.status,
                数据: responseData.substring(0, 200)
            });

            if (!response.ok) {
                throw new Error(`API错误: ${response.status} - ${responseData}`);
            }

            // 返回响应
            return new Response(responseData, {
                status: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });

        } catch (error) {
            console.error('错误:', error);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: error instanceof Error ? error.message : '未知错误',
                    timestamp: new Date().toISOString()
                }),
                {
                    status: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );
        }
    }
};
