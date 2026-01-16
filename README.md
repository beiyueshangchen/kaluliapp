# 🌿 CalorieSense AI - 部署指南

CalorieSense 是一款结合了 **Google Gemini AI** 视觉识别与 **自然美学设计** 的智能饮食追踪应用。它能够通过摄像头识别食物，自动计算热量与营养成分，并提供基于位置的健康餐厅搜索。

---

## 🛠️ 1. 开发环境准备

在开始之前，请确保你的电脑已安装以下工具：
- **Node.js** (推荐 v18 或更高版本)
- **VS Code** (推荐的编辑器)
- **Google Gemini API Key**: 
  - 访问 [Google AI Studio](https://aistudio.google.com/) 获取。
  - 本项目需要有效的 `API_KEY` 才能运行 AI 识别和搜索功能。

---

## 🚀 2. 本地运行步骤

由于本项目采用了现代化的 **ES6 Modules** 和 **Tailwind CSS**，你可以直接通过静态服务器运行，也可以集成到现有的构建流程中。

### 方法 A：使用本地静态服务器 (最快)
1. 将所有文件下载到你的电脑文件夹中。
2. 在该文件夹内打开终端（Terminal），运行：
   ```bash
   # 使用 npx 直接运行 http-server (无需安装)
   npx http-server .
   ```
3. **设置环境变量**:
   在电脑的终端环境设置中临时设置 API Key（或直接在 `services/gemini.ts` 中暂时硬编码测试，但**严禁提交**）：
   - Windows (PowerShell): `$env:API_KEY="你的密钥"`
   - Mac/Linux: `export API_KEY="你的密钥"`

### 方法 B：使用 VS Code 插件
1. 安装 **Live Server** 插件。
2. 右键点击 `index.html`，选择 **Open with Live Server**。

---

## 🌐 3. 部署到互联网

如果你想让别人通过网址访问你的 App，可以使用以下免费平台：

### 方案 1：Vercel (推荐)
1. 将代码上传到 [GitHub](https://github.com/) 仓库。
2. 登录 [Vercel](https://vercel.com/)，选择 **Import Project**。
3. **关键步骤**: 在 Vercel 的项目设置中，找到 **Environment Variables**，添加：
   - Key: `API_KEY`
   - Value: `你的 Google Gemini API 密钥`
4. 点击 **Deploy**。

### 方案 2：GitHub Pages
1. 在 GitHub 仓库设置中开启 Pages 功能。
2. 注意：由于 GitHub Pages 不支持直接读取服务端环境变量，你需要使用 GitHub Actions 在构建时注入，或者使用更安全的后端代理。

---

## 📱 4. 打包为 App

### 桌面端 App (Windows/Mac)
你可以使用 **PWA (Progressive Web App)** 技术，无需打包即可安装：
1. 在电脑浏览器（Chrome 或 Edge）中打开部署后的网址。
2. 点击地址栏右侧的 **“安装”图标** 或菜单中的 **“安装 CalorieSense”**。
3. 应用将作为一个独立的窗口出现在你的任务栏或桌面上。

### 手机端 App (Android/iOS)
本项目已经配置了 `manifest.json` 和 `sw.js`：
1. **安装版 PWA**: 在手机 Safari (iOS) 点击“分享”->“添加到主屏幕”；或在 Chrome (Android) 点击“安装应用”。
2. **原生打包 (Capacitor)**:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init CalorieSense com.example.app --web-dir .
   npx cap add android  # 打包安卓 APK
   npx cap add ios      # 打包 iOS App
   ```

---

## 📂 项目结构
- `index.html`: 入口文件，包含 PWA 配置和 Tailwind 注入。
- `App.tsx`: 应用主逻辑与路由控制。
- `screens/`: 各个功能页面（仪表盘、相机、统计、个人中心、探索）。
- `services/gemini.ts`: AI 核心服务，负责与 Google Gemini API 通信。
- `i18n.ts`: 多语言（中/英）翻译配置文件。
- `manifest.json`: PWA 配置文件，定义了 App 的图标和启动行为。

---

## ⚠️ 注意事项
1. **API 安全**: 请勿将 `API_KEY` 直接写在代码中并上传到公共仓库。
2. **摄像头权限**: 本应用需要摄像头权限。在本地开发时，请确保使用 `localhost` 或 `https` 协议，否则浏览器会禁用摄像头。
3. **离线支持**: 由于集成了 Service Worker (`sw.js`)，应用在断网状态下仍能打开已缓存的页面。

---
*Powered by Google Gemini 2.5/3.0 & React*
