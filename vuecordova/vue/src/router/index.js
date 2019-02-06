import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main.vue'
import Welcome from '../components/welcome/welcome.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
