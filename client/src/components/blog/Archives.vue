<template>
    <div class="archives">
        <div class="title">
            <p>归档</p>
            <p class="subtitle">共计{{articles.length}}篇日志</p>
        </div>
        <div class="archive-list">
            <div class="post-item" v-for="article in articles">
                <span class="time">
                    {{article.createTime.split(' ')[0]}}
                </span>
                <router-link
                    class="post-title"
                    :to="'/post/' + article._id">
                    {{article.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from '@/lib/marked';
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
                this.$http.post('/v2/articleList').then(res => {
                    if (res.data.resCode == 100) {
                        this.articles = res.data.dataList.filter(el => {
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
    .archives {
        .title {
            font-size: 24px;
            font-weight: 700;
            color: #333;
            .subtitle {
                font-size: 16px;
                color: #999;
                font-weight: normal;
            }
        }
        .archive-list {
            margin-left: 40px;
            .post-item {
                span.time {
                    position: relative;
                    display: inline-block;
                    font-size: 14px;
                    color: #999;
                    height: 30px;
                    line-height: 30px;
                    margin-right: 20px;
                    padding-right: 20px;
                    border-right: 2px solid #666;
                    &::before {
                        position: absolute;
                        content: "";
                        border-radius: 50%;
                        border: 1px solid #999;
                        right: -5px;
                        top: 10px;
                        width: 6px;
                        height: 6px;
                        background: #f3f3f3;
                        -webkit-transition-duration: 0.2s;
                        transition-duration: 0.2s;
                        -webkit-transition-timing-function: ease-in-out;
                        transition-timing-function: ease-in-out;
                        -webkit-transition-delay: 0s;
                        transition-delay: 0s;
                        -webkit-transition-property: background;
                        transition-property: background;
                    }
                }
                &:hover {
                    span.time {
                        color: #666;
                        &::before {
                            background: #333;
                        }
                    }
                }
                a.post-title {
                    text-decoration: none;
                }
            }
        }
    }
</style>
