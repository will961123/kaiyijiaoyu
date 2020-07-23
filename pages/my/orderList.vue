<template>
	<view class="orderListView">
		<view class="title flex justify-between bg-gradual-blue ">
			<view style="flex: 1;"></view>
			<view style="flex: 1;text-align: center;" class="tit">全部订单</view>
			<view style="flex: 1;text-align: right;" class="edit">
				<text @click="showSelect = !showSelect">编辑</text>
				<text @click="del" v-show="showSelect" style="margin-left: 15rpx;">删除</text>
			</view>
		</view>
		<view v-for="(item, index) in list" :key="index" class="order">
			<view v-for="(goods, idx) in item.items" :key="idx" class="item bg-white flex align-center">
				<radio v-show="showSelect" :checked="item.select" @click="item.select = !item.select" value="" />
				<!-- <image :src="item.img" mode="aspectFill"></image> -->
				<view class="infoBox">
					<view class="name">{{ goods.name }}</view>
					<view class="time">下单时间：{{ goods.createTime }}</view>
					<view class="time" v-if="item.payTime">支付时间：{{ item.payTime }}</view>
				</view>
				<view class="btnBox">
					<view class="money">{{ goods.price | filterMoney }}</view>
					<view v-if="!item.payTime && idx == item.items.length - 1" class="btn bg-gradual-blue cu-btn">立即支付</view>
					<view v-if='item.payTime ' class="type text-red">已支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showSelect: false,
			list: [],
			page: 1,
			hasNext: true
		};
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		if (this.hasNext) {
			this.getList();
		}
	},
	filters: {
		filterMoney(val) {
			return (val / 100).toFixed(2);
		}
	},
	methods: {
		del() {
			let formData = this.list.filter(i => {
				return i.select === true;
			});
			if (formData.length === 0) {
				uni.showModal({
					title: '提示',
					content: '请选择订单!',
					showCancel: false
				});
				return false;
			}
			formData = formData.map(i => {
				return i.order.id;
			});
			this.showLoading();
			this.request({
				url: '/app/web/customer/order/delete',
				method: 'POST',
				data: formData,
				success: res => {
					uni.hideLoading();
					console.log('del', res);
					if (res.data.code === 200) {
						uni.hideLoading();
						this.page = 1;
						this.hasNext = true;
						this.list = [];
						this.getList();
						uni.showModal({
							title: '提示',
							content: '删除订单成功!',
							showCancel: false
						});
					}
				}
			});
		},
		getList() {
			this.showLoading();
			this.request({
				url: '/app/web/customer/order/page',
				method: 'POST',
				data: {
					pageNo: this.page,
					pageSize: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('orderList', res.data.data.data);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						res.data.data.data = res.data.data.data.map(i => {
							i.select = false;
							return i;
						});
						this.list.push(...res.data.data.data);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.orderListView {
	.title {
		padding: 10rpx 30rpx 40rpx 30rpx;
	}
	.order {
		border-bottom: 1px solid #999; 
	}
	.item {
		padding: 20rpx 15rpx;
		border: 1rpx solid #deded;
		radio {
			transform: scale(0.8);
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
