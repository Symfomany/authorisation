import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Answer from '@/components/Answer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/answer',
      name: 'answer',
      component: Answer
    },

  ]
})
