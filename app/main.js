import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store/index';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

Vue.filter("formatNumber", function(value) {
  if (!value) return "";
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(value);
});

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
