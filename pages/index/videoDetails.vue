<template>
	<view class="videoDetailsView bg-white">
		<!-- <video :src="imgUrl + videoInfo.videoUri" objectFit="fill"  controls></video> -->
		<video id="myVideo" @timeupdate="timeupdate" :src="imgUrl + videoInfo.videoUri" objectFit="fill" :poster="imgUrl + videoInfo.coverUri" controls></video>

		<view class="topInfo">
			<view class="title">{{ videoInfo.title }}</view>
			<view class="desc">{{ videoInfo.digest }}</view>
		</view>

		<view @click="navgater('/pages/index/openVip')" class="btnBox"><button class="cu-btn btn bg-blue">购买vip</button></view>

		<view class="numBox flex justify-between">
			<view class="see">浏览人数:{{ videoInfo.pageView }}</view>
			<view class="like">
				<text>{{ videoInfo.isLike ? '取消收藏' : '收藏' }}</text>
				<text @click="changeLike(videoInfo.isLike)" :class="videoInfo.isLike ? 'cuIcon cuIcon-likefill text-red' : 'cuIcon cuIcon-like'"></text>
			</view>
		</view>

		<view class="detailBox">
			<view class="titleBox flex align-center">
				<view @click="titIdx = 0" :class="{ select: titIdx === 0 }" class="item">目录</view>
				<view @click="titIdx = 1" :class="{ select: titIdx === 1 }" class="item">视频</view>
				<view @click="titIdx = 2" :class="{ select: titIdx === 2 }" class="item">简介</view>
			</view>

			<!-- 目录 -->
			<view v-show="titIdx === 0" class="listBox">
				<view v-for="(item, index) in list" :key="index" :class="{ select: nowIdx === index }" class="item   ">
					<view @click="changeVideo(1, index)" v-if="item.isFree === 1" class="flex justify-between align-center" >
						<view class="infoBox">
							<view class="tit">{{ item.title }}</view>
							<view class="time">{{ item.publishedTime }}</view>
						</view>
						<button class="cu-btn btn   bg-blue">免费</button>
					</view>

					<view v-else-if="item.isFree === 0 && !item.alreadyPayVip" @click="navgater('/pages/index/openVip')" class="flex justify-between align-center" >
						<view class="infoBox">
							<view class="tit">{{ item.title }}</view>
							<view class="time">{{ item.publishedTime }}</view>
						</view>
						<button class="cu-btn btn    bg-blue">购买vip</button>
					</view>

					<view @click="changeVideo(2, index)" v-if="item.isFree === 0 && item.alreadyPayVip" class="flex justify-between align-center" >
						<view class="infoBox">
							<view class="tit">{{ item.title }}</view>
							<view class="time">{{ item.publishedTime }}</view>
						</view>
						<button class="cu-btn btn    bg-blue">已购买</button>
					</view>
				</view>
			</view>
			<view v-show="titIdx === 1" class="contentBox">
				<text>{{ videoInfo.content }}</text>
			</view>
			<view v-show="titIdx === 2" class="imgBox"><image :src="imgUrl + videoInfo.featureUri" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			nowIdx: -1, // 列表高亮
			titIdx: 0, // 下面模块
			list: [],
			videoInfo: {},
			page: 1,
			hasNext: true,
			videoContext: null,
			userInfo: {}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.tryGetParent();
			this.getDetail();
		} else {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	},
	onReachBottom() {
		if (!this.categoryId || !this.hasNext || this.titIdx !== 0) {
			return;
		}
		this.getList();
	},
	onReady() {
		this.videoContext = uni.createVideoContext('myVideo');
	},
	onShow() {
		let userInfo = uni.getStorageSync('userInfo') || '';
		if (!userInfo) {
			this.getUserInfo();
		} else {
			this.userInfo = userInfo;
			console.log(userInfo);
		}
	},
	methods: {
		tryGetParent() {
			let parentId = this.getQueryString('parentId') || '';
			if (parentId) {
				uni.setStorageSync('parentId', parentId);
			}
			console.log('尝试url获取parentId', parentId);
			let sparentId = uni.getStorageSync('parentId') || '';
			if (sparentId) {
				this.bindParent(sparentId);
			}
			console.log('尝试缓存获取parentId', sparentId);
		},
		bindParent(pid) {
			if (!uni.getStorageSync('token')) {
				return;
			}
			this.request({
				url: '/app/web/support/bind/' + pid,
				method: 'POST',
				success: res => {
					console.log('绑定上下级', res);
					if (res.data.code === 200) {
						uni.removeStorageSync('parentId');
					}
				}
			});
		},
		// 微信分享
		initWxConfig() {
			// let pageUrl = 'http://h5.kaiyi999.com/';
			let pageUrl = window.location.href + '&parentId=' + this.userInfo.customer.id;
			let noHashUrl = window.location.href.split('#')[0];
			console.log(pageUrl, '***********');
			// openid: 'oec-Ww_wKfGBX6bMT3uXgbw-j6VM',
			this.wxSdk({
				pageUrl: encodeURIComponent(noHashUrl),
				success: rescus => {
					console.log('获取sdk配置成功', rescus, pageUrl);
					let shareData = {
						title: '凯一学院',
						desc: this.videoInfo.title,
						link: pageUrl,
						imgUrl: this.imgUrl + this.videoInfo.coverUri,
						success: res => {
							// alert('调用分享成功!');
							console.log('调用分享成功', res, shareData);
						},
						fail: err => {
							// alert('调用分享失败!');
							console.log('调用分享失败', err, shareData);
						}
					};
					this.wx.onMenuShareAppMessage(shareData); //分享给好友
					this.wx.onMenuShareTimeline(shareData); //分享到朋友圈
				},
				fail: err => {
					console.log('配置失败', pageUrl);
					uni.hideLoading();
					uni.showToast({
						title: res.data.message || '分享失败！',
						icon: 'none'
					});
					console.log('分享失败', err);
				}
			});
		},
		getUserInfo() {
			this.request({
				url: '/app/web/support/token',
				method: 'POST',
				success: res => {
					console.log('userInfo', res);
					if (res.data.code === 200) {
						uni.setStorageSync('userInfo', res.data.data);
						this.userInfo = res.data.data;
					}
				}
			});
		},
		timeupdate(e) {
			// console.log('视频播放进度', e.detail.currentTime);
			let now = e.detail.currentTime;
			if (now >= 60) {
				// this.videoContext.pause();
				// this.videoContext.seek(0);
				this.handlerVideoPlay()
			}
		},
		handlerVideoPlay() {
			if (!this.userInfo || !this.userInfo.vips) {
				this.videoContext.pause();
				this.videoContext.seek(0);
				return false;
			}
			
			let canPlay = false;
			if (this.userInfo.vips.length > 0) {
				for (let vipidx in this.userInfo.vips) {
					if (this.userInfo.vips[vipidx].categoryId === Number(this.videoInfo.categoryId)) {
						console.log('有会员');
						canPlay = true;
						break;
					}
				}
			}
			if (this.videoInfo.isFree === 0 && !canPlay) {
				this.videoContext.pause();
				this.videoContext.seek(0);
				uni.showModal({
					title: '提示',
					content: '请开通会员!',
					showCancel: false,
					success: () => {
						uni.navigateTo({
							url:'/pages/index/openVip'
						})
					}
				});
			}
		},
		// 1免费 2已购买
		changeVideo(type, idx) {
			if (this.nowIdx == this.idx) {
				return;
			}
			this.id = this.list[idx].id;
			this.nowIdx = -1
			this.getDetail();
		},
		changeLike(type) {
			this.showLoading();
			let url = '/app/web/customer/favorites/add';
			let formDate = {
				coverUri: this.videoInfo.coverUri,
				name: this.videoInfo.title,
				videoId: this.videoInfo.id,
				videoUri: this.videoInfo.videoUri
			};
			if (type) {
				url = '/app/web/customer/favorites/cancel';
				// formDate = {};
				formDate = [this.videoInfo.id];
			}
			this.request({
				url,
				method: 'POST',
				data: formDate,
				success: res => {
					uni.hideLoading();
					console.log('changeLike', res);
					if (res.data.code === 200) {
						let message = '收藏成功!';
						if (type) {
							message = '取消收藏成功!';
							this.videoInfo.isLike = 0;
						} else {
							this.videoInfo.isLike = 1;
						}
						uni.showModal({
							title: '提示',
							content: message,
							showCancel: false
						});
					}
				}
			});
		},
		getDetail() {
			this.showLoading();
			this.request({
				url: '/app/web/video/read/' + this.id,
				method: 'POST',
				data: {},
				success: res => {
					uni.hideLoading();
					console.log('videoDetail', res.data.data);
					this.initWxConfig();
					if (res.data.code === 200) {
						this.categoryId = res.data.data.categoryId;
						res.data.data.alreadyPayVip = false;
						if (this.userInfo.vips.length > 0) {
							for (let vipidx in this.userInfo.vips) {
								if (this.userInfo.vips[vipidx].categoryId === Number(this.categoryId)) {
									res.data.data.alreadyPayVip = true;
								}
							}
						}
						this.videoInfo = res.data.data;

						this.list = [];
						this.page = 1;
						this.hasNext = true;
						this.getList();
					}
				}
			});
		},
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
					console.log('list', res);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						this.list.push(...res.data.data.data);
						let list = this.list;
						for (let idx in list) {
							if (list[idx].id == this.id) {
								this.nowIdx = Number(idx);
							}
							list[idx].alreadyPayVip = false;
							if (this.userInfo.vips.length > 0) {
								for (let vipidx in this.userInfo.vips) {
									if (this.userInfo.vips[vipidx].categoryId === Number(this.categoryId)) {
										list[idx].alreadyPayVip = true;
									}
								}
							}
						}
						this.list = list;
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
				border-bottom: 0px solid #439387;
				&.select {
					font-weight: 700;
					border-bottom: 2px solid #439387;
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
							color: #439387;
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
		.contentBox {
			font-size: 28rpx;
			line-height: 1.4em;
			text-indent: 2em;
			padding: 30rpx;
		}
		.imgBox {
			padding: 30rpx;
			image {
				width: 100%;
			}
		}
	}
}
</style>
