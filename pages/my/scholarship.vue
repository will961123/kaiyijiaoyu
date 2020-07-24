<template>
	<view class="scholarshipView">
		<view class="topInfo bg-gradual-purple">
			<view class="headBox flex align-center justify-between">
				<view class="flex align-center text-sm">
					<image :src="userInfo.customer.headimgurl" mode="aspectFill"></image>
					<view class="lv">{{ userInfo.customer.nickName }} <text style="margin-left: 8rpx;" v-if="userInfo.vips" v-for="(item, index) in userInfo.vips" :key="index"> {{ item.name }}</text></view>
				</view>
				<navigator url="/pages/index/openVip" class="btn cu-btn bg-gradual-blue">
					<text class="cuIcon cuIcon-vip"></text>
					升级会员
				</navigator>
			</view>
			<view class="numBox text-center">
				<view>奖学金(元)</view>
				<navigator url="/pages/my/teamList" class="num text-bold">￥{{ totMoney|filterMoney }}</navigator>
			</view>
			<navigator url="/pages/my/withdrawal" class="getMoney btn cu-btn bg-gradual-red">提现</navigator>
		</view>

		<view class="titleBox flex text-center">
			<view @click="changeTitIdx(0)" :class="{ select: titidx === 0 }" class="item">
				已邀请
				<text class="text-blue">普通</text>
				会员:{{list[0].length}}
			</view>
			<view @click="changeTitIdx(1)" :class="{ select: titidx === 1 }" class="item">
				已邀请
				<text class="text-blue">VIP</text>
				会员:{{list[1].length}}
			</view>
		</view>
		<view v-for="(item, index) in list[titidx]" :key="index" class="item bg-white flex align-center">
			<image :src="item.headimgurl" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="name">{{ item.nickName }}</view>
				<view class="time">邀请日期：{{ item.subscribeTime }}</view>
			</view>
		</view>

		<will-nodata v-if="list[titidx].length === 0" tittle="暂无数据!"></will-nodata>

		<view class="invitation btn cu-btn bg-gradual-blue">邀请学员</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: { },
			totMoney: 0,
			titidx: 0, // 1会员 0免费
			list: [[], []],
			page: [1, 1],
			hasNext: [true, true]
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
		this.getTotMoney();
		this.getList(this.titidx);
		this.getList(1);
	},
	onReachBottom() {
		if (this.hasNext[this.titidx]) {
			this.getList(this.titidx);
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
		changeTitIdx(type) {
			if (this.titidx === type) {
				return false;
			}
			this.titidx = type;
			// this.getList(this.titidx);
		},
		getList(type) {
			this.showLoading();
			this.request({
				url: '/app/web/customer/student',
				method: 'POST',
				data: {
					pageNo: this.page[type],
					pageSize: 10,
					type
				},
				success: res => {
					uni.hideLoading();
					console.log('list', res.data.data);
					if (res.data.code === 200) {
						this.page[type]++;
						this.hasNext[type] = res.data.data.hasNext;
						this.list[type].push(...res.data.data.data);
					}
				}
			});
		},
		getTotMoney() {
			this.showLoading();
			this.request({
				url: '/app/web/customer/bonus/amount',
				method: 'POST',
				success: res => {
					uni.hideLoading();
					console.log('totMoney', res);
					if (res.data.code === 200) {
						this.totMoney = res.data.data.toFixed(2);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.scholarshipView {
	padding-bottom: 40px;
	.topInfo {
		padding: 16rpx 30rpx 30rpx 30rpx;
		.headBox {
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-right: 16rpx;
				background-color: #ededed;
			}
			.btn {
				padding: 2px 6px;
				font-size: 24rpx;
				border-radius: 16rpx;
			}
		}
		.numBox {
			padding: 20px 0 0 0;
			.num {
				margin-top: 16px;
			}
		}
		.getMoney {
			display: block;
			margin: 0 auto;
			width: 6em;
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 10rpx;
			font-size: 24rpx;
			margin-top: 50px;
		}
	}
	.titleBox {
		margin: 10px 0;
		.item {
			flex: 1;
			border-bottom: 0px solid #058af3;
			&.select {
				border-bottom: 2px solid #058af3;
			}
		}
	}
	.item {
		padding: 15rpx;
		border: 1rpx solid #deded;
		radio {
			transform: scale(0.8);
			margin-right: 15rpx;
		}
		& > image {
			width: 90rpx;
			height: 90rpx;
		}
		.infoBox {
			flex: 1;
			margin-left: 18rpx;
			font-size: 24rpx;
			.name {
				font-weight: 700;
				line-height: 1.6em;
			}
			.time {
				font-size: 22rpx;
				line-height: 1.8em;
			}
		}
		.btnBox {
			.money {
				line-height: 1.6em;
				font-weight: 700;
			}
			.btn {
				font-size: 24rpx;
				padding: 6px 8px;
				border-radius: 14rpx;
			}
		}
	}
	.invitation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
