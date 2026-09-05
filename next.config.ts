import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // 部署目标：Cloudflare Workers（@opennextjs/cloudflare）。
  // 注意：不能使用 output: 'export'（OpenNext 需要服务端构建产物
  // .next/server 与 pages-manifest.json，纯静态导出会直接构建失败）。
};

export default withNextIntl(nextConfig);
