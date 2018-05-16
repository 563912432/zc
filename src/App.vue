<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: 15px;
    display: flex;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    flex: 1;
    display: flex;
    background-color: #fff;
    z-index: 1;
  }
</style>
