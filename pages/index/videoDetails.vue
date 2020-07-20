<template>
	<view class="videoDetailsView bg-white">
		<video src="" controls></video>

		<view class="topInfo">
			<view class="title">{{ videoInfo.title }}</view>
			<view class="desc">{{ videoInfo.desc }}</view>
		</view>

		<view @click="navgater('/pages/index/openVip')" class="btnBox"><button class="cu-btn btn bg-gradual-blue">购买vip</button></view>

		<view class="numBox flex justify-between">
			<view class="see">浏览人数:112</view>
			<view class="like">
				收藏
				<text class="cuIcon cuIcon-like"></text>
			</view>
		</view>

		<view class="detailBox">
			<view class="titleBox flex align-center">
				<view @click="titIdx = 0" :class="{ select: titIdx === 0 }" class="item">目录</view>
				<view @click="titIdx = 1" :class="{ select: titIdx === 1 }" class="item">视频</view>
				<view @click="titIdx = 2" :class="{ select: titIdx === 2 }" class="item">简介</view>
			</view>

			<!-- 目录 -->
			<view class="listBox">
				<view v-for="(item, index) in list" :key="index" :class="{ select: nowIdx === index }" class="item   flex justify-between align-center">
					<view class="infoBox">
						<view class="tit">{{ item.title }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
					<button v-if="item.type === 1" class="cu-btn btn bg-gradual-blue">免费</button>
					<button @click="navgater('/pages/index/openVip')"  v-else class="cu-btn btn bg-gradual-blue  ">购买vip</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nowIdx: 2,
			titIdx: 0,
			list: [
				{ title: '标题外比巴卜', type: 1, time: '2020-05-06 10:10:10' },
				{ title: '标题外比巴卜', type: 1, time: '2020-05-06 10:10:10' },
				{ title: '标题外比巴卜', type: 1, time: '2020-05-06 10:10:10' },
				{ title: '标题外比巴卜', type: 2, time: '2020-05-06 10:10:10' },
				{ title: '标题外比巴卜', type: 2, time: '2020-05-06 10:10:10' }
			],
			videoInfo: {
				src: '',
				title: '标题外比巴卜',
				desc: '描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜描述外比巴卜',
				see: 123,
				like: false,
				desc2: '描述外比巴卜2',
				desc3: '描述外比巴卜3'
			}
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
.videoDetailsView {
	& > video {
		width: 100%;
	}
	.topInfo {
		padding: 0 30rpx;
		line-height: 1.8em;
		.title {
			font-weight: 700;
			font-size: 24rpx;
		}
		.desc {
			line-height: 1.6em;
			font-size: 22rpx;
			color: #999;
			text-indent: 2em;
		}
	}
	.btnBox {
		text-align: right;
		padding: 0 30rpx;
		.btn {
			margin-top: 8px;
			font-size: 22rpx;
			height: auto;
			padding: 8px 10px;
		}
	}
	.numBox {
		padding: 0 30rpx;
		line-height: 40px;
		font-weight: 700;
		border-bottom: 1rpx solid #ededed;
		.cuIcon {
			margin-left: 10rpx;
		}
	}
	.detailBox {
		.titleBox {
			line-height: 40px;
			padding: 0 46rpx;
			.item {
				flex: 1;
				text-align: center;
				border-bottom: 0px solid #1cbbb4;
				&.select {
					font-weight: 700;
					border-bottom: 2px solid #1cbbb4;
				}
			}
		}
		.listBox {
			padding: 0 30rpx;
			.item {
				padding: 10px 0;
				&.select {
					.infoBox {
						.tit {
							color: #1cbbb4;
						}
					}
				}
				.infoBox {
					.tit {
						font-size: 24rpx;
						font-weight: 700;
						margin-bottom: 8px;
					}
					.time {
						font-size: 22rpx;
						color: #999;
					}
				}
				.btn {
					min-width: 120rpx;
					font-size: 22rpx;
					height: 40rpx;
					line-height: 40rpx;
					break-inside: 20rpx;
					padding: 0;
				}
			}
		}
	}
}
</style>
