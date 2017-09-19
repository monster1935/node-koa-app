<template>
    <div class="post-block">
        <div class="title">
            <router-link :to="'post/' + id">{{title}}</router-link>
        </div>
        <div class="title-info">
            <span class="time">
                <i class="iconfont icon-time"></i>{{time}}
            </span>
            <span class="tags">
                <i class="iconfont icon-tag"></i>{{tags.join(' | ')}}
            </span>
            <span class="categories">
                <i class="iconfont icon-file"></i>{{categories}}
            </span>
            <span class="view">
                <i class="iconfont icon-view"></i>{{viewCounts}}
            </span>
        </div>
        <div class="title-abstract" v-html="compileContent" v-highlight>
        </div>
        <div class="btn-title">
            <router-link :to="'post/' + id">阅读全文</router-link>
        </div>
    </div>
</template>

<script>
    import marked from '@/lib/marked';
    export default {
        props: {
            id: {
                type: String,
                default : ''
            },
            title: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            },
            tags: {
                type: Array,
                default () {
                    return [];
                }
            },
            categories: {
                type: String,
                default: ''
            },
            viewCounts: {
                type: Number,
                default: 0
            },
            content: {
                type: String,
                default: ''
            }
        },
        data () {
            return {

            };
        },
        components: {},
        mounted() {},
        methods: {},
        computed: {
            compileContent () {
                let abstract = '';
                let flag = '<!-- more -->';
                if (this.content.indexOf(flag) !== -1) {
                    abstract = this.content.split(flag)[0];
                } else {
                    abstract = '';
                }
                return marked(abstract);
            }
        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .post-block {
        background: #fff;
        padding: 20px 36px;
        margin-bottom: 20px;
        color: #262626;
        .title {
            margin-bottom: 10px;
            a {
                font-size: 24px;
                font-weight: 700;
                color: #333;
                text-decoration: none;
            }
        }
        div.title-info {
            font-size: 14px;
            color: #999;
            margin-bottom: 10px;
            .time,.tags,.categories,.view {
                margin-right: 10px;
            }
        }
        div.title-abstract {
            margin-bottom: 10px;
        }
        .btn-title {
            a {
                text-decoration: none;
                color: #999;
                font-size: 14px;
                &:hover {
                    color: #333;
                }
            }
        }
    }
</style>

<style lang="scss">
    a {
        text-decoration: none;
        color: #0366d6;
        &:hover {
            text-decoration: underline;
        }
    }
    .main {
        a {
            text-decoration: none;
            color: #0366d6;
            &:hover {
                text-decoration: underline;
            }
        }
        blockquote {
            border-left: 4px solid #ccc;
            margin: 0;
            padding: 0 20px;
        }
        img {
            max-width: 100%;
        }
    }
    .iconfont {
        font-size: 14px;
        margin-right: 4px;
    }
</style>
