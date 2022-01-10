module.exports = {
  distDir: 'build/_next',
  target: 'server',
  future: {
    webpack5: true,
  },
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return maintenanceMode();
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

function maintenanceMode() {
  let maintenanceArray = [];

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === '1') {
    const pages = [
      '/access-denied',
      '/forms-in-progress',
      '/login',
      '/logout',
      '/index',
      '/master-search',
      '/my-records',
      '/workers',
      '/workers/:slug*',
      '/api/:slug*',
      '/people',
      '/people/:slug*',
      '/submissions/:slug*',
    ];

    pages.forEach((elm) => {
      maintenanceArray = [
        ...maintenanceArray,
        {
          source: elm,
          basePath: false,
          destination: '/maintenance',
          permanent: false,
        },
      ];
    });
  } else {
    maintenanceArray = [
      ...maintenanceArray,
      {
        source: '/maintenance',
        destination: '/',
        basePath: false,
        permanent: false,
      },
    ];
  }
  return maintenanceArray;
}
