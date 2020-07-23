import Vue from 'vue'
import App from '@/App'
import QQMapWX from './qqmap-wx-jssdk.js';
Vue.prototype.qqmap = new QQMapWX({
	key: 'LKVBZ-RATWD-KBD4N-HSW3M-HWJZF-JJFN5' // 必填
});
Vue.prototype.isLoad = function() {
	if (!uni.getStorageSync('token')) {
		return false
	} else {
		return true
	}
}
Vue.prototype.checkLogin = function() {
	return new Promise((reslove, reject) => {
		if (uni.getStorageSync('token')) {
			reslove()
			console.log('已登录')
		} else {
			reject()
			console.log('未登录')
			// uni.redirectTo({
			// 	url: '/pages/login/wxLogin'
			// })
		}
	})

}
Vue.prototype.getToken = function() {
	// #ifdef H5
	return uni.getStorageSync('token') || ''
	// #endif
	// #ifndef H5
	return uni.getStorageSync('token') || ''
	// #endif

}
// 请求
Vue.prototype.request = function(obj) {
	var header = obj.header || {}
	let token = uni.getStorageSync("token");
	if (token) {
		header['token'] = token
	}
	uni.request({
		url: this.apiUrl + obj.url,
		method: obj.method || "GET",
		header: header,
		data: obj.data || {},
		success: res => {
			if (res.data.code === 3) {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userInfo')
				uni.showToast({
					title: '登录超时!',
					icon: 'none',
					mask: true
				})
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
			typeof obj.success == "function" && obj.success(res)
		},
		fail: res => {
			typeof obj.fail == "function" && obj.fail(res)
		}
	})
}
// showToast
Vue.prototype.showToast = function(title, mask = false) {
	uni.showToast({
		title: title,
		icon: 'none',
		mask: mask
	})
}
// showLoading
Vue.prototype.showLoading = function(title = '加载中...', mask = true) {
	uni.showLoading({
		title: title,
		mask: mask
	})
}
// 手机正则
Vue.prototype.checkPhone = function(phone) {
	if (!(/^1[3456789]\d{9}$/.test(phone))) {
		return false;
	}
	return true;
}
// 阻止实体键返回_跳转
Vue.prototype.POP = function() {
	uni.switchTab({
		url: '/pages/index/index'
	});
}
// 阻止实体键返回_监听
Vue.prototype.addPOP = function(fn) {
	if (window.history && window.history.pushState) {
		console.log('支持监听返回键');
		history.pushState(null, null, document.URL);
		window.addEventListener('popstate', fn, false);
	}
}
// 阻止实体键返回_卸载 
Vue.prototype.removePOP = function(fn) {
	window.removeEventListener('popstate', fn, false);
}
