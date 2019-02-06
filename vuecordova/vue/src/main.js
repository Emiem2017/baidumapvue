// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BaiduMap from 'vue-baidu-map'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(VueResource)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})

Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true

//在main.js中设置公用的地址
Vue.prototype.rootUrl = '/agent/';
Vue.prototype.baidumap = '/baidu/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
