<template>
	<view class="myCollectionView">
		<view class="title flex justify-between bg-gradual-blue ">
			<view style="flex: 1;"></view>
			<view style="flex: 1;text-align: center;" class="tit">全部收藏</view>
			<view style="flex: 1;text-align: right;" class="edit">
				<text @click="showSelect = !showSelect">编辑</text>
				<text @click="del" v-show="showSelect" style="margin-left: 15rpx;">删除</text>
			</view>
		</view>

		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<radio v-show="showSelect" :checked="item.select" @click="item.select = !item.select" value="" />
			<image @click.stop="navgater('/pages/index/videoDetails?id=' + item.videoId)" :src="imgUrl + item.coverUri" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-between ">
				<view class="tit">{{ item.name }}</view>
				<view class="info flex justify-between align-center">
					<view class="name">主讲人: {{ item.author }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
				<view class="numBox flex  justify-between align-center">
					<view class="see">
						<text class="cuIcon cuIcon-video"></text>
						{{ item.pageView }}
					</view>
					<view class="time">
						<text class="cuIcon cuIcon-time"></text>
						{{ item.duration }}
					</view>
				</view>
			</view>
		</view>
		
		<will-nodata v-if="list.length == 0" tittle="暂无数据"></will-nodata>
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
	methods: {
		del() {
			let formData = this.list.filter(i => {
				return i.select === true;
			});
			if (formData.length === 0) {
				uni.showModal({
					title: '提示',
					content: '请选择收藏!',
					showCancel: false
				});
				return false;
			}
			formData = formData.map(i => {
				return i.videoId;
			});
			this.showLoading();
			this.request({
				url: '/app/web/customer/favorites/cancel/999',
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
							content: '取消收藏成功!',
							showCancel: false
						});
					}
				}
			});
		},
		getList() {
			this.showLoading();
			this.request({
				url: '/app/web/customer/favorites/page',
				method: 'POST',
				data: {
					pageNo: this.page,
					pageSize: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('collection', res);
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
.myCollectionView {
	.title {
		padding: 16px 30rpx;
	}
	.item {
		padding: 15rpx;
		border: 1rpx solid #deded;
		radio {
			transform: scale(0.8);
			margin-right: 15rpx;
		}
		& > image {
			width: 240rpx;
			height: 160rpx;
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
