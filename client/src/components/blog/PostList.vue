<template>
    <div class="post-list">
        <post-block
            v-for="article in articles"
            :id="article._id"
            :title="article.title"
            :time="article.createTime"
            :tags="article.tags"
            :categories="article.categories"
            :content="article.content">
        </post-block>
        <div v-if="isLoading">
            <h1>loading</h1>
        </div>
    </div>
</template>

<script>

    import PostBlock from './PostBlock.vue';
    export default {
        data () {
            return {
                articles: [],
                isLoading: false
            };
        },
        components: {
            PostBlock
        },
        mounted() {
            this.getAllArticles();
            let _content = document.querySelector('.blog-content');
            let _main = document.querySelector('.main');
            let _footer = document.querySelector('.footer');

            // 下拉无限加载
            var that = this;
            _content.addEventListener('scroll', function () {
                if ((_content.scrollTop + _content.clientHeight) >= (_main.offsetHeight + _footer.offsetHeight + 60)) {
                    // 触发加载数据
                    that.isLoading = true;
                    that.getAllArticles();
                }
            });
        },
        methods: {
            // get all articles
            getAllArticles (){
                this.$http.post('/v2/articles').then(res => {
                    this.isLoading = false;
                    if (res.data.resCode == 100) {
                        this.articles = this.articles.concat(res.data.dataList.reverse().filter(el => {
                            return el.categories != 'about';
                        }));
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

</style>
