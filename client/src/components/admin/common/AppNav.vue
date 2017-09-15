<template>
    <div class="app-nav">
        <el-menu :default-active="defaultRoutes" router>
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
                defaultRoutes: '',
                menus: [
                    { title: '首页' , route: '/admin', icon: 'el-icon-menu' },
                    { title: '用户管理' , route: '/admin/users', icon: 'el-icon-menu' },
                    { title: '文章管理' , route: '/admin/articles', icon: 'el-icon-menu' },
                    { title: '标签管理' , route: '/admin/tags', icon: 'el-icon-menu' },
                    { title: '分类管理' , route: '/admin/categories', icon: 'el-icon-menu' },
                    { title: '统计' , route: '/admin/statis', icon: 'el-icon-menu' },
                ]
            };
        },
        components: {},
        mounted() {
            if (this.$route) {
                // 设置默认路由，用于在刷新的情况下的默认绑定
                this.defaultRoutes = this.$route.fullPath;
            }
        },
        methods: {
            handleOpen () {},
            handleClose () {}
        },
        computed: {

        },
        watch: {}
    };
</script>
