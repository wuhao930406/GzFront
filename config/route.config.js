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
        path: '/search',
        component: '@/pages/factory/Search',
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
