<template>
    <div class="app-admin">
        <app-header></app-header>
        <div class="app-content">
            <app-nav></app-nav>
            <div class="app-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from './common/AppHeader';
import AppNav from './common/AppNav';
export default {
    name: 'app-admin',
    mounted () {
        console.log('app admin start');
    },
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
    flex-flow: column;
}
.app-header {
    flex: 0 0 60px;
    height: 60px;
    line-height: 60px;
}
.app-content {
    flex: 1;
    display: flex;
}
.app-nav {
    flex: 0 0 300px;
    background: #eef1f6;
}
.app-right {
    flex: 1;
    padding: 10px 20px;
    overflow: auto;
}
</style>
