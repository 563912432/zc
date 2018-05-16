import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:tag',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/d/:id',
      name: 'd',
      component: detail
    }
  ]
})
