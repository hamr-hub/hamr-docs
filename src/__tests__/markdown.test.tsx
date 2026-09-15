import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Markdown from '../components/Markdown';
// 真实使用 ?raw 导入的 Markdown 内容 —— 等价于页面中的 src/content/*.md。
import installationSource from '../content/installation.md?raw';
import securitySource from '../content/security-architecture.md?raw';

/**
 * Round-4 真实 Markdown 内容管线测试。
 * 验证 <Markdown /> 能正确解析并渲染 GFM 表格、列表、代码块与引用。
 */
describe('Markdown 内容管线', () => {
  it('使用 data-testid 暴露挂载点，便于集成测试定位', () => {
    const { container } = render(<Markdown source="# Hello" />);
    expect(container.querySelector('[data-testid="markdown-content"]')).not.toBeNull();
  });

  it('渲染标题、列表、段落等基础块级元素', () => {
    const source = `# Title

Paragraph with **bold** and *italic*.

- item 1
- item 2
`;
    render(<Markdown source={source} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText(/item 1/)).toBeInTheDocument();
    expect(screen.getByText(/bold/)).toBeInTheDocument();
  });

  it('启用 remark-gfm 后能解析 GFM 表格', () => {
    const source = `| 列1 | 列2 |
| --- | --- |
| A   | B   |
`;
    const { container } = render(<Markdown source={source} />);
    expect(container.querySelector('table')).not.toBeNull();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('渲染围栏代码块（pre > code）', () => {
    const source = '```bash\nnpm install @hamr/core\n```';
    const { container } = render(<Markdown source={source} />);
    expect(container.querySelector('pre code')).not.toBeNull();
    expect(container.textContent).toContain('npm install @hamr/core');
  });

  it('渲染 blockquote 引用块', () => {
    const source = '> 安全提示：不要把 API Key 提交到仓库。';
    const { container } = render(<Markdown source={source} />);
    expect(container.querySelector('blockquote')).not.toBeNull();
    expect(container.textContent).toContain('安全提示');
  });

  it('接受外部 className 追加样式', () => {
    const { container } = render(<Markdown source="x" className="custom-class" />);
    const root = container.querySelector('[data-testid="markdown-content"]');
    expect(root?.className).toContain('custom-class');
    expect(root?.className).toContain('markdown-body');
  });

  it('Installation .md 至少 200 字符，包含 3 个章节标题', () => {
    expect(installationSource.length).toBeGreaterThan(200);
    const h2Count = (installationSource.match(/^## /gm) ?? []).length;
    expect(h2Count).toBeGreaterThanOrEqual(3);
  });

  it('SecurityArchitecture .md 包含权限模型表格 + 安全报告段', () => {
    expect(securitySource).toContain('权限模型');
    expect(securitySource).toContain('安全报告');
    expect(securitySource).toContain('| 角色 |');
  });

  // 这是整树集成渲染：动态 import AppRoutes 会首次拉起全部页面 +
  // framer-motion + react-markdown 依赖图，在冷缓存 / 受限 CI 上纯模块
  // 转换与 happy-dom 建环境就要 5~8s（与渲染逻辑无关，紧随其后的
  // SecurityArchitecture 用例走热缓存只要几毫秒）。给这两个整树用例
  // 显式放宽到 20s，避免把环境 CPU 抖动误报成失败；快速单测仍用默认 5s。
  it(
    'Installation 页面渲染时正文中至少出现 1 个 H2',
    async () => {
      const { default: AppRoutes } = await import('../AppRoutes');
      const { MemoryRouter } = await import('react-router-dom');
      const { container } = render(
        <MemoryRouter initialEntries={['/getting-started/installation']}>
          <AppRoutes />
        </MemoryRouter>
      );
      // 通过 data-testid 找到 markdown body 后断言其内含 H2
      const md = container.querySelector('[data-testid="markdown-content"]');
      expect(md).not.toBeNull();
      expect(md?.querySelectorAll('h2').length).toBeGreaterThanOrEqual(1);
    },
    20_000,
  );

  it(
    'SecurityArchitecture 页面渲染时正文内含「RBAC」关键词',
    async () => {
      const { default: AppRoutes } = await import('../AppRoutes');
      const { MemoryRouter } = await import('react-router-dom');
      const { container } = render(
        <MemoryRouter initialEntries={['/architecture/security']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const md = container.querySelector('[data-testid="markdown-content"]');
      expect(md).not.toBeNull();
      expect(md?.textContent).toContain('RBAC');
    },
    20_000,
  );
});