# 安装 SDK

HamR SDK 提供 npm、yarn、pnpm 三种安装方式，选择你最熟悉的包管理器即可。

## 环境要求

| 依赖 | 版本 | 备注 |
| ---- | ---- | ---- |
| Node.js | `>= 18.0.0` | LTS 版本推荐 |
| npm / yarn / pnpm | latest | 包管理器 |
| TypeScript | `>= 5.0` | 可选但推荐 |

> **小贴士**：使用 Node 20 LTS 可以获得最佳性能与最长维护窗口。

## 安装命令

### npm

```bash
npm install @hamr/core
```

### yarn

```bash
yarn add @hamr/core
```

### pnpm

```bash
pnpm add @hamr/core
```

## 配置 API Key

在开发者控制台创建应用后，将 API Key 存储为环境变量：

```bash
# .env
HAMR_API_KEY=your_api_key_here
HAMR_API_ENDPOINT=https://api.hamr.store/v1
```

> **安全提示**：不要将 API Key 提交到代码仓库。请将 `.env` 添加到 `.gitignore` 中。

## 验证安装

```ts
import { HamRClient } from '@hamr/core';

const client = new HamRClient({
  apiKey: process.env.HAMR_API_KEY,
});

const status = await client.ping();
console.log('连接状态:', status);
// 输出: 连接状态: { ok: true, latency: 42 }
```

## 下一步

- 阅读 [快速上手](/getting-started/quickstart) 完成第一次 Chat 调用。
- 查看 [API 概览](/api/overview) 了解全部端点。
- 浏览 [系统架构](/architecture/system) 理解 HamR 的整体设计。