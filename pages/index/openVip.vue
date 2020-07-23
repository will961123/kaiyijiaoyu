<template>
	<view class="openVipView bg-white">
		<view class="headBox">
			<image src="../../static/logo.png" mode="aspectFill"></image>
			<view class="name">歪比巴卜</view>
		</view>

		<view
			v-for="(item, index) in list"
			:key="index"
			:class="index === 0 ? 'bg-black' : index === 1 ? 'bg-yellow' : index === 2 ? 'bg-orange' : 'bg-cyan'"
			class=" item flex align-center justify-between "
		>
			<view class="flex flex-direction justify-between">
				<view class="name text-bold">
					{{ item.name }}
					<text>￥{{ item.price }}</text>
					<text v-if="false" class="text-red">【已购买】</text>
				</view>
				<view class="desc">{{ item.note }}</view>
			</view>
			<label @click="checkedIdx = index" class="radio"><radio :checked="checkedIdx === index" style="transform: scale(.8);" color="red" value="" /></label>
		</view>

		<button @click="createOrder" class="btn cu-btn bg-gradual-blue">立即支付</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checkedIdx: -1,
			list: []
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		createOrder() {
			if (this.checkedIdx < 0) {
				uni.showModal({
					title: '提示',
					content: '请选择会员!',
					showCancel: false
				});
				return false;
			}
			let formData = {
				vipIds: [this.list[this.checkedIdx].id]
			};
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
		getWxPayConfig(orderId) {
			this.request({
				url: '/app/web/customer/order/pay/' + orderId,
				method: 'POST',
				success: res => {
					uni.hideLoading();
					console.log('getWxPayConfig', res);
				}
			});
		},
		getList() {
			this.request({
				url: '/app/web/vip/list',
				method: 'POST',
				success: res => {
					console.log('vipList', res);
					if (res.data.code === 200) {
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
