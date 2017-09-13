<template>
    <div class="app-nav">
        <el-menu default-active="/" router>
            <template v-for="menu in menus">
                <el-menu-item :index="menu.route">
                    <i :class="menu.icon"></i>
                    {{menu.title}}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                menus: [
                    { title: '首页' , route: '/', icon: 'el-icon-menu' },
                    { title: '用户管理' , route: '/users', icon: 'el-icon-menu' },
                    { title: '文章管理' , route: '/articles', icon: 'el-icon-menu' },
                    { title: '标签管理' , route: '/tags', icon: 'el-icon-menu' },
                    { title: '分类管理' , route: '/categories', icon: 'el-icon-menu' },
                    { title: '统计' , route: '/statis', icon: 'el-icon-menu' },
                ]
            };
        },
        components: {},
        mounted() {},
        methods: {
            handleOpen () {},
            handleClose () {}
        },
        computed: {},
        watch: {}
    };
</script>
