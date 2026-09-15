#!/usr/bin/env node
/**
 * Round-5 sitemap.xml + robots.txt 生成器。
 *
 * 运行方式： `npm run sitemap` (由 build 完成后自动调用，亦可手动运行)
 *
 * 行为：
 *  1. 读取 ROUTES 列表（与 src/nav.ts:sidebarPaths 保持同步）。
 *  2. 生成 dist/sitemap.xml —— 每个路由一个 <url> 节点。
 *  3. 生成 dist/robots.txt —— 声明 Sitemap 位置并允许所有爬虫。
 *
 * 部署注意事项：
 *  - SITE_ORIGIN 与实际生产域名（docs.hamr.top）保持一致，可在调用时通过环境变量覆盖。
 *  - 因为是 SPA（所有路由共用 dist/index.html），<loc> 仍按具体路径列出，搜索引擎
 *    会请求该路径并由前端 History Router 渲染对应页面。
 */
import { writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, '..', 'dist')

const SITE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://docs.hamr.top'

// 与 src/nav.ts:sidebarPaths 保持同步 —— 新增/删除 Sidebar 路由时必须同步此处。
const ROUTES = [
  '/',
  '/getting-started/installation',
  '/getting-started/quickstart',
  '/concepts',
  '/api/overview',
  '/api/authentication',
  '/api/errors',
  '/chat',
  '/devices',
  '/automation',
  '/data-model',
  '/architecture/system',
  '/architecture/security',
  '/sdks/typescript',
  '/sdks/rust',
  '/sdks/python',
]

function isoDate() {
  return new Date().toISOString().slice(0, 10)
}

function buildSitemap() {
  const lastmod = isoDate()
  const urls = ROUTES.map((path) => {
    // 跳过纯路径 '/' 之外的无末尾斜杠路径（保持与 SPA Host 名一致）
    const loc = `${SITE_ORIGIN}${path === '/' ? '/' : path}`
    const priority = path === '/' ? '1.0' : '0.7'
    const changefreq = path === '/' ? 'weekly' : 'monthly'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildRobots(sitemapUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
}

function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`[sitemap] dist 目录不存在：${DIST_DIR}`)
    console.error('[sitemap] 请先运行 `npm run build`')
    process.exit(1)
  }

  const sitemap = buildSitemap()
  const sitemapPath = join(DIST_DIR, 'sitemap.xml')
  writeFileSync(sitemapPath, sitemap, 'utf8')

  const sitemapUrl = `${SITE_ORIGIN}/sitemap.xml`
  const robots = buildRobots(sitemapUrl)
  const robotsPath = join(DIST_DIR, 'robots.txt')
  writeFileSync(robotsPath, robots, 'utf8')

  console.log(`[sitemap] 已生成 ${sitemapPath}（${ROUTES.length} 条 URL）`)
  console.log(`[sitemap] 已生成 ${robotsPath}`)
}

main()
