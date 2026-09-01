import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// Round-5 manualChunks 拆分：
//   - vendor-motion    : framer-motion (动画库，体积最大，独立加载利于缓存)
//   - vendor-router    : react-router-dom 及其 transitive 依赖
//   - vendor-markdown  : react-markdown + remark-gfm + micromark/unist/mdast 工具链
//   - 其余随默认 chunk 输出
//
// 拆分后 main bundle 仅包含 React/ReactDOM/lucide 与应用自身代码，
// 通过 size-limit CI gate 保证 main gzip 体积 ≤ 200 KB。
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          if (
            id.includes('node_modules/react-markdown') ||
            id.includes('node_modules/remark-') ||
            id.includes('node_modules/mdast-') ||
            id.includes('node_modules/unist-') ||
            id.includes('node_modules/micromark') ||
            id.includes('node_modules/hast-') ||
            id.includes('node_modules/property-information') ||
            id.includes('node_modules/space-separated-tokens') ||
            id.includes('node_modules/comma-separated-tokens') ||
            id.includes('node_modules/character-entities') ||
            id.includes('node_modules/decode-named-character-reference')
          ) {
            return 'vendor-markdown'
          }
          return undefined
        },
      },
    },
  },
})
