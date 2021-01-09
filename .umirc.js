import { defineConfig } from 'umi';
import routes from './config/route.config';
import proxy from './config/proxy';
import theme from './config/theme';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  outputPath: 'gzfront',
  dva: {
    hmr: true,
  },
  antd: {},
  theme,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  targets: {
    ie: 11,
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  }, //异步加载
  fastRefresh: {}, //快速刷新
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  title: '三保打工网',
  favicon: '/assets/favicon.ico',
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
    },
    {
      name: 'description',
      content: '三保打工网',
    },
  ],
  headScripts: [
    `https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js`,
  ],

  plugins:['@alitajs/keep-alive'],
  keepalive:['/factory','/service']
});
