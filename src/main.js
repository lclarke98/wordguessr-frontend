import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ToggleButton from 'vue-js-toggle-button'

library.add(faUserCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(ToggleButton)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
