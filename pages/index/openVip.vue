<template>
	<view class="openVipView bg-white">
		<view class="headBox">
			<image :src="userInfo.customer.headimgurl" mode="aspectFill"></image>
			<view class="name">{{ userInfo.customer.nickName }}</view>
		</view>

		<view
			v-for="(item, index) in list"
			:key="index"
			:class="index === 0 ? 'bg-black' : index === 1 ? 'bg-yellow' : index === 2 ? 'bg-orange' : 'bg-cyan'"
			class=" item flex align-center justify-between "
			@click="item.select = !item.select"
		>
			<view class="flex flex-direction justify-between">
				<view class="name text-bold">
					{{ item.name }}
					<text>￥{{ item.price | filterMoney }}</text>
					<text v-if="item.alreadyPayVip" class="text-red">【已购买】</text>
				</view>
				<view class="desc">{{ item.note }}</view>
			</view>
			<label class="radio"><radio :checked="item.select" style="transform: scale(.8);" color="red" value="" /></label>
		</view>

		<button @click="createOrder" class="btn cu-btn bg-gradual-blue">立即支付</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			userInfo: {}
		};
	},
	onLoad() {
		this.getList();
	},
	onShow() {
		let userInfo = uni.getStorageSync('userInfo') || '';
		if (!userInfo) {
			this.getUserInfo();
		} else {
			this.userInfo = userInfo;
			console.log(userInfo);
		}
	},
	filters: {
		filterMoney(val) {
			return (val / 100).toFixed(2);
		}
	},
	methods: {
		getUserInfo() {
			this.request({
				url: '/app/web/support/token',
				method: 'POST',
				success: res => {
					console.log('userInfo', res);
					if (res.data.code === 200) {
						uni.setStorageSync('userInfo', res.data.data);
						this.userInfo = res.data.data;
					}
				}
			});
		},
		createOrder() {
			let ids = [];
			for (let idx in this.list) {
				if (this.list[idx].select) {
					ids.push(this.list[idx].id);
				}
			} 
			if (ids.length == 0) {
				uni.showModal({
					title: '提示',
					content: '请选择会员!',
					showCancel: false
				});
				return false;
			}
			let formData = { 
				vipIds: ids
			}; 
			// if (this.checkedIdx < 0) {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '请选择会员!',
			// 		showCancel: false
			// 	});
			// 	return false;
			// }
			// let formData = {
			// 	vipIds: [this.list[this.checkedIdx].id]
			// };
			this.showLoading();
			this.request({
				url: '/app/web/customer/order/add',
				data: formData,
				method: 'POST',
				success: res => {
					console.log('createOrder', res);
					this.getWxPayConfig(res.data.data);
				}
			});
		},
		// 获取微信支付参数
		getWxPayConfig(orderId) {
			this.request({
				url: '/app/web/customer/order/pay/' + orderId,
				method: 'POST',
				success: res => {
					console.log('getWxPayConfig', res);
					// this.wxPaying(orderId, res.data.data);
					this.wxPaying(res.data.data);
				}
			});
		},
		wxPaying(config) {
			var that = this;
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				{
					appId: config.appid, //公众号名称，由商户传入
					timeStamp: config.timeStamp, //时间戳，自1970年以来的秒数
					nonceStr: config.nonceStr, //随机串
					package: 'prepay_id=' + config.prepayId,
					signType: config.signType, //微信签名方式：
					paySign: config.paySign //微信签名
				},
				function(res) {
					uni.hideLoading();
					if (res.err_msg == 'get_brand_wcpay_request:ok') {
						uni.showModal({
							title: '提示!',
							content: '支付成功!',
							showCancel: false
						});
						that.getUserInfo();
						console.log('支付成功了');
					} else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
						uni.showModal({
							title: '提示!',
							content: '您取消了支付!',
							showCancel: false
						});
						console.log('您取消了支付，请重新支付');
					} else if (res.err_msg == 'get_brand_wcpay_request:fail') {
						uni.showModal({
							title: '提示!',
							content: '支付失败!',
							showCancel: false
						});
						console.log('支付失败，请重新支付');
					} else {
						uni.showModal({
							title: '提示!',
							content: '支付失败!',
							showCancel: false
						});
						console.log('支付失败',res);
						alert(res.errMsg||res.err_msg)
					}
				}
			);
		},

		// 微信支付
		// wxPaying(id, config) {
		// 	let pageUrl = window.location.href;
		// 	// openid: 'oec-Ww_wKfGBX6bMT3uXgbw-j6VM',
		// 	this.wxSdk({
		// 		pageUrl: pageUrl,
		// 		success: rescus => {
		// 			console.log('生成wx订单成功', rescus);
		// 			this.wx.chooseWXPay({
		// 				timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名
		// 				nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
		// 				package: config.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
		// 				signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		// 				paySign: config.paySign, // 支付签名
		// 				success: zres => {
		// 					uni.hideLoading();
		// 					// 支付成功后的回调函数
		// 					console.log('吊起支付', zres);
		// 					this.editOrderState();
		// 				},
		// 				fail: res => {
		// 					uni.hideLoading();
		// 					uni.showToast({
		// 						title: res.data.message || '支付失败！',
		// 						icon: 'none'
		// 					});
		// 				}
		// 			});
		// 		},
		// 		fail: function(err) {
		// 			uni.hideLoading();
		// 			uni.showToast({
		// 				title: res.data.message || '支付失败！',
		// 				icon: 'none'
		// 			});
		// 			console.log('支付失败', err);
		// 		}
		// 	});
		// },
		getList() {
			this.request({
				url: '/app/web/vip/list',
				method: 'POST',
				success: res => {
					console.log('vipList', res);
					if (res.data.code === 200) {
						if (this.userInfo.vips.length > 0) {
							for (let vipidx in this.userInfo.vips) {
								for (let idx in res.data.data) {
									if (this.userInfo.vips[vipidx].categoryId === res.data.data[idx].categoryId) {
										res.data.data[idx].alreadyPayVip = true;
									}
								}
							}
						}
						res.data.data = res.data.data.map(i => {
							i.select = false;
							return i;
						});
						this.list = res.data.data;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.openVipView {
	padding: 0 70rpx;
	min-height: 100vh;
	padding-bottom: 50px;
	.btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.headBox {
		padding: 26rpx 0 0 0;
		text-align: center;
		& > image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
		}
		.name {
			font-size: 22rpx;
			color: #666;
			margin-top: 8px;
		}
	}
	.item {
		padding: 20rpx;
		border-radius: 24rpx;
		margin-top: 26px;
		.name {
			margin-bottom: 10px;
		}
		.desc {
			font-size: 24rpx;
		}
	}
}
</style>
