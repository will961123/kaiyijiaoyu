<template>
	<view class="myCollectionView">
		<view class="title flex justify-between bg-gradual-blue ">
			<view style="flex: 1;"></view>
			<view style="flex: 1;text-align: center;" class="tit">全部订单</view>
			<view style="flex: 1;text-align: right;" class="edit">
				<text @click="showSelect = !showSelect">编辑</text>
				<text v-show="showSelect" style="margin-left: 15rpx;">删除</text>
			</view>
		</view>

		<view @click="navgater('/pages/index/videoDetails?id=') + item.courseId" v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<radio v-show="showSelect" :checked="item.select" @click="item.select = !item.select" value="" />
			<image :src="item.img" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-between ">
				<view class="tit">{{ item.title }}</view>
				<view class="info flex justify-between align-center">
					<view class="name">主讲人: {{ item.name }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
				<view class="numBox flex  justify-between align-center">
					<view class="see">
						<text class="cuIcon cuIcon-video"></text>
						123
					</view>
					<view class="time">
						<text class="cuIcon cuIcon-time"></text>
						13分55秒
					</view>
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
			list: [
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' }
			]
		};
	},
	onLoad() {},
	methods: {
		navgater(path) {
			uni.navigateTo({
				url: path
			});
		}
	}
};
</script>

<style lang="scss">
.myCollectionView {
	.title {
		padding: 10rpx 30rpx 40rpx 30rpx;
	}
	.item {
		padding: 15rpx;
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
			margin-left: 16rpx;
			.tit {
				font-weight: 700;
				font-size: 24rpx;
			}
			.info {
				font-size: 22rpx;
				margin: 16rpx 0;
				.name {
					color: #666;
				}
				.time {
					color: #999;
				}
			}
			.numBox {
				font-size: 24rpx;
				text {
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>
