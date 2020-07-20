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
	</view>
</template>

<script>
export default {
	data() {
		return {
			checkedIdx: -1,
			list: [
				{ name: '执行力篇', money: 36.5, desc: '歪比巴卜歪比巴卜歪比巴卜歪比巴卜', type: -1 },
				{ name: '执行力篇', money: 36.5, desc: '歪比巴卜歪比巴卜歪比巴卜歪比巴卜', type: 1 },
				{ name: '执行力篇', money: 36.5, desc: '歪比巴卜歪比巴卜歪比巴卜歪比巴卜', type: -1 },
				{ name: '执行力篇', money: 36.5, desc: '歪比巴卜歪比巴卜歪比巴卜歪比巴卜', type: -1 }
			]
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		
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
