import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import './assets/css/style.less'
import 'font-awesome/css/font-awesome.css'
import router from './routes'
import store from './store/index'
import $AV from './api/index'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$AV = $AV

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


