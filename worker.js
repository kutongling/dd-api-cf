const API_BASE = 'https://api.dandanplay.net';

// 生成签名
function generateSignature(appId, timestamp, path, appSecret) {
    const encoder = new TextEncoder();
    const data = `${appId}${timestamp}${path}${appSecret}`;
    
    return crypto.subtle.digest('SHA-256', encoder.encode(data))
        .then(hash => {
            return btoa(String.fromCharCode(...new Uint8Array(hash)));
        });
}

async function handleRequest(request) {
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
            DANDAN_APP_ID,
            timestamp,
            apiPath,
            DANDAN_APP_SECRET
        );

        // 发送请求
        const response = await fetch(targetUrl.toString(), {
            headers: {
                'X-AppId': DANDAN_APP_ID,
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
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        });

        return new Response(JSON.stringify(data), { headers });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            errorCode: 500,
            errorMessage: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

addEventListener('fetch', event => {
    if (event.request.method === 'OPTIONS') {
        // 处理 CORS 预检请求
        event.respondWith(new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-AppId, X-Timestamp, X-Signature',
            }
        }));
    } else {
        event.respondWith(handleRequest(event.request));
    }
});
