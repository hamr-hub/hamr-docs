import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// vitest 配置（与 vite build 解耦，避免 TS 类型冲突）
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
  },
});