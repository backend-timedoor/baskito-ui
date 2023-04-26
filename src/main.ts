import "../scss/sample.scss";

import { createApp } from 'vue'
import App from './App.vue'
import Baskito from './Baskito'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

createApp(App).use(Baskito).use(router).mount('#app')
