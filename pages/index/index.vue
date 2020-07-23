<template>
	<view class="indexView">
		<swiper class="sw" :indicator-dots="true" :autoplay="true">
			<swiper-item
				@click="navgater(item.type === 2 ? '/pages/index/openVip' : '/pages/index/videoDetails?id=' + item.categoryId)"
				v-for="(item, index) in bannerList"
				:key="index"
			>
				<!-- :style="{backgroundImage:'url('+imgUrl + item.uri+')'}" -->
				<image :src="imgUrl + item.uri" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<view class="navList bg-white flex align-center justify-around ">
			<view @click="navgater('/pages/index/coursesList?id=' + item.categoryId)" v-for="(item, index) in navList" :key="index" class="item flex align-center flex-direction">
				<image :src="item.img" mode="aspectFill"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="section freeCategory bg-white">
			<view class="title">免费课程</view>
			<scroll-view class="sv" scroll-x="true">
				<view @click="navgater('/pages/index/videoDetails?id=' + item.id)" v-for="(item, index) in freeCategoryList" :key="index" class="item text-center">
					<image :src="imgUrl + item.coverUri" mode="aspectFill"></image>
					<view class="textov1">{{ item.title }}</view>
				</view>
			</scroll-view>
		</view>

		<view class="gotoVip"><image @click="navgater('/pages/index/openVip')" :src="imgUrl + adInfo.uri" mode="widthFix"></image></view>

		<view class="section latestCourses bg-white">
			<view class="title">最新课程</view>
			<view @click="navgater('/pages/index/videoDetails?id=' + item.id)" v-for="(item, index) in latestCourses" :key="index" class="item flex">
				<image :src="imgUrl + item.coverUri" mode="aspectFill"></image>
				<view class="infoBox flex flex-direction justify-between">
					<view class="tit textov1">{{ item.title }}</view>
					<view class="info flex justify-between align-center">
						<view class="name">主讲人: {{ item.author }}</view>
						<view class="time">{{ item.publishedTime }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="section latestCourses bg-white">
			<view class="title">凯一专栏</view>
			<view @click="navgater('/pages/index/videoDetails?id=' + item.id)" v-for="(item, index) in kaiyiList" :key="index" class="item flex">
				<image :src="imgUrl + item.coverUri" mode="aspectFill"></image>
				<view class="infoBox flex flex-direction justify-between">
					<view class="tit textov1">{{ item.title }}</view>
					<view class="info flex justify-between align-center">
						<view class="name">主讲人: {{ item.author }}</view>
						<view class="time">{{ item.publishedTime }}</view>
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
			bannerList: [],
			adInfo: {},
			navList: [
				{ img: '/static/index1.png', name: '执行力篇', categoryId: 51 },
				{ img: '/static/index2.png', name: '管理力篇', categoryId: 52 },
				{ img: '/static/index3.png', name: '领导力篇', categoryId: 53 },
				{ img: '/static/index4.png', name: '家长篇', categoryId: 54 }
			],
			freeCategoryList: [],
			latestCourses: [],
			kaiyiList: [],
			page: 1,
			hasNext: true
		};
	},
	onShow() {
		this.checkLogin().then(
			success => {},
			error => {
				console.log('获取新token');
				this.loginGetToken();
			}
		);
	},
	onLoad() {
		this.getBannerList();
		this.getFreeList();
		this.getAd();
		this.getLatestList();
		this.getKaiyiList();
	},
	onReachBottom() {
		if (this.hasNext) {
			this.getKaiyiList();
		}
	},
	methods: {
		loginGetToken() {
			this.request({
				url: '/app/web/support/oauth/1',
				// url: '/app/web/support/virtual/login',
				method: 'POST',
				success: res => {
					console.log('getToken', res);
					if (res.data.code === 200) {
						uni.setStorageSync('token', res.data.data);
					}
				}
			});
		},

		getKaiyiList() {
			this.showLoading();
			this.request({
				url: '/app/web/video/feature',
				method: 'POST',
				data: {
					categoryId: 0,
					pageNo: this.page,
					pageSize: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('kaiyi', res);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						this.kaiyiList.push(...res.data.data.data);
					}
				}
			});
		},
		getLatestList() {
			this.request({
				url: '/app/web/video/latest',
				method: 'POST',
				success: res => {
					console.log('latest', res);
					if (res.data.code === 200) {
						this.latestCourses = res.data.data.data;
					}
				}
			});
		},
		getFreeList() {
			this.request({
				url: '/app/web/video/free',
				method: 'POST',
				success: res => {
					console.log('free', res);
					if (res.data.code === 200) {
						this.freeCategoryList = res.data.data.data;
					}
				}
			});
		},
		getAd() {
			this.request({
				url: '/app/web/common/adverts',
				method: 'POST',
				success: res => {
					console.log('ad', res);
					if (res.data.code === 200) {
						this.adInfo = res.data.data[0];
					}
				}
			});
		},
		getBannerList() {
			this.request({
				url: '/app/web/common/banners',
				method: 'POST',
				success: res => {
					console.log('banner', res);
					if (res.data.code === 200) {
						this.bannerList = res.data.data;
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
.indexView {
	background-color: #f1f1f1;
	.sw {
		height: 300rpx;
		swiper-item {
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: bottom;
			image {
				width: 100%;
				// height: 100%;
			}
		}
	}
	.navList {
		padding: 14px 0;
		.item {
			image {
				width: 60rpx;
				height: 60rpx;
			}
			text {
				font-size: 22rpx;
				margin-top: 8rpx;
			}
		}
	}
	.section {
		padding: 0 30rpx;
		margin-top: 8px;
		.title {
			padding: 8px 0;
			padding-left: 10px;
			margin-bottom: 8px;
			position: relative;
			font-weight: 700;
			&::after {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 4px;
				height: 1em;
				content: '';
				background-color: #4288c8;
			}
		}
	}
	.freeCategory {
		.sv {
			white-space: nowrap;
			.item {
				display: inline-block;
				font-size: 22rpx;
				margin-right: 20rpx;
				width: 300rpx;
				&:last-child {
					margin-right: 0;
				}
				image {
					width: 300rpx;
					height: 200rpx;
					border-radius: 15rpx;
				}
			}
		}
	}
	.gotoVip {
		padding: 0rpx 30rpx;
		margin: 40rpx 0;
		image {
			width: 100%;
			// height: 280rpx;
			border-radius: 20rpx;
		}
	}
	.latestCourses {
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
			}
		}
	}
}
</style>
