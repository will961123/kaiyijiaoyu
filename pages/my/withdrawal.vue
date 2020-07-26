<template>
	<view class="withdrawalView">
		<view class="userBox flex justify-between align-center bg-white">
			<view class="info flex align-center">
				<image :src="userInfo.customer.headimgurl" mode="aspectFill"></image>
				{{ userInfo.customer.nickName }} <text style="margin-left: 8rpx;" v-if="userInfo.vips" v-for="(item, index) in userInfo.vips" :key="index">{{ item.name }}</text>
			</view>
			<navigator url="/pages/index/openVip" class="btn getMoney cu-btn bg-gradual-blue">
				<text class="cuIcon cuIcon-vip"></text>
				升级会员
			</navigator>
		</view>
<!-- 		<view class="item flex align-center bg-white">
			<view class="label">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</view>
			<input v-model="nickName" type="text" value="" placeholder="请填写昵称" />
		</view> -->
		<view class="item flex align-center bg-white">
			<view class="label">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</view>
			<input v-model="phone" type="number" value="" placeholder="请填写手机号" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">账户姓名:</view>
			<input v-model="name" type="text" value="" placeholder="请填写姓名" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">银行卡号:</view>
			<input v-model="bankCard" type="number" value="" placeholder="请填写银行卡号" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">开户银行:</view>
			<input v-model="bankName" type="text" value="" placeholder="请填写开户银行" />
		</view>
		<!-- <view class="item flex align-center bg-white">
			<view v-model="money" class="label">奖&nbsp;&nbsp;学&nbsp;&nbsp;金:</view>
			<input type="digit" value="" placeholder="请填写奖学金" />
		</view> -->

		<view @click="withdrawal" class="btn saveBtn bg-gradual-blue">确认提现</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			totMoney: 0.0,
			nickName: '',
			phone: '',
			name: '',
			bankCard: '',
			bankName: '',
			money: '',
			userInfo:{}
		};
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
		withdrawal() {
			if (!this.phone) {
				this.showToast('请输入电话');
				return false;
			}
			if (this.phone.length !== 11) {
				this.showToast('请输入正确的电话');
				return false;
			}
			if (!this.name) {
				this.showToast('请输入姓名');
				return false;
			}
			if (!this.bankCard) {
				this.showToast('请输入银行卡号');
				return false;
			}
			if (!this.bankName) {
				this.showToast('请输入开户行');
				return false;
			}

			this.showLoading();
			this.request({
				url: '/app/web/customer/bonus/draw',
				data: {
					bankCard: this.bankCard,
					bankName: this.bankName,
					name: this.name,
					phone: this.phone
				},
				method:"POST",
				success:res=>{
					uni.hideLoading()
					console.log('提现',res);
					if(res.data.code === 200){
						uni.showModal({
							title:'提示',
							content:'提交成功!',
							showCancel:false,
							success:res=>{
								uni.navigateBack({
									delta:1
								})
							}
						})
					}else{
						uni.showModal({
							title:'提示',
							content:'提现失败!',
							showCancel:false 
						})
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.withdrawalView {
	.userBox {
		padding: 26rpx 30rpx;
		border-bottom: 1rpx solid #ededed;
		.info {
			font-weight: 700;
			image {
				width: 80rpx;
				height: 80rpx;
				margin-right: 16rpx;
			}
		}
		.getMoney {
			border-radius: 15rpx;
		}
	}
	.item {
		padding: 26rpx 30rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #ededed;
		.label {
			margin-right: 16rpx;
		}
		input {
			flex: 1;
			font-size: 28rpx;
		}
	}
	.saveBtn {
		margin: 40rpx 30rpx 0 30rpx;
		line-height: 40px;
		text-align: center;
		border-radius: 16rpx;
	}
}
</style>
