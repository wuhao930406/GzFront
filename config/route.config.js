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
        component: '@/pages/indexs',
      },
      {
        path: '/center',
        component: '@/pages/indexs',
      },
    ],
  },
];
