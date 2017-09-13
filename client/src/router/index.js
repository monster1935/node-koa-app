import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Users from '@/components/Users';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/tags',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/articles',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/statis',
            name: 'Hello',
            component: Hello
        },
    ]
})
