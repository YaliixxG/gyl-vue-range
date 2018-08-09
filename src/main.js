import Vue from 'vue'
import App from './App.vue'
import range from './lib/range'

Vue.use(range)

new Vue({
  el: '#app',
  render: h => h(App)
})
