import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Copy, CheckCircle } from 'lucide-react';

export default function APIOverview() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/chat',
      description: '与智能助理对话',
      category: 'Chat API',
    },
    {
      method: 'GET',
      path: '/v1/devices',
      description: '获取设备列表',
      category: 'Devices API',
    },
    {
      method: 'POST',
      path: '/v1/devices/:id/control',
      description: '控制设备',
      category: 'Devices API',
    },
    {
      method: 'POST',
      path: '/v1/automations',
      description: '创建自动化规则',
      category: 'Automation API',
    },
    {
      method: 'GET',
      path: '/v1/automations',
      description: '获取自动化规则列表',
      category: 'Automation API',
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const exampleRequest = `POST https://api.hamr.store/v1/chat
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "message": "帮我打开客厅的灯",
  "context": {
    "room": "living_room",
    "user_id": "user_123"
  }
}`;

  const exampleResponse = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "text": "好的,已为您打开客厅的灯",
  "actions": [
    {
      "type": "device_control",
      "device_id": "light_001",
      "action": "turn_on"
    }
  ],
  "context": {
    "room": "living_room"
  }
}`;

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API 概览</h1>
        <p className="text-lg text-gray-600 mb-8">
          HamR 提供完整的 RESTful API，支持智能对话、设备控制和自动化规则管理。
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">基础信息</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">API 端点</h3>
              <code className="block bg-gray-100 px-4 py-2 rounded text-primary-600">
                https://api.hamr.store/v1
              </code>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">认证方式</h3>
              <code className="block bg-gray-100 px-4 py-2 rounded text-primary-600">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">内容类型</h3>
              <code className="block bg-gray-100 px-4 py-2 rounded text-primary-600">
                Content-Type: application/json
              </code>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">可用端点</h2>
          <div className="space-y-3">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        endpoint.method === 'GET'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-gray-900">
                      {endpoint.path}
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(endpoint.path)}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {copiedEndpoint === endpoint.path ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">{endpoint.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请求示例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>请求</span>
              </h3>
              <div className="code-block">
                <pre className="text-xs leading-relaxed">{exampleRequest}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>响应</span>
              </h3>
              <div className="code-block">
                <pre className="text-xs leading-relaxed">{exampleResponse}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">深入了解</h3>
          <div className="space-y-2">
            <a
              href="/api/authentication"
              className="block text-blue-700 hover:underline"
            >
              → 认证机制详解
            </a>
            <a href="/api/chat" className="block text-blue-700 hover:underline">
              → Chat API 完整文档
            </a>
            <a href="/api/devices" className="block text-blue-700 hover:underline">
              → Devices API 完整文档
            </a>
            <a href="/api/errors" className="block text-blue-700 hover:underline">
              → 错误处理和状态码
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
