
# 🌿 CalorieSense AI - 本地开发指南

由于项目使用了 React 和 TypeScript (.tsx)，传统的静态服务器（如 `http-server`）无法运行它。请按照以下专业步骤操作：

## 🚀 1. 快速启动 (推荐)

1. **安装依赖**:
   在文件夹内打开终端，运行：
   ```bash
   npm install
   ```

2. **设置 API 密钥**:
   - Windows (PowerShell): `$env:API_KEY="你的密钥"`
   - Mac/Linux: `export API_KEY="你的密钥"`

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```
   终端会输出一个地址（通常是 `http://localhost:5173`），在浏览器打开即可。

---

## 🛠️ 2. 为什么之前的 `http-server` 不行？
- **浏览器限制**: 浏览器看不懂 `.tsx` 文件。Vite 会在后台实时将 TypeScript 转换为 JavaScript。
- **模块支持**: Vite 提供完善的 ESM 模块解析支持，确保 React 能够正确加载。

## 📱 3. 手机预览
确保手机和电脑在**同一个 Wi-Fi** 下：
1. 运行 `npm run dev -- --host`。
2. 终端会显示一个局域网 IP（如 `192.168.x.x`）。
3. 用手机浏览器扫码或输入该地址即可体验。

## 📦 4. 生产环境打包
当你准备好部署时：
```bash
npm run build
```
这会生成一个 `dist` 文件夹，里面是压缩后的标准代码，可以上传到任何服务器。
