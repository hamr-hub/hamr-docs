import { motion } from 'framer-motion';
import Markdown from '../components/Markdown';
import securitySource from '../content/security-architecture.md?raw';

/**
 * 安全架构页 —— Round-4 起正文改由 Markdown 内容管线渲染。
 * 保留标题与简介的 JSX 包装，正文使用 <Markdown /> 渲染。
 */
export default function SecurityArchitecture() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安全架构</h1>
          <p className="text-lg text-gray-600">
            HamR 以隐私优先为核心设计原则，采用多层安全防护确保家庭数据安全。
          </p>
        </header>

        <Markdown source={securitySource} />
      </motion.div>
    </div>
  );
}