<template>
	<view class="scholarshipView">
		<view class="topInfo bg-gradual-purple">
			<view class="headBox flex align-center justify-between">
				<view class="flex align-center text-sm">
					<image :src="userInfo.img" mode="aspectFill"></image>
					<view class="lv">{{ userInfo.name }} {{ userInfo.lv }}</view>
				</view>
				<navigator url="/pages/index/openVip" class="btn cu-btn bg-gradual-blue">
					<text class="cuIcon cuIcon-vip"></text>
					升级会员
				</navigator>
			</view>
			<view class="numBox text-center">
				<view>奖学金(元)</view>
				<navigator url="/pages/my/teamList" class="num text-bold">
					￥131.40
				</navigator>  
			</view>
			<navigator url="/pages/my/withdrawal" class="getMoney btn cu-btn bg-gradual-red"> 
				提现
			</navigator> 
		</view>

		<view class="titleBox flex text-center">
			<view @click="titidx = 0" :class="{ select: titidx === 0 }" class="item">
				已邀请
				<text class="text-blue">VIP</text>
				会员:3
			</view>
			<view @click="titidx = 1" :class="{ select: titidx === 1 }" class="item">
				已邀请
				<text class="text-blue">普通</text>
				会员:3
			</view>
		</view>
		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<image :src="item.img" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="name">{{ item.name }}</view>
				<view class="time">邀请日期：{{ item.time }}</view>
			</view>
		</view>
		
		<view class="invitation btn cu-btn bg-gradual-blue">
			邀请学员
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titidx: 0,
			userInfo: {
				img: '/static/logo.png',
				name: '歪比',
				lv: '管理力篇'
			},
			list: [
				{
					img: '/static/logo.png',
					name: '歪比巴布',
					time: '2020-2020-2020'
				},
				{
					img: '/static/logo.png',
					name: '歪比巴布',
					time: '2020-2020-2020'
				}
			]
		};
	}
};
</script>

<style lang="scss">
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
	.invitation{
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
