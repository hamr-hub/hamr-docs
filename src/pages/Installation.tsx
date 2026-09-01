import { motion } from 'framer-motion';
import Markdown from '../components/Markdown';
// Vite `?raw` 把 .md 文件以纯文本形式打包进 bundle，
// 既省一次网络请求、也让构建期就能发现内容错误。
import installationSource from '../content/installation.md?raw';

/**
 * 安装配置页 —— Round-4 起正文改由 Markdown 内容管线渲染。
 * 外层 framer-motion 包装保留，标题 + 简介保留为 JSX 以保证视觉一致性。
 */
export default function Installation() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安装配置</h1>
          <p className="text-lg text-gray-600">
            安装 HamR SDK 并完成基础配置，为开发做好准备。
          </p>
        </header>

        <Markdown source={installationSource} />
      </motion.div>
    </div>
  );
}