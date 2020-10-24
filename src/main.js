import Vue from 'vue'
import App from './App.vue'
import router from './Router/routes';

Vue.config.productionTip = false

//Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(VueMaterial)

// import githubApi from './API/githubApi';
// Vue.prototype.$githubApi = githubApi;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
