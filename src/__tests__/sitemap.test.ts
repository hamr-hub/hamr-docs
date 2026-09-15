/**
 * Round-5 sitemap/robots 生成器测试。
 *
 * 我们直接 spawn 运行 scripts/generate-sitemap.mjs，验证它能：
 *   1. 在 dist/ 写出格式正确的 sitemap.xml
 *   2. 在 dist/ 写出 robots.txt，并指向同一个 sitemap
 *   3. sitemap 中每个 Sidebar 路由都有对应的 <url><loc> 条目
 *
 * 这里把脚本执行结果当黑盒：失败时 stdout/stderr 会直接冒到测试输出。
 */
import { describe, expect, it, beforeAll } from 'vitest';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const PROJECT_ROOT = join(__dirname, '..', '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist');
const SITEMAP_PATH = join(DIST_DIR, 'sitemap.xml');
const ROBOTS_PATH = join(DIST_DIR, 'robots.txt');

function runSitemap() {
  const result = spawnSync('node', ['scripts/generate-sitemap.mjs'], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(
      `sitemap 脚本退出码 ${result.status}\nstdout: ${result.stdout}\nstderr: ${result.stderr}`,
    );
  }
  return result.stdout;
}

describe('Round-5 sitemap/robots 生成器', () => {
  beforeAll(() => {
    // 测试前置：保证 dist/ 存在（CI 中由 npm run build 产出）。
    // 如果缺失，尝试单独跑一次 vite build 让目录就绪。
    if (!existsSync(DIST_DIR)) {
      const build = spawnSync('npm', ['run', 'build'], {
        cwd: PROJECT_ROOT,
        encoding: 'utf8',
      });
      if (build.status !== 0) {
        throw new Error(
          `vite build 失败：\nstdout: ${build.stdout}\nstderr: ${build.stderr}`,
        );
      }
    } else {
      // 单独跑一次以确保 sitemap 是最新的（避免误判旧产物）
      runSitemap();
    }
  });

  it('dist/sitemap.xml 文件存在', () => {
    expect(existsSync(SITEMAP_PATH)).toBe(true);
  });

  it('dist/robots.txt 文件存在', () => {
    expect(existsSync(ROBOTS_PATH)).toBe(true);
  });

  it('sitemap.xml 是合法的 urlset XML，包含至少 16 条 <url>', () => {
    const xml = readFileSync(SITEMAP_PATH, 'utf8');
    expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
    const urlCount = (xml.match(/<url>/g) ?? []).length;
    expect(urlCount).toBeGreaterThanOrEqual(16);
  });

  it('sitemap.xml 包含每个 Sidebar 路由（与 nav.ts 同步）', () => {
    const xml = readFileSync(SITEMAP_PATH, 'utf8');
    const required = [
      'https://docs.hamr.top/',
      'https://docs.hamr.top/getting-started/installation',
      'https://docs.hamr.top/getting-started/quickstart',
      'https://docs.hamr.top/api/overview',
      'https://docs.hamr.top/api/authentication',
      'https://docs.hamr.top/architecture/system',
      'https://docs.hamr.top/architecture/security',
      'https://docs.hamr.top/concepts',
      'https://docs.hamr.top/sdks/typescript',
    ];
    for (const url of required) {
      expect(xml).toContain(url);
    }
  });

  it('robots.txt 允许所有爬虫并指向 sitemap', () => {
    const text = readFileSync(ROBOTS_PATH, 'utf8');
    expect(text).toContain('User-agent: *');
    expect(text).toContain('Allow: /');
    expect(text).toContain('Sitemap: https://docs.hamr.top/sitemap.xml');
  });

  it('SITE_ORIGIN 环境变量能覆盖默认域名', () => {
    const result = spawnSync(
      'node',
      ['scripts/generate-sitemap.mjs'],
      {
        cwd: PROJECT_ROOT,
        encoding: 'utf8',
        env: { ...process.env, SITE_ORIGIN: 'https://staging.hamr.top' },
      },
    );
    expect(result.status).toBe(0);
    const xml = readFileSync(SITEMAP_PATH, 'utf8');
    expect(xml).toContain('https://staging.hamr.top/getting-started/installation');
    expect(xml).not.toContain('https://docs.hamr.top/getting-started/installation');
  });
});
