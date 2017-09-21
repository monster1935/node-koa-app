<template>
    <div class="app-blog">
        <div class="blog-header">
            <a href="/" class="logo">Monster's Blog</a>
            <ul class="blog-nav">
                <li><router-link class="nav" to="/">首页</router-link></li>
                <li><router-link class="nav" to="/archives">归档</router-link></li>
                <li><router-link class="nav" to="/about">关于</router-link></li>
            </ul>
        </div>
        <div class="blog-content">
            <div class="main">
                <router-view></router-view>
            </div>
            <div class="footer">
                <p>© 2017 -  monster1935的博客  - 京ICP备15048708号-1</p>
                <p>Powered by Vue & Koa2</p>
            </div>
        </div>
        <div class="btn-backtop" v-if="btnVis" @click="onBtnTopClick">
            <i class="iconfont icon-top"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                btnVis: false,
                _content: {}
            };
        },
        components: {},
        mounted() {
            // 判断是否显示置顶按钮
            let _content = document.querySelector('.blog-content');
            this._content = _content;
            var that = this;
            _content.addEventListener('scroll', function (){
                if (_content.scrollTop > 0) {
                    that.btnVis = true;
                } else {
                    that.btnVis = false;
                }
            });
        },
        methods: {
            // 置顶
            onBtnTopClick () {
                this._content.scrollTop = 0;
            }
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .app-blog {
        font-family: "Roboto","Segoe UI","Microsoft Yahei","WenQuanYi Micro Hei","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Source Han Sans CN",sans-serif;
        height: 100%;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .blog-header {
            flex: 0 0 60px;
            width: 1000px;
            padding: 0 16px;
            margin: 0 auto;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            .blog-nav {
                float: right;
                list-style: none;
                text-decoration: none;
                margin: 0;
                padding: 0;
                li {
                    float: left;
                }
            }
            a.logo {
                text-decoration: none;
                font-size: 24px;
                color: #333;
                &:hover {
                    color: #000;
                }
            }
            a.nav {
                text-decoration: none;
                font-size: 18px;
                color: #999;
                margin: 0 20px;
                &:hover {
                    color: #333;
                    border-bottom: 2px solid #333;
                }
            }
            a.nav.router-link-exact-active.router-link-active {
                color: #333;
                border-bottom: 2px solid #333;
            }

        }
        .blog-content {
            flex: 1;
            overflow: auto;
            background: #f3f3f3;
            padding: 20px 36px;
            display: flex;
            flex-flow: column;
            .main {
                width: 1000px;
                padding: 0 16px;
                margin: 0 auto;
                flex: 1;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 14px;

            }
        }
        .btn-backtop {
            position: fixed;
            bottom: 20px;
            right: 40px;
            height: 40px;
            width: 40px;
            border: 1px solid #ccc;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            transition: display 2s;
            &:hover {
                background: #ddd;
            }
            .iconfont.icon-top {
                margin-right: 0;
            }
        }
    }
</style>

<style>

</style>
