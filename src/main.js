// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
router.beforeEach((to, from, next) => {
  // 统计代码
  if (to.path) {
    var _hmt = _hmt || []
    _hmt.push(['_trackPageview', location.pathname + '#/' + to.fullPath])
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
