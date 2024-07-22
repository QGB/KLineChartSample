import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Test from './Test.vue'
import Home from './Home.vue'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // Assuming your home component is within App.vue
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// 使用路由
app.use(router)

app.mount('#app')