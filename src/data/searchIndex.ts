/**
 * Static search index for the docs site.
 *
 * Self-contained, hand-curated from the actual page contents.
 * When new pages are added, register them here so they appear in search.
 *
 * No external search engine dependency: each entry ships with a
 * pre-tokenised haystack that we score against the user query at runtime.
 */

export interface SearchEntry {
  /** Document path, navigates to this route. */
  path: string;
  /** Display title shown in the result row. */
  title: string;
  /** Short summary shown below the title. */
  summary: string;
  /** Group label for clustering in results. */
  section: string;
  /** Pre-tokenised lowercase text used for matching. */
  haystack: string;
  /** Pre-extracted keywords for boosting exact matches. */
  keywords: string[];
}

const tokenize = (input: string): string[] =>
  input
    .toLowerCase()
    .replace(/[\s\p{P}]+/gu, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

const buildEntry = (
  path: string,
  title: string,
  summary: string,
  section: string,
  body: string,
  keywords: string[] = [],
): SearchEntry => ({
  path,
  title,
  summary,
  section,
  haystack: tokenize(`${title} ${summary} ${body}`).join(' '),
  keywords,
});

export const searchIndex: SearchEntry[] = [
  buildEntry(
    '/',
    'HamR 技术文档',
    '欢迎来到 HamR 开发者文档中心，包含完整的 API 参考、架构设计、开发指南和最佳实践。',
    '快速开始',
    'HamR 技术文档 快速上手 API 参考 安全架构 最佳实践 安装配置 查看 API 文档 快速上手指南 系统架构设计 SDK 使用指南',
    ['介绍', '首页', '概览'],
  ),
  buildEntry(
    '/getting-started/installation',
    '安装配置',
    '安装 HamR SDK 并完成基础配置，为开发做好准备。',
    '快速开始',
    '安装配置 Node.js npm yarn pnpm TypeScript 环境要求 安装 SDK 配置 API Key 验证安装 HamRClient ping .env HAMR_API_KEY HAMR_API_ENDPOINT',
    ['安装', '环境', 'sdk', 'npm'],
  ),
  buildEntry(
    '/getting-started/quickstart',
    '快速上手',
    '3 步完成集成，10 分钟开始构建智能家居应用。',
    '快速开始',
    '快速上手 集成 智能家居 应用 发送对话 初始化 客户端 API Key endpoint message 客厅 灯',
    ['入门', '教程', 'quickstart'],
  ),
  buildEntry(
    '/api/overview',
    'API 概览',
    'HamR 提供完整的 RESTful API，支持智能对话、设备控制和自动化规则管理。',
    'API 参考',
    'API 概览 RESTful API 智能对话 设备控制 自动化 基础信息 端点 认证 Bearer API Key Content-Type JSON 可用端点 Chat Devices Automation 请求示例 响应',
    ['api', 'rest', '端点'],
  ),
  buildEntry(
    '/api/authentication',
    '认证',
    '所有 API 请求都需要通过 Bearer Token 进行身份认证。',
    'API 参考',
    '认证 Bearer Token API Key 身份认证 获取 API Key 开发者门户 注册 控制台 请求认证 Authorization 环境变量 cURL JavaScript fetch 频率限制 免费版 开发者版 企业版 安全最佳实践',
    ['auth', '认证', 'token', 'jwt'],
  ),
  buildEntry(
    '/api/errors',
    '错误处理',
    '统一的错误响应格式与错误码定义。',
    'API 参考',
    '错误处理 错误码 错误响应 状态码 HTTP 400 401 403 404 429 500 格式 code message details 重试 Retry-After',
    ['错误', '错误处理', '状态码'],
  ),
  buildEntry(
    '/architecture/system',
    '系统架构',
    'HamR 系统整体架构设计：微服务、网关、数据层与边缘计算。',
    '架构文档',
    '系统架构 微服务 网关 数据层 边缘计算 整体架构 服务拆分 部署拓扑 流量入口',
    ['架构', 'system', '微服务'],
  ),
  buildEntry(
    '/architecture/security',
    '安全架构',
    '端到端加密，隐私优先，符合 GDPR 标准。',
    '架构文档',
    '安全架构 端到端加密 GDPR 隐私 认证 授权 加密方案 密钥管理 访问控制 审计日志',
    ['安全', 'security', '加密', '隐私'],
  ),
];

export interface SearchResult extends SearchEntry {
  score: number;
  /** Snippet around the first matched token, for display. */
  snippet: string;
}

const STOPWORDS = new Set([
  '的', '了', '是', '在', '和', '与', '或', 'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in',
]);

/**
 * Search the index for entries matching the query.
 * - Tokenises query and entry on whitespace + punctuation
 * - Scores by number of matching tokens + exact keyword hit bonus
 * - Returns top N results sorted by score desc
 */
export function search(query: string, limit = 8): SearchResult[] {
  const tokens = tokenize(query).filter((t) => !STOPWORDS.has(t));
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entry of searchIndex) {
    let score = 0;
    let firstHit = -1;

    for (const token of tokens) {
      // Exact keyword hit gets a strong boost
      if (entry.keywords.some((k) => k.toLowerCase() === token)) {
        score += 5;
      }
      // Token contained anywhere in haystack
      const idx = entry.haystack.indexOf(token);
      if (idx !== -1) {
        score += 1;
        // Title hit is worth more
        if (entry.title.toLowerCase().includes(token)) score += 2;
        if (firstHit === -1) firstHit = idx;
      }
    }

    if (score > 0) {
      results.push({
        ...entry,
        score,
        snippet: makeSnippet(entry.haystack, tokens[0]),
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

function makeSnippet(haystack: string, token: string, radius = 24): string {
  const idx = haystack.indexOf(token);
  if (idx === -1) return '';
  const start = Math.max(0, idx - radius);
  const end = Math.min(haystack.length, idx + token.length + radius);
  const prefix = start > 0 ? '… ' : '';
  const suffix = end < haystack.length ? ' …' : '';
  return prefix + haystack.slice(start, end) + suffix;
}