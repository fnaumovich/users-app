<template>
  <div id="app">
    <router-link to="/" class="title">
      <h1 class="text-center ">User App</h1>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .title {
    text-decoration: none;
    color: #000;
  }

  .title:hover {
    text-decoration: none;
    color: #000;
  }
</style>
