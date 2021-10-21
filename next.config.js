module.exports = {
  distDir: 'build/_next',
  target: 'server',
  poweredByHeader: false,

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
  let maintenance_array = [];

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
      maintenance_array = [
        ...maintenance_array,
        {
          source: elm,
          basePath: false,
          destination: '/maintenance',
          permanent: false,
        },
      ];
    });
  } else {
    maintenance_array = [
      ...maintenance_array,
      {
        source: '/maintenance',
        destination: '/',
        basePath: false,
        permanent: false,
      },
    ];
  }
  return maintenance_array;
}
