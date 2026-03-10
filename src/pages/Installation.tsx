import { motion } from 'framer-motion';

export default function Installation() {
  const requirements = [
    { name: 'Node.js', version: '>= 18.0.0', note: 'LTS 版本推荐' },
    { name: 'npm / yarn / pnpm', version: 'latest', note: '包管理器' },
    { name: 'TypeScript', version: '>= 5.0', note: '可选但推荐' },
  ];

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">安装配置</h1>
        <p className="text-lg text-gray-600 mb-8">
          安装 HamR SDK 并完成基础配置，为开发做好准备。
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">环境要求</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">依赖</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">版本</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requirements.map((req) => (
                  <tr key={req.name}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.name}</td>
                    <td className="px-6 py-4 text-sm text-primary-600 font-mono">{req.version}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">安装 SDK</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">npm</h3>
              <div className="code-block"><pre className="text-sm">npm install @hamr/core</pre></div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">yarn</h3>
              <div className="code-block"><pre className="text-sm">yarn add @hamr/core</pre></div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">pnpm</h3>
              <div className="code-block"><pre className="text-sm">pnpm add @hamr/core</pre></div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">配置 API Key</h2>
          <p className="text-gray-600 mb-4">
            在开发者控制台创建应用后，将 API Key 存储为环境变量：
          </p>
          <div className="code-block mb-4">
            <pre className="text-sm">{`# .env
HAMR_API_KEY=your_api_key_here
HAMR_API_ENDPOINT=https://api.hamr.store/v1`}</pre>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>安全提示：</strong>不要将 API Key 提交到代码仓库。请将 <code>.env</code> 添加到 <code>.gitignore</code> 中。
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">验证安装</h2>
          <div className="code-block">
            <pre className="text-sm">{`import { HamRClient } from '@hamr/core';

const client = new HamRClient({
  apiKey: process.env.HAMR_API_KEY,
});

const status = await client.ping();
console.log('连接状态:', status);
// 输出: 连接状态: { ok: true, latency: 42 }`}</pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">下一步</h3>
          <a href="/getting-started/quickstart" className="text-primary-600 hover:underline">
            → 快速上手指南
          </a>
        </div>
      </motion.div>
    </div>
  );
}
