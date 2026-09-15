import { motion } from 'framer-motion';
import { Home, Compass, FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recommendation {
  label: string;
  path: string;
  description: string;
}

const RECOMMENDED: Recommendation[] = [
  {
    label: '快速上手',
    path: '/getting-started/quickstart',
    description: '10 分钟集成 HamR SDK，发送第一条 Chat 请求',
  },
  {
    label: 'API 概览',
    path: '/api/overview',
    description: '查看 Chat / Devices / Automation 三大类 API 端点',
  },
  {
    label: '系统架构',
    path: '/architecture/system',
    description: '了解 HamR 微服务架构与五维数据模型设计',
  },
];

/**
 * 404 兜底页 —— 当路由未命中任何已知页面时渲染。
 * 同时推荐 3 篇现有热门文档，帮用户快速找到想看的内容。
 */
export default function NotFound() {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 text-amber-600 rounded-full">
            <FileQuestion className="w-6 h-6" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            404 Not Found
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">页面不存在</h1>
        <p className="text-lg text-gray-600 mb-8">
          你访问的链接已失效或文档尚未发布。下面是一些常用入口，可以从这里继续探索。
        </p>

        <h2 className="text-base font-semibold text-gray-900 mb-3">推荐阅读</h2>
        <div className="space-y-3 mb-8">
          {RECOMMENDED.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <Compass className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <Home className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </motion.div>
    </div>
  );
}