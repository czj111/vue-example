// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('Child',{
  render:function(createElement){
    return createElement('p','text');
  }
});
Vue.component('ele',{
  render:function(createElement){
    return createElement('div',[this.$slots.default,this.$slots.default]);
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
