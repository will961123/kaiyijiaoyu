<script>
export default {
	onLaunch: function() {
		let pageType = this.getQueryString('pageType') || '';
		if (pageType) {
			let videoId = this.getQueryString('id') || '';
			let videoType = this.getQueryString('type') || '';
			uni.setStorageSync('videoDetailConfig', {
				id: videoId,
				type: videoType || ''
			});
			console.log('videoId', videoId);
			console.log('videoType', videoType);
			console.log('videoDetailConfig',uni.getStorageSync('videoDetailConfig'));
		}
		console.log('pageType', pageType);
		console.log('App Launch');

		this.checkLogin().then(
			success => {},
			error => {
				let urltoken = this.getQueryString('token');
				let parentId = this.getQueryString('parentId') || '';
				if (parentId) {
					uni.setStorageSync('parentId', parentId);
				}
				if (!urltoken) {
					uni.clearStorage('userInfo');
					setTimeout(()=>{
						uni.reLaunch({
							url: '/pages/index/index'
						});
					},500)
			
				} else {
					uni.setStorageSync('token', urltoken);
				}
			}
		);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';
.textov1 {
	/* display: block; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.textov2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.endBox {
	text-align: center;
	font-size: 22rpx;
	color: #999;
	line-height: 40px;
}
.bg-blue {
	background-color: #439387;
}
.text-blue2 {
	color: #439387;
}
image {
	/* background-color: #ededed; */
}
</style>
