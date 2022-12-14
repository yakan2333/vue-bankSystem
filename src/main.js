import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import BaiduMap from 'vue-baidu-map';// 导入地图

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

let protocol = window.location.protocol; //协议
let host = window.location.host; //主机
let reg = /^localhost+/;
if (reg.test(host)) {
  //若本地项目调试使用
  axios.defaults.baseURL = 'http://localhost:8080/api';
} else {
  //动态请求地址             协议               主机
  axios.defaults.baseURL = protocol + "//" + host + ":5000";
}

// axios.defaults.baseURL = "http://localhost:8080/api"

import App from './App'
import store from './store'
import router from './router'
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

import '@/icons' // icon

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

Vue.use(BaiduMap, {
  ak: 'mWbG0GAtvMKbSVZLMx0ZsmSGKgrlOT2M'
})
