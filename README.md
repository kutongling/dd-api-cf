# 弹弹play API 代理服务

为 Emby弹幕插件 提供的弹弹play API 代理服务，用于解决跨域请求问题。

## ✨ 特性

-  处理弹弹play API的签名认证
-  支持Cloudflare Pages部署

## 🚀 快速开始

### Cloudflare Pages部署

1. 克隆仓库
```bash
git clone https://github.com/yourusername/ktl-dd.git
```

2. 安装依赖
```bash
npm install
```

3. 本地开发
```bash
npm run dev
```

4. 部署到Cloudflare Pages
```bash
npm run deploy
```

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/yourusername/ktl-dd.git

# 2. 安装依赖
npm install

# 3. 启动服务
npm run dev
```

## 📝 使用示例

```javascript
// 搜索动画
fetch('https://your-project.pages.dev/api/v2/search/episodes?anime=进击的巨人')
  .then(res => res.json())
  .then(console.log);
```

## ⚙️ 环境变量配置

```env
DANDAN_APP_ID=你的弹弹play AppID
DANDAN_APP_SECRET=你的弹弹play AppSecret
PORT=3000 # 本地开发端口
```

## 🔍 API响应格式

| 字段 | 类型 | 说明 |
|------|------|------|
| success | boolean | 请求是否成功 |
| errorCode | number | 错误代码，0表示成功 |
| errorMessage | string | 错误信息 |

### 常见错误码

- `401`: 认证失败
- `404`: 资源不存在
- `400`: 参数错误

## 📦 项目依赖

- `typescript`: TypeScript编译器
- `wrangler`: Cloudflare Workers CLI

## 🔧 技术要求

- Node.js >= 14
- npm 或 yarn

## 📄 许可证

MIT License

## 🔗 相关项目

- [Emby弹幕插件]()
- [弹弹play]()

## 💖 致谢

感谢 [弹弹play](https://www.dandanplay.com) 提供的API服务。
