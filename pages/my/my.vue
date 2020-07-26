<template>
	<view class="myView bg-white">
		<view class="topInfo bg-gradual-blue">
			<view class="headBox flex align-center">
				<image :src="userInfo.customer.headimgurl" mode="aspectFill"></image>
				<view class="info">
					<view class="name">昵称: {{ userInfo.customer.nickName }}</view>
					<view class="lv">
						会员等级:
						<text style="margin-left: 8rpx;" v-if="userInfo.vips" v-for="(item, index) in userInfo.vips" :key="index">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<view style="padding: 0 30rpx;">
			<view @click="hanlderClick(index)" v-for="(item, index) in navgaterList" :key="index" class="item flex align-center">
				<image :src="item.pic" mode="widthFix"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="endBox">{{ supportStr }}</view>

		<view v-if="showPoster" @click.self="showPoster = false" class="mc">
			<view @click.stop="" class="mcContent text-white">
				<text @click="showPoster = false" class="cuIcon cuIcon-roundclosefill"></text>
				<image :src="imgUrl + poster" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			supportStr: '',
			phone: '',
			navgaterList: [
				{
					pic: '/static/my1.png',
					name: '我的订单',
					path: '/pages/my/orderList'
				},
				{
					pic: '/static/my2.png',
					name: '奖学金',
					path: '/pages/my/scholarship'
				},
				{
					pic: '/static/my3.png',
					name: '升级VIP',
					path: '/pages/index/openVip'
				},
				{
					pic: '/static/my4.png',
					name: '分享海报',
					path: ''
				},
				{
					pic: '/static/my5.png',
					name: '我的收藏',
					path: '/pages/my/myCollection'
				},
				{
					pic: '/static/my6.png',
					name: '联系我们',
					path: ''
				}
			],
			poster: '',
			showPoster: false,
			userInfo: {}
		};
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
	onLoad() {
		this.getSupport();
		this.getPhone();
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
		getPhone() {
			this.request({
				url: '/app/web/common/contact/phone',
				method: 'POST',
				success: res => {
					console.log('phone', res);
					if (res.data.code === 200) {
						this.phone = res.data.data;
					}
				}
			});
		},
		getSupport() {
			this.request({
				url: '/app/web/common/technical/support',
				method: 'POST',
				success: res => {
					console.log('support', res);
					if (res.data.code === 200) {
						this.supportStr = res.data.data;
					}
				}
			});
		},
		getPoster() {
			this.showLoading()
			this.request({
				url: '/app/web/support/qrcode',
				success: res => {
					uni.hideLoading()
					console.log('获取海报', res);
					if (res.data.code === 200) {
						this.poster =   res.data.data;
						this.showPoster = true
					}
				}
			});
		},
		hanlderClick(idx) {
			if (idx === 3) {
				if (this.poster) {
					this.showPoster = true;
					return false;
				}else{
					this.getPoster()
				}
			} else if (idx === 5) {
				uni.showActionSheet({
					itemList: ['呼叫', '复制'],
					// itemList: ['呼叫', '复制', '添加到手机通讯录'],
					success: res => {
						if (res.tapIndex === 0) {
							uni.makePhoneCall({
								phoneNumber: String(this.phone)
							});
						} else if (res.tapIndex === 1) {
							uni.setClipboardData({ data: String(this.phone) });
						} else {
						}
					}
				});
			} else {
				uni.navigateTo({
					url: this.navgaterList[idx].path
				});
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.mc {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	padding: 20px 30rpx;
	.mcContent {
		// width: calc(100% - 60rpx);
		width: 100%;
		height: 100%;
		.cuIcon {
			position: absolute;
			right: 20rpx;
			top: 10px;
			z-index: 999;
			font-size: 40rpx;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.myView {
	.topInfo {
		padding: 40px 0 70px 60px;
		.headBox {
			image {
				width: 140rpx;
				height: 140rpx;
				border: 2px solid #ffffff;
				border-radius: 50%;
				margin-right: 16rpx;
				background-color: #ededed;
			}
			.info {
				font-size: 24rpx;
				.name {
					margin-bottom: 10px;
				}
			}
		}
	}
	.item {
		height: 60px;
		border-bottom: 1rpx solid #ededed;
		image {
			width: 60rpx;
			margin-right: 16rpx;
		}
	}
}
</style>
