// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import moment from 'moment';
import 'element-ui/lib/theme-default/index.css';
import store from '@/store/index.js';
Vue.use(ElementUI);

import hljs from 'highlight.js';
Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    });
});

// 设置axios的拦截返回，
axios.interceptors.response.use(response => {
    if (response.data.resCode == 401) {
        store.commit('DEL_TOKEN');
        router.push('/admin/login');
    }
    return response;
}, err => {
    this.$message({
        type: 'error',
        message: err.message
    });
    return Promise.reject(err);
});
Vue.prototype.$http = global.$http = axios;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false


router.beforeEach((to, from ,next) => {
    // 登录页判断是否已经登录，如果已经登录跳转
    if (to.matched[0].path == '/admin') {
        if (to.meta.requireAuth) {
            if (store.state.token.token) {
                next('/admin');
            }
            next();
        } else {
            // 非登录页判断是否存在token，决定是否跳转到登录页
            if (store.state.token.token) {
                axios.defaults.headers.common['Authorization'] = 'Bear ' + store.state.token.token;
                next();
            } else {
                next('/admin/login');
            }
        }
    } else {
        next();
    }

});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
