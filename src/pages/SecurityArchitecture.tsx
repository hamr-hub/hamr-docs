import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Key } from 'lucide-react';

export default function SecurityArchitecture() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">安全架构</h1>
        <p className="text-lg text-gray-600 mb-8">
          HamR 以隐私优先为核心设计原则，采用多层安全防护确保家庭数据安全。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: <Shield className="w-8 h-8" />, title: '端到端加密', desc: '所有通信使用 TLS 1.3 加密，敏感数据使用 AES-256 加密存储' },
            { icon: <Lock className="w-8 h-8" />, title: '零知识架构', desc: '私有部署模式下，服务提供方无法访问用户数据' },
            { icon: <Eye className="w-8 h-8" />, title: '隐私优先', desc: '最小数据收集原则，不跟踪用户行为，不出售数据' },
            { icon: <Key className="w-8 h-8" />, title: '细粒度权限', desc: 'RBAC 权限模型，家庭成员按角色获得不同访问权限' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-primary-600 mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">认证与授权</h2>
          <div className="code-block">
            <pre className="text-sm leading-relaxed">{`认证流程:
  用户 → OAuth2.0 / 邮箱+密码 → 账号服务 → JWT Token
    │
    ├── Access Token (15 分钟有效)
    └── Refresh Token (7 天有效, HttpOnly Cookie)

权限模型 (RBAC):
  ┌──────────┬─────────────┬───────────┬──────────┐
  │ 角色      │ 数据读取     │ 设备控制   │ 家庭管理  │
  ├──────────┼─────────────┼───────────┼──────────┤
  │ 管理员    │ ✅ 全部      │ ✅ 全部    │ ✅       │
  │ 成人成员  │ ✅ 全部      │ ✅ 全部    │ ❌       │
  │ 青少年    │ ⚠️ 受限      │ ⚠️ 受限   │ ❌       │
  │ 访客      │ ❌           │ ⚠️ 受限   │ ❌       │
  └──────────┴─────────────┴───────────┴──────────┘`}</pre>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">数据安全</h2>
          <div className="space-y-4">
            {[
              { title: '传输加密', desc: 'TLS 1.3，HSTS 启用，证书自动续期' },
              { title: '存储加密', desc: 'PostgreSQL 透明数据加密 (TDE)，敏感字段 AES-256-GCM 加密' },
              { title: '密钥管理', desc: '主密钥存储在环境变量中，支持 HashiCorp Vault 集成' },
              { title: '备份加密', desc: '备份文件使用 GPG 加密，异地备份使用 AES-256 加密传输' },
              { title: '日志脱敏', desc: '日志中自动脱敏 PII 数据（姓名、邮箱、手机号、地址）' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">安全报告</h3>
          <p className="text-blue-800 text-sm">
            如果您发现安全漏洞，请通过 <code>security@hamr.store</code> 进行负责任的披露。
            我们承诺在 48 小时内响应。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
