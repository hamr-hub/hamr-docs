import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Code2, Shield, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: '快速上手',
      description: '3 步完成集成，10 分钟开始构建智能家居应用',
      link: '/getting-started/quickstart',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'API 参考',
      description: '完整的 RESTful API 文档，支持多语言 SDK',
      link: '/api/overview',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '安全架构',
      description: '端到端加密，隐私优先，符合 GDPR 标准',
      link: '/architecture/security',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '最佳实践',
      description: '生产级代码示例和性能优化指南',
      link: '/sdk/typescript',
    },
  ];

  const codeExample = `// 安装 HamR SDK
npm install @hamr/core

// 初始化客户端
import { HamRClient } from '@hamr/core';

const client = new HamRClient({
  apiKey: process.env.HAMR_API_KEY,
  endpoint: 'https://api.hamr.store/v1',
});

// 发送对话请求
const response = await client.chat({
  message: '帮我打开客厅的灯',
  context: { room: 'living_room' }
});

console.log(response.text);
// "好的,已为您打开客厅的灯"`;

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">HamR 技术文档</h1>
        <p className="text-xl text-gray-600 mb-8">
          欢迎来到 HamR 开发者文档中心。这里包含完整的 API 参考、架构设计、开发指南和最佳实践。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={feature.link}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div className="text-primary-600 mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">快速开始</h2>
          <div className="code-block">
            <pre className="text-sm leading-relaxed">{codeExample}</pre>
          </div>
          <div className="mt-4 flex space-x-4">
            <Link to="/getting-started/installation" className="btn-primary">
              安装配置
            </Link>
            <Link to="/api/overview" className="btn-secondary">
              查看 API 文档
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📚 文档导航</h3>
          <ul className="space-y-2 text-blue-800">
            <li>
              <Link to="/getting-started/quickstart" className="hover:underline">
                → 快速上手指南
              </Link>
            </li>
            <li>
              <Link to="/api/overview" className="hover:underline">
                → API 参考文档
              </Link>
            </li>
            <li>
              <Link to="/architecture/system" className="hover:underline">
                → 系统架构设计
              </Link>
            </li>
            <li>
              <Link to="/sdk/typescript" className="hover:underline">
                → SDK 使用指南
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
