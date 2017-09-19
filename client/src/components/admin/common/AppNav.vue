<template>
    <div class="app-nav">
        <span
            class="btn-close"
            title="注销"
            @click="onLogout">
            <i class="iconfont icon-logout"></i>
        </span>
        <div class="app-nav-header">
            <router-link class="logo-wrap" to="/admin">
                <img src="../../../assets/logo.jpg" alt="monster1935 admin">
            </router-link>
            <span class="logo-title">Blog管理后台</span>
        </div>
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
                    { title: '首页' , route: '/admin', icon: 'iconfont icon-index' },
                    { title: '用户管理' , route: '/admin/users', icon: 'iconfont icon-user' },
                    { title: '文章管理' , route: '/admin/articles', icon: 'iconfont icon-article' },
                    // { title: '标签管理' , route: '/admin/tags', icon: 'el-icon-menu' },
                    // { title: '分类管理' , route: '/admin/categories', icon: 'el-icon-menu' },
                    // { title: '统计' , route: '/admin/statis', icon: 'el-icon-menu' },
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
            onLogout () {
                this.$confirm('确定要注销吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit('DEL_TOKEN');
                    this.$message({
                        type: 'success',
                        message: '注销成功'
                    });
                    setTimeout(() => {
                        this.$router.push('/admin/login');
                    }, 1000);
                }).catch(()=>{});
            }
        },
        computed: {

        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .app-nav {
        display: flex;
        flex-flow: column;
        color: #999;
        position: relative;
        .btn-close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
            &:hover {
                .iconfont.icon-logout {
                    color: #fff;
                }
            }
        }
        .app-nav-header {
            flex: 0 0 200px;
            padding-top: 40px;
            padding-bottom: 20px;
            .logo-wrap {
                display: block;
                margin: 0 auto;
                width: 140px;
                height: 140px;
                overflow: hidden;
                img {
                    width: 140px;
                    height: 140px;
                    border-radius: 70px;
                    overflow: hidden;
                }
            }
            .logo-title {
                display: block;
                padding: 10px 0;
                font-size: 18px;
                color: #999;
                font-weight: 700;
                text-align: center;
            }
            .logo-user {
                display: block;
                padding: 10px 0;
                text-align: center;
            }
        }
        .el-menu {
            flex: 1;
            background-color: #202020;
            .el-menu-item, .el-submenu__title {
                color: #999;
                font-size: 16px;
                padding-left: 40px !important;
                &.is-active {
                    color: #fff;
                }
                &:hover {
                    background-color: transparent;
                    color: #fff;
                }
                .iconfont {
                    font-size: 18px;
                    margin-right: 10px;
                }
            }

        }
    }
</style>
