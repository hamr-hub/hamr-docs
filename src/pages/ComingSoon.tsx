import { motion } from 'framer-motion';
import { Clock, Mail } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

/**
 * 占位页 —— 用于「暂未发布」的 Sidebar 路由。
 * 显示规划中文案 + 邮件订阅 CTA，引导读者通过邮件订阅上线通知。
 */
export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-full">
            <Clock className="w-6 h-6" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            规划中
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

        <p className="text-lg text-gray-600 mb-6">
          {description ??
            '本节文档正在编写中，欢迎订阅通知，我们将在文档发布时第一时间邮件告知。'}
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">预期上线内容</h2>
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li>完整的接口说明与请求 / 响应示例</li>
            <li>多语言 SDK 调用片段（TypeScript / Rust / Python）</li>
            <li>错误码列表与最佳实践建议</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href="mailto:docs@hamr.store?subject=%E8%AE%A2%E9%98%85%20HamR%20%E6%96%87%E6%A1%A3%E9%80%9A%E7%9F%A5"
            className="btn-primary inline-flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>订阅上线通知</span>
          </a>
          <a href="/" className="btn-secondary inline-flex items-center justify-center">
            返回首页
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          订阅邮箱：<a href="mailto:docs@hamr.store" className="hover:underline">docs@hamr.store</a>
        </p>
      </motion.div>
    </div>
  );
}