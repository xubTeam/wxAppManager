// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import API from './utils/api'
// 引用element-ui css
import 'element-ui/lib/theme-chalk/index.css'
// 引用全局css
import './assets/css/global.css'
// 全局使用ElementUI
Vue.use(ElementUI)

Vue.prototype.$api=API
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
