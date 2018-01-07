// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Icon from 'vue-awesome/components/Icon'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'

import './sass/main.sass'

Vue.config.productionTip = false

// register vue-awesome component
Vue.component('icon', Icon)

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
