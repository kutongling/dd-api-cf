# 弹弹play API 代理服务 (Cloudflare Workers版)

基于 Cloudflare Workers 构建的弹弹play API代理服务。

## ⭐ 主要特性

- 支持 DanDanPlay API 的签名验证
- 自动处理 CORS 跨域请求
- 透明的请求参数转发
- 完整的错误处理机制

## 🚀 快速开始

### 环境要求

- Node.js >= 16.13.0
- Cloudflare 账号

### 安装

```bash
npm install
```

### 配置

创建 `.dev.vars` 文件：
```env
DANDAN_APP_ID=your_app_id
DANDAN_APP_SECRET=your_app_secret
```

### 开发

```bash
npm run start
```

### 部署

```bash
npm run deploy
```

## 📝 API说明

所有请求将被转发至 `https://api.dandanplay.net`

### 标准响应格式

```json
{
    "success": true,
    "data": {}
}
```

## 📄 许可证

MIT License

## 🔗 相关项目

- [Emby弹幕插件](https://github.com/kutongling/dd-danmaku)
- [弹弹play](https://www.dandanplay.com/)

## 💖 致谢

感谢 弹弹play 提供的API服务。
