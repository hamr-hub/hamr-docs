import { motion } from 'framer-motion';

export default function Errors() {
  const httpErrors = [
    { code: 400, name: 'Bad Request', description: '请求参数格式错误或缺少必要字段' },
    { code: 401, name: 'Unauthorized', description: 'API Key 缺失或无效' },
    { code: 403, name: 'Forbidden', description: '无权访问该资源' },
    { code: 404, name: 'Not Found', description: '请求的资源不存在' },
    { code: 409, name: 'Conflict', description: '资源冲突（如重复创建）' },
    { code: 422, name: 'Unprocessable Entity', description: '请求语义正确但无法处理' },
    { code: 429, name: 'Too Many Requests', description: '超出频率限制' },
    { code: 500, name: 'Internal Server Error', description: '服务器内部错误' },
    { code: 503, name: 'Service Unavailable', description: '服务暂时不可用（维护中）' },
  ];

  const businessErrors = [
    { code: 'DEVICE_OFFLINE', description: '设备离线，无法执行操作' },
    { code: 'DEVICE_NOT_FOUND', description: '指定的设备 ID 不存在' },
    { code: 'AUTOMATION_LIMIT', description: '自动化规则数量已达上限' },
    { code: 'INVALID_CONTEXT', description: '对话上下文格式无效' },
    { code: 'QUOTA_EXCEEDED', description: 'API 调用配额已耗尽' },
  ];

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">错误处理</h1>
        <p className="text-lg text-gray-600 mb-8">
          HamR API 使用标准 HTTP 状态码和结构化错误响应，方便客户端进行错误处理。
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">错误响应格式</h2>
          <div className="code-block">
            <pre className="text-sm">{`{
  "error": {
    "code": "DEVICE_OFFLINE",
    "message": "设备 light_001 当前离线，无法执行操作",
    "details": {
      "device_id": "light_001",
      "last_seen": "2026-03-10T08:30:00Z"
    },
    "request_id": "req_abc123"
  }
}`}</pre>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">HTTP 状态码</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">状态码</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">名称</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {httpErrors.map((err) => (
                  <tr key={err.code}>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-gray-900">
                      <span className={`px-2 py-1 rounded text-xs ${
                        err.code < 500 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {err.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{err.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{err.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">业务错误码</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">错误码</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {businessErrors.map((err) => (
                  <tr key={err.code}>
                    <td className="px-6 py-4 text-sm font-mono text-primary-600">{err.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{err.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">错误处理示例</h2>
          <div className="code-block">
            <pre className="text-sm">{`import { HamRClient, HamRError } from '@hamr/core';

const client = new HamRClient({ apiKey: process.env.HAMR_API_KEY });

try {
  const response = await client.devices.control('light_001', {
    action: 'turn_on',
  });
} catch (error) {
  if (error instanceof HamRError) {
    switch (error.code) {
      case 'DEVICE_OFFLINE':
        console.log('设备离线，请检查网络连接');
        break;
      case 'DEVICE_NOT_FOUND':
        console.log('设备不存在');
        break;
      default:
        console.log(\`API 错误: \${error.message}\`);
    }
    console.log('请求 ID:', error.requestId);
  }
}`}</pre>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">重试策略</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>- <strong>429</strong>: 等待 <code>Retry-After</code> 头部指定的秒数后重试</li>
            <li>- <strong>500/503</strong>: 使用指数退避策略重试（最多 3 次）</li>
            <li>- <strong>4xx</strong>: 客户端错误，修正请求后重试</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
