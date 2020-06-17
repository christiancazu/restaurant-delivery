import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import authMiddleware from '@core/middlewares/auth.middleware';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

Vue.use(VueRouter);

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

Router.beforeEach(authMiddleware);

export default Router;
