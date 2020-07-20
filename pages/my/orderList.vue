<template>
	<view class="orderListView">
		<view class="title flex justify-between bg-gradual-blue ">
			<view style="flex: 1;"></view>
			<view style="flex: 1;text-align: center;" class="tit">全部订单</view>
			<view style="flex: 1;text-align: right;" class="edit">
				<text @click="showSelect=!showSelect" >编辑</text>
				<text v-show="showSelect" style="margin-left: 15rpx;" >删除</text>
			</view>
		</view>

		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<radio v-show="showSelect" :checked="item.select" @click="item.select=!item.select" value="" />
			<image :src="item.img" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="name">{{ item.name }}</view>
				<view class="time">下单时间：{{ item.orderTime }}</view>
				<view class="time" v-if="item.payTime">支付时间：{{ item.payTime }}</view>
			</view>
			<view class="btnBox">
				<view class="money">{{ item.money }}</view>
				<view v-if="!item.payTime" class="btn bg-gradual-blue cu-btn">立即支付</view>
				<view v-else class="type text-red">已支付</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showSelect:false,
			list: [
				{
					img: '/static/logo.png',
					name: '歪比巴布',
					orderTime: '2020-2020-2020',
					payTime: '2020-2020-2020',
					money: '36.50',
					orderId: '123',
					select:false
				},
				{
					img: '/static/logo.png',
					name: '歪比巴布',
					orderTime: '2020-2020-2020',
					money: '36.50',
					orderId: '123',
					select:true
				}
			]
		};
	}
};
</script>

<style lang="scss">
.orderListView {
	.title {
		padding: 10rpx 30rpx 40rpx 30rpx;
	}
	.item {
		padding: 15rpx;
		border: 1rpx solid #deded;
		radio{
			transform:scale(.8);
			margin-right: 15rpx;
		}
		& > image {
			width: 180rpx;
			height: 140rpx;
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
}
</style>
