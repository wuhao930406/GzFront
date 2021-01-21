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
        path: '/city',
        title: '两城宜家',
        component: '@/pages/city',
      },
      {
        path: '/bus',
        title: '两城一家',
        component: '@/pages/city/bus',
      },
      {
        path: '/center',
        title: '个人中心',
        component: '@/pages/center',
      },
      {
        path: '/enroll',
        title: '报名记录',
        component: '@/pages/center/enroll',
      },
      {
        path: '/enrolldetail',
        title: '报名详情',
        component: '@/pages/center/enrolldetail',
      },
      {
        path: '/train',
        title: '选择车次',
        component: '@/pages/center/train',
      },
      {
        path: '/trainport',
        title: '预定车次',
        component: '@/pages/center/trainport',
      },
      {
        path: '/advance',
        title: '我的推广',
        component: '@/pages/advance',
      },
    ],
  },
];
