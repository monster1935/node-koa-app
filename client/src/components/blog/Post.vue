<template>
    <div class="post">
        <div class="post-head">
            <div class="post-title">
                {{article.title}}
            </div>
            <div class="post-info">
                <span class="time">{{article.createTime}}</span>
                <template v-if="$route.path != '/about'">
                    <span class="tags">标签：{{tags}}</span>
                    <span class="categories">分类： {{article.categories}}</span>
                </template>
            </div>
        </div>
        <div class="post-wrap" v-html="content">

        </div>
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
        mounted() {
            if (this.$route.path == '/about') {
                this.getArticles({categories: 'about'});
            } else {
                this.id = this.$route.params.id;
                this.getArticles({id: this.id});
            }
        },
        methods: {
            getArticles (params) {
                this.$http.post('/v2/articles', params).then(res => {
                    if (res.data.resCode == 100) {
                        this.article = res.data.dataList[0];
                    } else {
                        this.article = [];
                    }
                });
            }
        },
        computed: {
            content () {
                if (this.article.content) {
                    return marked(this.article.content);
                }
                return '';
            },
            tags () {
                if (this.article.tag && this.article.tags.length) {
                    return this.article.tags.join(' | ');
                }
                return '';
            }
        },
        watch: {}
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
            }
        }
        .post-wrap {
            position: relative;
            overflow: hidden;
        }
    }
</style>

<style lang="scss">
    .post-wrap {
        img {
            width: 100%;
        }
    }
</style>
