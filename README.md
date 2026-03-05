# HamR 技术文档站 (docs.hamr.top)

> HamR 技术知识中心 - API 参考、架构文档、开发指南

[![Status](https://img.shields.io/badge/status-开发中-yellow)](https://github.com/hamr-hub/hamr-docs)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Framework](https://img.shields.io/badge/framework-Vite+React-61dafb)](https://vitejs.dev)

## 📋 项目概述

**项目编号**: PROJ-007  
**域名**: docs.hamr.top  
**优先级**: ⭐⭐⭐ 高  
**状态**: 待开发

HamR 技术文档站面向开发者，提供完整的 API 参考、系统架构、开发指南和配置参考。

## 🎯 核心内容

### 1. API 参考文档
- **认证 API**: 注册/登录/OAuth2/JWT
- **核心五维 API**: 人/时/事/物/境数据管理
- **决策 API**: JiaBu 智能决策接口
- **通用规范**: 分页/排序/过滤/错误码

### 2. 架构文档
- **系统架构图**: 微服务架构设计
- **五维数据模型**: ER 图与表结构
- **安全架构**: 认证/授权/加密方案
- **技术选型**: 技术栈说明与权衡

### 3. 开发指南
- **JavaScript SDK**: 快速上手 + 最佳实践 + 代码示例
- **Python SDK**: 安装配置 + API 调用 + 示例代码
- **Go SDK**: 包管理 + 使用方法 + 完整示例

### 4. 配置参考
- **环境变量**: 完整配置清单
- **部署选项**: Docker/Kubernetes 配置
- **性能优化**: 缓存/数据库/网络优化

### 5. 多版本管理
- 支持多版本文档切换
- 版本迁移指南
- API 变更历史

## 🛠️ 技术栈

| 技术 | 用途 | 备注 |
|-----|------|------|
| **Vite** | 构建工具 | 快速开发 |
| **React 18** | 前端框架 | TypeScript |
| **Tailwind CSS** | 样式框架 | 响应式 |
| **Shiki** | 代码高亮 | 多语言支持 |
| **Algolia** | 搜索引擎 | 文档搜索 |
| **Vercel** | 部署托管 | 零成本 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build
```

## 📦 项目结构

```
hamr-docs/
├── src/
│   ├── content/              # Markdown 文档
│   │   ├── api/              # API 参考
│   │   ├── architecture/     # 架构文档
│   │   ├── guides/           # 开发指南
│   │   └── config/           # 配置参考
│   ├── components/
│   │   ├── Sidebar.tsx       # 侧边导航
│   │   ├── CodeBlock.tsx     # 代码块
│   │   └── ApiEndpoint.tsx   # API 端点
│   └── App.tsx
└── package.json
```

## 📊 里程碑

- [ ] **2026-03-20**: 文档框架搭建
- [ ] **2026-04-05**: API 文档编写
- [ ] **2026-04-12**: 部署文档编写
- [ ] **2026-04-15**: 测试上线

## 🔗 相关链接

- [开发者门户](https://hamr.top) - 技术社区
- [API 服务](https://api.hamr.top) - 统一网关
- [部署指南](https://deploy.hamr.top) - 私有部署

## 📄 许可证

MIT License

---

**最后更新**: 2026-03-05  
**部署环境**: https://docs.hamr.top (即将上线)
