import {createApp, h} from 'vue'
import App from './App.vue'
import Baskito from './Baskito'

import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: {
        name: 'Home',
        render() {
          return h('h1', {}, 'Home page')
        },
      },
    },
    {
      path: '/test',
      name: 'test',
      component: {
        name: 'Test',
        render() {
          return h('h1', {}, 'test page')
        },
      },
    },
    {
      path: '/about/:id',
      name: 'About',
      component: {
        name: 'About',
        props: {id: [Number, String]},
        render() {
          return h('h1', {}, `About page ${this.props.id}`)
        },
      },
      props: true,
    },
  ],
})

createApp(App).use(Baskito).use(router).mount('#app')
