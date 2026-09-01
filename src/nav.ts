// 集中管理 Sidebar 导航配置 + 路由命中信息。
// 测试可以直接从这里读取所有 Sidebar 链接并验证是否都有真实路由或 ComingSoon 占位。

export type RouteKind = 'real' | 'coming-soon';

export interface SidebarItem {
  label: string;
  path: string;
  kind: RouteKind;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// 8 个 Round-3 之前会 404 的 Sidebar 链接（dead links）全部映射到占位或 SDK 路由
export const sidebarSections: SidebarSection[] = [
  {
    title: '快速开始',
    items: [
      { label: '介绍', path: '/', kind: 'real' },
      { label: '安装配置', path: '/getting-started/installation', kind: 'real' },
      { label: '快速上手', path: '/getting-started/quickstart', kind: 'real' },
      { label: '核心概念', path: '/concepts', kind: 'coming-soon' },
    ],
  },
  {
    title: 'API 参考',
    items: [
      { label: 'API 概览', path: '/api/overview', kind: 'real' },
      { label: '认证', path: '/api/authentication', kind: 'real' },
      { label: 'Chat API', path: '/chat', kind: 'coming-soon' },
      { label: 'Devices API', path: '/devices', kind: 'coming-soon' },
      { label: 'Automation API', path: '/automation', kind: 'coming-soon' },
      { label: '错误处理', path: '/api/errors', kind: 'real' },
    ],
  },
  {
    title: '架构文档',
    items: [
      { label: '系统架构', path: '/architecture/system', kind: 'real' },
      { label: '数据模型', path: '/data-model', kind: 'coming-soon' },
      { label: '安全架构', path: '/architecture/security', kind: 'real' },
    ],
  },
  {
    title: 'SDK 指南',
    items: [
      { label: 'TypeScript', path: '/sdks/typescript', kind: 'coming-soon' },
      { label: 'Rust', path: '/sdks/rust', kind: 'coming-soon' },
      { label: 'Python', path: '/sdks/python', kind: 'coming-soon' },
    ],
  },
];

export const sidebarPaths: string[] = sidebarSections.flatMap((s) =>
  s.items.map((i) => i.path)
);