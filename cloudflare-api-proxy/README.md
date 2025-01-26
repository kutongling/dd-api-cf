# Cloudflare API Proxy

该项目是一个 CORS 代理，旨在通过 Cloudflare Workers 访问 API。它允许客户端请求 API，而不受同源策略的限制。

## 项目结构

- `src/index.ts`：应用程序的入口点，设置 Cloudflare Workers 的处理程序，并处理传入的请求。
- `src/handlers/api.ts`：处理 API 请求，执行 CORS 代理逻辑，并返回 API 响应。
- `src/utils/auth.ts`：验证请求中的身份验证信息。
- `src/utils/signature.ts`：生成 API 请求所需的签名。
- `src/types/index.ts`：定义 API 请求和响应的类型。

## 设置

1. 克隆此存储库：
   ```bash
   git clone <repository-url>
   cd cloudflare-api-proxy
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置 `wrangler.toml` 文件，设置项目名称和其他设置。

4. 部署到 Cloudflare：
   ```bash
   npx wrangler publish
   ```

## 使用

通过 Cloudflare Workers 部署后，您可以使用以下 URL 访问 API：
```
https://<your-cloudflare-worker-url>/api/v2/search/episodes?anime=test
```

## 许可证

此项目使用 MIT 许可证。有关详细信息，请参阅 LICENSE 文件。