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
    </div>
</template>

<script>
    import PostBlock from './PostBlock.vue';
    export default {
        props: {
            articles: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {

            };
        },
        components: {
            PostBlock
        },
        mounted() {},
        methods: {},
        computed: {},
        watch: {}
    };
</script>


<style lang="scss" scoped>

</style>
