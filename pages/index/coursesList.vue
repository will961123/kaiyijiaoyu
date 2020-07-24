<template>
	<view class="coursesListView bg-white">
		<view @click="navgater('/pages/index/videoDetails?id=' + item.id)" v-for="(item, index) in list" :key="index" class="item flex">
			<image :src="imgUrl + item.coverUri" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-around ">
				<view class="tit textov1">{{ item.title }}</view>
				<view class="info flex justify-between align-center">
					<view class="name">主讲人: {{ item.author }}</view>
					<view class="time">{{ item.publishedTime }}</view>
				</view>
				<view class="numBox flex  justify-between align-center">
					<view class="see">
						<text class="cuIcon cuIcon-video"></text>
						{{ item.pageView }}
					</view>
					<view class="time">
						<text class="cuIcon cuIcon-time"></text>
						{{item.duration}}
					</view>
				</view>
			</view>
		</view>
		<view class="endBox">———— 我是有底线的 ————</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			categoryId: '',
			page: 1,
			hasNext: true
		};
	},
	onLoad(options) {
		this.categoryId = Number(options.id) || 51;
		this.getList();
	},
	onReachBottom() {
		console.log(this.hasNext)
		if (this.hasNext) {
			this.getList();
		}
	},
	methods: {
		getList() {
			this.showLoading();
			this.request({
				url: '/app/web/video/page',
				method: 'POST',
				data: {
					categoryId: this.categoryId,
					pageNo: this.page,
					pageSize: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('列表', res);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						this.list.push(...res.data.data.data);
					}
				}
			});
		},
		navgater(path) {
			uni.navigateTo({
				url: path
			});
		}
	}
};
</script>

<style lang="scss">
.coursesListView {
	padding: 0 30rpx;
	.item {
		padding: 10px 0;
		& > image {
			width: 200rpx;
			height: 180rpx;
			border-radius: 15rpx;
			margin-right: 18rpx;
		}
		.infoBox {
			// flex: 1;
			width: calc(100% - 218rpx);
			.tit {
				width: 100%;
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
