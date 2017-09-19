/**
 * 全局vuex管理
 */

import Vue from 'vue';
import Vuex from 'vuex';
import token from './modules/token.js';
import article from './modules/article.js'
Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        token,
        article
    }
});
