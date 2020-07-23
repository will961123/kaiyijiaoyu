<template>
	<view class="myView bg-white">
		<view class="topInfo bg-gradual-blue">
			<view class="headBox flex">
				<image :src="userInfo.img" mode="aspectFill"></image>
				<view class="info">
					<view class="name">昵称: {{ userInfo.name }}</view>
					<view class="lv">会员等级: {{ userInfo.lv }}</view>
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

		<view  v-if="showPoster" @click.self="showPoster = false" class="mc">
			<view @click.stop="" class="mcContent"><image :src="imgUrl + poster" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			supportStr: '',
			phone: '',
			userInfo: {
				img: '/static/logo.png',
				name: '歪比',
				lv: '管理力篇'
			},
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
			poster: '2157CB76554000E49EC09FC2E83E4D2A.jpeg',
			showPoster: false
		};
	},
	onLoad() {
		this.getSupport();
		this.getPhone();
	},
	methods: {
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
		hanlderClick(idx) {
			if (idx === 3) {
				if (this.poster) {
					this.showPoster = true;
					return false;
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
		image {
			width: 100%;
			max-height: 100%;
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
