<template>
	<view class="learningRecordView bg-white">
		<view class="iptBox flex align-center">
			<input v-model="searchStr" type="text" value="" placeholder="搜索课程" />
			<text class="cuIcon cuIcon-search"></text>
			<button @click="search" class="cu-btn btn bg-blue">搜索</button>
		</view>

		<view @click="navgater('/pages/index/videoDetails?id=' + item.videoId)" v-for="(item, index) in latestCourses" :key="index" class="item flex">
			<image :src="imgUrl + item.coverUri" mode="widthFix"></image>
			<view class="infoBox flex flex-direction justify-around ">
				<view class="tit">{{ item.name }}</view>
				<view class="info flex justify-between align-center">
					<view class="name">主讲人: {{ item.author }}</view>
					<view class="time">{{ item.updateTime.split(' ')[0] }}</view>
				</view>
				<view class="numBox flex  justify-between align-center">
					<view class="see">
						<text class="cuIcon cuIcon-video"></text>
						{{ item.pageView }}
					</view>
					<!-- 	<view class="time">
						<text class="cuIcon cuIcon-time"></text>
						13分55秒
					</view> -->
				</view>
			</view>
		</view>
		
		<will-nodata v-if="latestCourses.length==0" title="暂无数据!" ></will-nodata>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchStr: '',
			latestCourses: [],
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
		search() {
			// if(!this.searchStr){
			// 	return false
			// }
			this.page = 1;
			this.hasNext = true;
			this.latestCourses = [];
			this.getList()
		},
		getList() {
			this.showLoading();
			this.request({
				url: '/app/web/customer/learn/page',
				method: 'POST',
				data: {
					pageNo: this.page,
					pageSize: 10,
					name: this.searchStr
				},
				success: res => {
					uni.hideLoading();
					console.log('记录', res);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						this.latestCourses.push(...res.data.data.data);
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
	page{
		background-color: #fff;
	}
.learningRecordView {
	padding: 0 30rpx;
	padding-top: 14px;
	.iptBox {
		border: 1px solid #439387;
		border-radius: 15rpx;
		overflow: hidden;
		margin-bottom: 14px;
		input {
			flex: 1;
			font-size: 24rpx;
			padding-left: 30rpx;
		}
		.cuIcon {
			font-size: 38rpx;
			margin-right: 20rpx;
			color: #999;
		}
		button {
			padding-left: 60rpx;
			padding-right: 60rpx;
			font-size: 24rpx;
		}
	}
	.item {
		padding: 10px 0;
		& > image {
			width: 240rpx;
			height: 160rpx;
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
