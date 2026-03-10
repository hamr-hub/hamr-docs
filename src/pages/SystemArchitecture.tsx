import { motion } from 'framer-motion';

export default function SystemArchitecture() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">系统架构</h1>
        <p className="text-lg text-gray-600 mb-8">
          HamR 采用微服务架构，围绕家庭"人时事物境"五维管理模型设计，所有数据加密存储，支持私有部署。
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">架构总览</h2>
          <div className="code-block">
            <pre className="text-sm leading-relaxed">{`┌────────────────────────────────────────────────────┐
│                    客户端层                          │
│  Web App (React)  │  Mobile App  │  CLI / SDK       │
└─────────┬─────────┴──────┬───────┴────────┬─────────┘
          │                │                │
┌─────────▼────────────────▼────────────────▼─────────┐
│                  API 网关 (Nginx)                     │
│              认证 / 限流 / 路由 / 日志                 │
└─────────┬────────────────┬────────────────┬─────────┘
          │                │                │
  ┌───────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
  │  HamR Core   │ │  JiaBu 引擎  │ │  账号服务     │
  │ 家庭管家服务  │ │  智能决策     │ │  认证/授权    │
  │ 五维数据管理  │ │  AI 推理      │ │  家庭管理     │
  └───────┬──────┘ └──────┬───────┘ └──────┬───────┘
          │                │                │
┌─────────▼────────────────▼────────────────▼─────────┐
│                    数据层                             │
│  PostgreSQL (主数据)  │  Redis (缓存)  │  MinIO (文件) │
└──────────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">核心服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'HamR Core',
                desc: '家庭管家核心服务，管理"人时事物境"五维数据，提供设备控制、自动化规则引擎。',
                tech: 'Rust + Actix-web',
              },
              {
                title: 'JiaBu 决策引擎',
                desc: '智能决策助手，基于家庭历史数据和 AI 模型，辅助家庭规划和决策。',
                tech: 'Rust + AI Runtime',
              },
              {
                title: '账号服务',
                desc: '统一身份认证、家庭成员管理、权限控制、OAuth2.0 第三方登录。',
                tech: 'Rust + JWT',
              },
              {
                title: 'API 网关',
                desc: '统一入口，负责认证、限流、路由分发、请求日志和监控。',
                tech: 'Nginx + Lua',
              },
            ].map((service) => (
              <div key={service.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{service.tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">五维数据模型</h2>
          <p className="text-gray-600 mb-4">
            HamR 独创的家庭管理模型，围绕五个核心维度组织家庭数据：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { dim: '人', desc: '家庭成员档案、角色、权限', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { dim: '时', desc: '日程、提醒、里程碑、纪念日', color: 'bg-green-50 border-green-200 text-green-800' },
              { dim: '事', desc: '任务、决策、项目、待办', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
              { dim: '物', desc: '设备、资产、消耗品、库存', color: 'bg-purple-50 border-purple-200 text-purple-800' },
              { dim: '境', desc: '空间、环境、场景、自动化', color: 'bg-orange-50 border-orange-200 text-orange-800' },
            ].map((item) => (
              <div key={item.dim} className={`border rounded-lg p-4 text-center ${item.color}`}>
                <div className="text-2xl font-bold mb-2">{item.dim}</div>
                <p className="text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">技术栈</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">层级</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">技术</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['后端服务', 'Rust (Actix-web / Axum)'],
                  ['前端应用', 'React + TypeScript + Vite'],
                  ['数据库', 'PostgreSQL 16'],
                  ['缓存', 'Redis 7'],
                  ['对象存储', 'MinIO (S3 兼容)'],
                  ['消息队列', 'NATS (按需)'],
                  ['容器化', 'Docker + Docker Compose'],
                  ['反向代理', 'Nginx'],
                  ['监控', 'Prometheus + Grafana'],
                  ['CI/CD', 'GitHub Actions'],
                ].map(([layer, tech]) => (
                  <tr key={layer}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{layer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">私有部署</h3>
          <p className="text-green-800 text-sm">
            HamR 支持完全私有部署，所有数据存储在用户自己的服务器上。
            参考 <a href="https://deploy.hamr.top" className="underline">部署指南</a> 了解详情。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
