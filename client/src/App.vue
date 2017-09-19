<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    mounted () {
        console.log('start');
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
    overflow: auto;
}
</style>
