export default [
  {
    path: '/',
    component: '@/layout/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/factory',
      },
      {
        path: '/factory',
        component: '@/pages/factory',
      },
      {
        path: '/service',
        component: '@/pages/service',
      },
      {
        path: '/center',
        component: '@/pages/center',
      },
    ],
  },
];
