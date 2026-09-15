// vitest 测试环境初始化
// - 引入 @testing-library/jest-dom 提供的额外 expect 匹配器
// - 每个测试结束后自动清理 React 树，避免状态泄漏
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});