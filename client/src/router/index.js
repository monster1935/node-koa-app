import Vue from 'vue';
import Router from 'vue-router';
import Admin from '@/components/admin';
import Blog from '@/components/blog';
import PostList from '@/components/blog/PostList';
import Post from '@/components/blog/Post';
import Archives from '@/components/blog/Archives';
import Hello from '@/components/admin/common/Hello'
import Login from '@/components/admin/Login';
import Users from '@/components/admin/users';
import Articles from '@/components/admin/articles';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Blog,
            children: [
                {
                    path: '/',
                    name: 'Blog list',
                    component: PostList,
                },
                {
                    path: '/post/:id',
                    name: 'Post',
                    component: Post
                },
                {
                    path: '/archives',
                    name: 'Archives',
                    component: Archives
                },
                {
                    path: '/about',
                    name: 'About',
                    component: Post
                },
            ]
        },
        {
            path: '/admin/login',
            name: 'Login',
            component: Login,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: '/',
                    name: 'Index',
                    component: Hello,
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users,
                },
                {
                    path: 'articles',
                    name: 'Articles',
                    component: Articles,
                },
                /*{
                    path: 'tags',
                    name: 'Hello',
                    component: Hello
                },
                {
                    path: 'categories',
                    name: 'Hello',
                    component: Hello,
                },
                {
                    path: 'statis',
                    name: 'Hello',
                    component: Hello,
                },*/
            ]
        }
    ]
})
