import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Code, Terminal } from 'lucide-react';

export default function QuickStart() {
  const steps = [
    {
      title: '1. 安装 SDK',
      code: 'npm install @hamr/core',
      description: '使用 npm 或 yarn 安装 HamR SDK',
    },
    {
      title: '2. 获取 API Key',
      code: 'export HAMR_API_KEY=your_api_key_here',
      description: '在开发者控制台创建应用并获取 API Key',
    },
    {
      title: '3. 初始化客户端',
      code: `import { HamRClient } from '@hamr/core';

const client = new HamRClient({
  apiKey: process.env.HAMR_API_KEY,
});`,
      description: '使用 API Key 初始化 HamR 客户端',
    },
    {
      title: '4. 发送第一个请求',
      code: `const response = await client.chat({
  message: '帮我打开客厅的灯',
  context: { room: 'living_room' }
});

console.log(response.text);`,
      description: '调用 Chat API 与智能助理对话',
    },
  ];

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">快速上手</h1>
        <p className="text-lg text-gray-600 mb-8">
          只需 4 步，10 分钟完成 HamR SDK 集成，开始构建智能家居应用。
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="code-block">
                    <pre className="text-sm">{step.code}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">最佳实践</h3>
            </div>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• 使用环境变量存储 API Key</li>
              <li>• 启用错误处理和重试机制</li>
              <li>• 使用 TypeScript 获得类型安全</li>
              <li>• 参考示例代码快速上手</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-900">注意事项</h3>
            </div>
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li>• 不要在客户端代码中硬编码 API Key</li>
              <li>• 生产环境使用 HTTPS 端点</li>
              <li>• 遵循 API 调用频率限制</li>
              <li>• 定期更新 SDK 到最新版本</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">下一步</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/api/overview"
              className="flex items-center space-x-2 text-primary-600 hover:underline"
            >
              <Code className="w-5 h-5" />
              <span>查看完整 API 文档</span>
            </a>
            <a
              href="/sdk/typescript"
              className="flex items-center space-x-2 text-primary-600 hover:underline"
            >
              <Terminal className="w-5 h-5" />
              <span>深入了解 SDK 功能</span>
            </a>
            <a
              href="https://github.com/hamr-hub/hamr-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-600 hover:underline"
            >
              <Code className="w-5 h-5" />
              <span>浏览示例项目</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
