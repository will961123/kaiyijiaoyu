<template>
	<view class="teamListView">  
		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<image :src="item.img" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="name">{{ item.name }}</view>
				<view class="time">邀请日期：{{ item.time }}</view>
			</view>
		</view> 
	</view>
</template>

<script>
export default {
	data() {
		return { 
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
.teamListView { 
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
