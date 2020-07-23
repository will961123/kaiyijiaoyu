<template>
	<view class="teamListView">
		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-center">
			<image :src="item.headimgurl" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="name">{{ item.nickName }}</view>
				<view class="time">
					购买日期：{{ item.createTime }}
					<text style="margin: 0 8px;">奖金</text>
					{{ item.amount | filterMoney }}元
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			page: 1,
			hasNext: true
		};
	},
	onLoad() {
		this.getMoneyList();
	},
	onReachBottom() {
		if (this.hasNext) {
			this.getMoneyList();
		}
	},
	filters: {
		filterMoney(val) {
			return (val / 100).toFixed(2);
		}
	},
	methods: {
		getMoneyList() {
			this.request({
				url: '/app/web/customer/bonus/item',
				data: {
					pageNo: this.page,
					pageSize: 20
				},
				method: 'POST',
				success: res => {
					console.log('moneyList', res);
					if (res.data.code === 200) {
						this.page++;
						this.hasNext = res.data.data.hasNext;
						this.list.push(...res.data.data.data);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.teamListView {
	.item {
		padding: 15rpx;
		border: 1rpx solid #deded;
		radio {
			transform: scale(0.8);
			margin-right: 15rpx;
		}
		& > image {
			width: 90rpx;
			height: 90rpx;
		}
		.infoBox {
			flex: 1;
			margin-left: 18rpx;
			font-size: 24rpx;
			.name {
				font-weight: 700;
				line-height: 1.6em;
			}
			.time {
				font-size: 22rpx;
				line-height: 1.8em;
			}
		}
		.btnBox {
			.money {
				line-height: 1.6em;
				font-weight: 700;
			}
			.btn {
				font-size: 24rpx;
				padding: 6px 8px;
				border-radius: 14rpx;
			}
		}
	}
	.invitation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
