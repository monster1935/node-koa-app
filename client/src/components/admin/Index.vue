<template>
    <div class="app-admin">
        <app-nav></app-nav>
        <div class="app-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppHeader from './common/AppHeader';
import AppNav from './common/AppNav';
export default {
    name: 'app-admin',
    mounted () {},
    components: {
        AppHeader,
        AppNav
    }
}
</script>

<style>
html,body {
    margin: 0;
    padding: 0;
    height: 100%;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
.app-admin {
    height: 100%;
    display: flex;
    flex-flow: row;
}
.app-nav {
    flex: 0 0 300px;
    background: #202020;
}
.app-right {
    flex: 1;
    padding: 0 20px;
}
</style>
