<template>
    <div class="app-header">
        <div class="logo">
            <span>{{title}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeIndex: '1',
                title: 'Blog后台管理系统'
            };
        },
        components: {},
        mounted() {},
        methods: {
            handleSelect(){}
        },
        computed: {},
        watch: {}
    };
</script>

<style scoped>
.app-header {
    background: #324157;
    color: #fff;
}
.logo {
    font-size: 20px;
    font-weight: bold;
    margin-left: 26px;

}
</style>
