<template>
	<view class="withdrawalView">
		<view class="userBox flex justify-between align-center bg-white">
			<view class="info flex align-center">
				<image src="../../static/logo.png" mode="aspectFill"></image>
				歪比 管理系篇会员
			</view>
			<navigator url="/pages/index/openVip" class="btn getMoney cu-btn bg-gradual-blue">
				<text class="cuIcon cuIcon-vip"></text>
				升级会员
			</navigator>
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</view>
			<input type="text" value="" placeholder="请填写昵称" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</view>
			<input type="text" value="" placeholder="请填写手机号" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">账户姓名:</view>
			<input type="text" value="" placeholder="请填写昵称" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">银行卡号:</view>
			<input type="text" value="" placeholder="请填写银行卡号" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">开户银行:</view>
			<input type="text" value="" placeholder="请填写开户银行" />
		</view>
		<view class="item flex align-center bg-white">
			<view class="label">奖&nbsp;&nbsp;学&nbsp;&nbsp;金:</view>
			<input type="digit" value="" placeholder="请填写奖学金" />
		</view>

		<view class="btn saveBtn bg-gradual-blue">确认提现</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
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
	.saveBtn{
		margin: 40rpx 30rpx 0 30rpx;
		line-height: 40px;
		text-align: center;
		border-radius: 16rpx;
	}
}
</style>
