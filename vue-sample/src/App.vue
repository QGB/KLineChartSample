<template>
  <div id="app" class="app">
    
    <router-view></router-view>
  </div>
</template>

<script setup>
// 这里不需要引入其他组件，因为这些组件会在 Home.vue 中使用
</script>

<style scoped>


nav {
  width: 100%;
  background-color: #1677ff;
  padding: 10px;
  text-align: center;
}

nav a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>