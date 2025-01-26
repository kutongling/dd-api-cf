# Cloudflare Pages App

这是一个可以部署到Cloudflare Pages的Node.js项目。

## 项目结构

- `functions/api/[[route]].js`: 处理动态API路由的文件。
- `public/index.html`: 主要的HTML文件，提供用户界面。
- `src/index.js`: 应用程序的入口点，初始化应用程序。
- `src/utils/helpers.js`: 导出实用函数的文件，用于常见任务。
- `package.json`: npm的配置文件，列出依赖项和脚本。
- `wrangler.toml`: Cloudflare Workers的配置文件。

## 安装

1. 克隆此仓库：
   ```bash
   git clone <repository-url>
   ```
2. 进入项目目录：
   ```bash
   cd cloudflare-pages-app
   ```
3. 安装依赖：
   ```bash
   npm install
   ```

## 使用

在本地开发时，可以使用以下命令启动应用程序：
```bash
npm start
```

## 部署

使用以下命令将应用程序部署到Cloudflare Pages：
```bash
wrangler publish
```

## 许可证

此项目采用MIT许可证。