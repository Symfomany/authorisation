import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Answer from '@/components/Answer'
import Alpha from '@/components/Alpha'
import Beta from '@/components/Beta'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/a',
          name: 'a',
          component: Alpha
        },
        {
          path: '/b',
          name: 'b',
          component: Beta
        },
      ]
    },
    {
      path: '/answer',
      name: 'answer',
      component: Answer
    },

  ]
})
