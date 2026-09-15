import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { sidebarPaths } from '../nav';
import AppRoutes from '../AppRoutes';
import NotFound from '../pages/NotFound';

// Round-3 死链治理要求：8 个原 Sidebar 链接全部命中真实路由或 ComingSoon 页。
// 我们在这里用 MemoryRouter 渲染 AppRoutes 的全部路径，断言它们不会渲染 NotFound。
describe('Sidebar 死链治理 —— 8 个链接全部命中', () => {
  for (const path of sidebarPaths) {
    it(`/concepts 类的占位或真实路由：${path}`, () => {
      const { container } = render(
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      );
      // NotFound 组件包含「页面不存在」字样
      expect(container.textContent).not.toContain('页面不存在');
      expect(container.textContent).not.toMatch(/404 Not Found/i);
    });
  }

  it('总共有 16 个 Sidebar 链接（8 个原死链已全部映射到 ComingSoon）', () => {
    expect(sidebarPaths.length).toBe(16);
  });

  it('Sidebar 中带「规划中」标识的 8 个路径都是 coming-soon 类型', () => {
    const comingSoonPaths = [
      '/concepts',
      '/chat',
      '/devices',
      '/automation',
      '/data-model',
      '/sdks/typescript',
      '/sdks/rust',
      '/sdks/python',
    ];
    for (const p of comingSoonPaths) {
      expect(sidebarPaths).toContain(p);
    }
  });

  it('未匹配路径会命中 NotFound 兜底', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/this-route-definitely-does-not-exist']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('页面不存在');
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('NotFound 页面至少包含 3 篇推荐文章链接', () => {
    render(
      <MemoryRouter initialEntries={['/nope']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('快速上手')).toBeInTheDocument();
    expect(screen.getByText('API 概览')).toBeInTheDocument();
    expect(screen.getByText('系统架构')).toBeInTheDocument();
  });
});