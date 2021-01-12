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
        title: '三保打工网',
        component: '@/pages/factory',
      },
      {
        path: '/search',
        title: '找工作',
        component: '@/pages/factory/search',
      },
      {
        path: '/detail',
        title: '岗位信息',
        component: '@/pages/factory/detail',
      },

      {
        path: '/service',
        title: '服务中心',
        component: '@/pages/service',
      },
      {
        path: '/center',
        title: '个人中心',
        component: '@/pages/center',
      },
    ],
  },
];
