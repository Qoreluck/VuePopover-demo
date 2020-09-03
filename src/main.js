import Vue from 'vue'
import App from './App.vue'
import VuePopover from '@/plugins/VuePopover/'

Vue.use(VuePopover)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
