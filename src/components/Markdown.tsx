import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Markdown 内容渲染组件 —— Round-4 真实 Markdown 内容管线的核心。
 *
 * 设计要点：
 * 1. 使用 Vite 的 `?raw` 后缀把 .md 文件以文本形式导入，避免运行时 fetch / 第三方 loader。
 * 2. 启用 remark-gfm 支持 GitHub Flavored Markdown（表格、任务列表、删除线、围栏代码块）。
 * 3. 复用站点现有的 Tailwind 排版样式（.markdown-body），确保渲染效果与原手写 JSX 视觉一致。
 * 4. 暴露 `data-testid="markdown-content"` 便于测试断言内容已渲染。
 *
 * 使用示例：
 * ```tsx
 * import installationMd from '../content/installation.md?raw';
 * <Markdown source={installationMd} />
 * ```
 */

interface MarkdownProps {
  /** 原始 Markdown 文本（通常来自 `?raw` 导入） */
  source: string;
  /** 可选 className 追加到外层 div */
  className?: string;
}

export default function Markdown({ source, className = '' }: MarkdownProps) {
  return (
    <div
      data-testid="markdown-content"
      className={`markdown-body max-w-none ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}