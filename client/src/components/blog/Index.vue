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
                <router-view :articles="articles"></router-view>
            </div>
            <div class="footer">
                <p>© 2017 -  monster1935的博客  - 京ICP备15048708号-1</p>
                <p>Powered by Vue & Koa2</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                articles: []
            };
        },
        components: {},
        mounted() {
            this.getAllArticles();
        },
        methods: {
            // get all articles
            getAllArticles (){
                this.$http.post('/v2/articles').then(res => {
                    if (res.data.resCode == 100) {
                        this.articles = res.data.dataList.reverse().filter(el => {
                            return el.categories != 'about';
                        });
                    } else {
                        console.error(res.data.resDesc);
                    }
                })
            }
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .app-blog {
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
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
    }
</style>

<style>

</style>
