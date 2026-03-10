import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Authentication() {
  const [copied, setCopied] = useState(false);

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">认证</h1>
        <p className="text-lg text-gray-600 mb-8">
          所有 API 请求都需要通过 Bearer Token 进行身份认证。
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">获取 API Key</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>访问 <a href="https://hamr.top" className="text-primary-600 hover:underline">开发者门户</a> 注册开发者账号</li>
            <li>在控制台创建新应用</li>
            <li>生成 API Key（每个应用最多 5 个 Key）</li>
            <li>将 API Key 安全存储在环境变量中</li>
          </ol>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请求认证</h2>
          <p className="text-gray-600 mb-4">
            在每个 HTTP 请求的 Header 中携带 API Key：
          </p>
          <div className="relative">
            <div className="code-block">
              <pre className="text-sm">{`Authorization: Bearer YOUR_API_KEY`}</pre>
            </div>
            <button
              onClick={() => copyCode('Authorization: Bearer YOUR_API_KEY')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">完整请求示例</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">cURL</h3>
              <div className="code-block">
                <pre className="text-sm">{`curl -X POST https://api.hamr.store/v1/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"message": "你好"}'`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">JavaScript</h3>
              <div className="code-block">
                <pre className="text-sm">{`const response = await fetch('https://api.hamr.store/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.HAMR_API_KEY}\`,
  },
  body: JSON.stringify({ message: '你好' }),
});`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">频率限制</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">计划</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">请求/分钟</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">请求/天</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">免费版</td>
                  <td className="px-6 py-4 text-sm text-gray-600">60</td>
                  <td className="px-6 py-4 text-sm text-gray-600">1,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">开发者版</td>
                  <td className="px-6 py-4 text-sm text-gray-600">300</td>
                  <td className="px-6 py-4 text-sm text-gray-600">10,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">企业版</td>
                  <td className="px-6 py-4 text-sm text-gray-600">无限制</td>
                  <td className="px-6 py-4 text-sm text-gray-600">无限制</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            超出限制时返回 HTTP 429，响应头中包含 <code>Retry-After</code> 字段。
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">安全最佳实践</h3>
          <ul className="space-y-2 text-red-800 text-sm">
            <li>- 使用环境变量存储 API Key，不要硬编码</li>
            <li>- 不要在客户端（浏览器）代码中暴露 API Key</li>
            <li>- 定期轮换 API Key</li>
            <li>- 为不同环境使用不同的 API Key</li>
            <li>- 发现泄露立即在控制台中吊销</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
