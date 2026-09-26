import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: '/scan',
        destination: '/ai-seo',
        permanent: false,
      },
      {
        source: '/scan-my-site',
        destination: '/ai-seo',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
