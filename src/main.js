import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";

Vue.config.productionTip = false

/*注册全局事件总线*/
Vue.prototype.$bus = new Vue()

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
