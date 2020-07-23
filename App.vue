<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.checkLogin().then(success=>{},error=>{
			uni.reLaunch({
				url:'/pages/index/index'
			})
		})
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
.endBox{
	text-align: center;
	font-size: 22rpx;
	color: #999;
	line-height: 40px;
}
image{ 
	/* background-color: #ededed; */
}
</style>
