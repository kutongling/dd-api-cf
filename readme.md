# ktl-api-cf

这是一个基于 Cloudflare Workers 的 API 代理服务,用于转发和处理 DanDanPlay API 的请求。

## 功能特性

- 支持 DanDanPlay API 的签名验证模式
- 自动处理 CORS 跨域请求
- 请求参数透传
- 错误处理和日志记录
- 环境变量配置支持

## 开发环境配置

### 前置要求

- Node.js 16.13.0 或更高版本
- npm 或 yarn 包管理器
- Cloudflare 账号

### 安装依赖

```sh
npm install
```

### 环境变量设置

在 `.dev.vars` 文件中配置以下环境变量:

```sh
DANDAN_APP_ID=your_app_id
DANDAN_APP_SECRET=your_app_secret
```

## 开发调试

启动本地开发服务器:

```sh
npm run start
```

服务将在 http://localhost:8787 启动

## 部署

部署到 Cloudflare Workers:

```sh
npm run deploy
```

## 测试

运行单元测试:

```sh
npm test
```

## API 文档

### 请求格式

所有 API 请求都会被转发到 `https://api.dandanplay.net`，同时:

- 自动添加签名验证所需的请求头
- 透传原始请求参数
- 保持原始请求方法(GET/POST)

### 响应格式

```json
{
  "success": true,
  "data": {}
}
```

### 错误响应

```json
{
  "success": false, 
  "error": "错误信息",
  "timestamp": "2024-01-26T12:00:00Z"
}
```

## 许可证

MIT