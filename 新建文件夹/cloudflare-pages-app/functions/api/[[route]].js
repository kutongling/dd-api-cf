export default async function handler(req) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // 处理GET请求
            return new Response(JSON.stringify({ message: 'GET请求成功' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        case 'POST':
            // 处理POST请求
            const data = await req.json();
            return new Response(JSON.stringify({ message: 'POST请求成功', data }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        default:
            return new Response(JSON.stringify({ error: '不支持的请求方法' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' },
            });
    }
}