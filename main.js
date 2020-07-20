import Vue from 'vue'
import App from './App'
import '@/components/ican-H5Api/ican-H5Api'	//h5对齐api
import "./etc/etc.js"
import "./util/will_util.js"

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
