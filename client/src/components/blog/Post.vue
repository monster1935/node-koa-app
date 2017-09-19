<template>
    <div class="post">
        <div class="post-head">
            <div class="post-title">
                {{article.title}}
            </div>
            <div class="post-info">
                <span class="time">
                    <i class="iconfont icon-time"></i>{{article.createTime}}
                </span>
                <template v-if="$route.path != '/about'">
                    <span class="tags">
                        <i class="iconfont icon-tag"></i>{{tags}}
                    </span>
                    <span class="categories">
                        <i class="iconfont icon-file"></i>{{article.categories}}
                    </span>
                    <span class="view">
                        <i class="iconfont icon-view"></i>{{article.viewCounts}}
                    </span>
                </template>
            </div>
        </div>
        <div class="post-wrap" v-html="content" v-highlight></div>
    </div>
</template>

<script>
    import marked from '@/lib/marked';
    export default {
        data () {
            return {
                id: '',
                article: {}
            };
        },
        inheritAttrs: false,
        components: {},
        beforeMount() {
            if (this.$route.path == '/about') {
                this.getArticles({categories: 'about'});
            } else {
                this.id = this.$route.params.id;
                this.getArticles({id: this.id});
            }
        },
        methods: {
            getArticles (params) {
                this.$http.post('/v2/articleInfo', params).then(res => {
                    if (res.data.resCode == 100) {
                        this.article = res.data.data;
                        this.$store.commit('SET_CONTENT', this.article.content);
                    } else {
                        this.article = [];
                    }
                });
            }
        },
        computed: {
            compileContent () {
                return this.$store.state.article.compileContent;
            },
            content () {
                if (this.article.content) {
                    return marked(this.article.content);
                }
                return '';
            },
            tags () {
                if (this.article.tags && this.article.tags.length) {
                    return this.article.tags.join(' | ');
                }
                return '';
            }
        },
        watch: {
            '$route': function () {
                if (this.$route.path == '/about') {
                    this.getArticles({categories: 'about'});
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .post {
        padding: 20px 36px;
        background: #fff;
        .post-head {
            .post-title {
                font-size: 24px;
                margin-bottom: 10px;
                font-weight: 700;
                color: #333;
            }
            .post-info {
                font-size: 14px;
                color: #999;
                .time,.tags,.categories,.view {
                    margin-right: 10px;
                }
            }
        }
        .post-wrap {
            position: relative;
            overflow: hidden;
        }
    }
</style>

<style lang="scss">
    pre code {
        font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    }
    .post-wrap {
        img {
            max-width: 100%;
        }
    }
    .iconfont {
        font-size: 14px;
        margin-right: 4px;
    }
</style>
