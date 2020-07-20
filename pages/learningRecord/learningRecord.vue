<template>
	<view class="learningRecordView bg-white">
		<view class="iptBox flex align-center">
			<input v-model="searchStr" type="text" value=""  placeholder="搜索课程" />
			<text class="cuIcon cuIcon-search"></text>
			<button  class="cu-btn btn bg-gradual-blue">搜索</button>
		</view>
		
		<view @click="navgater('/pages/index/videoDetails?id=') + item.courseId" v-for="(item, index) in latestCourses" :key="index" class="item flex">
			<image :src="item.img" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-around ">
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
			searchStr:'',
			latestCourses: [
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' },
				{ img: '/static/logo.png', title: '歪比巴卜歪比巴卜', courseId: 1, name: '李拴蛋', time: '2020.03.10' }
			]
		};
	},
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
.learningRecordView {
	padding: 0 30rpx;
	padding-top: 14px;
	.iptBox{
		border: 1px solid #15adc6;
		border-radius: 15rpx;
		overflow: hidden;
		margin-bottom: 14px;
		input{
			flex: 1;
			font-size: 24rpx;
			padding-left: 30rpx;
		}
		.cuIcon{
			font-size: 38rpx;
			margin-right: 20rpx;
			color: #999;
		}
		button{
			padding-left: 60rpx;
			padding-right: 60rpx;
			font-size: 24rpx;
		}
	}
	.item {
		padding: 10px 0;
		& > image {
			width: 200rpx;
			height: 180rpx;
			border-radius: 15rpx;
			margin-right: 18rpx;
		}
		.infoBox {
			flex: 1;
			.tit {
				font-weight: 700;
				font-size: 24rpx;
			}
			.info {
				font-size: 22rpx;
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
