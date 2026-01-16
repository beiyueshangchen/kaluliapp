
# 🌿 CalorieSense AI - 运行指南



## 🚀 1. 最推荐的运行方式 (无需手动设置密钥)

我已经为你配置了 `.env` 文件支持。

1.  **检查文件**: 确保文件夹根目录下有一个名为 `.env` 的文件。
2.  **填写密钥**: 打开 `.env`，把你的密钥填在 `API_KEY=` 后面（我已经帮你填好了）。
3.  **启动**: 直接在终端运行：
    ```bash
    npm run dev
    ```
4.  **访问**: 打开浏览器输入 `http://localhost:5173`。

---

## 🛠️ 2. 如果你想在终端手动设置 (不同终端命令不同)

### 方案 A：针对你截图中的 CMD (黑窗口)
命令如下（注意是 `set`）：
```cmd
set API_KEY=AIzaSyC41J0aFPGYjrbpeQtIU4xraYoJIyGTiYY
npm run dev
```

### 方案 B：针对 PowerShell (蓝窗口)
命令如下：
```powershell
$env:API_KEY="AIzaSyC41J0aFPGYjrbpeQtIU4xraYoJIyGTiYY"
npm run dev
```

---

## 📂 常见问题
- **为什么还是打不开？**: 请确保你已经运行过 `npm install`。
- **手机如何访问？**: 运行 `npm run dev` 后，终端会显示一个 `Network: http://192.168.x.x:5173` 地址，手机连接同一个 Wi-Fi 访问这个 IP 即可。
- **API 报错**: 如果 AI 识别不出来，请检查你的 API Key 是否拥有权限（可以在 Google AI Studio 测试）。
