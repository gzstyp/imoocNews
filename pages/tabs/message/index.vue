<template>
	<view class="view-root">消息</view>
</template>

<script>
	export default{
		props : {},
		data() {
			return {}
		},
		onTabItemTap(item) {
			console.info('消息的onTabItemTap');
			console.info(item);
		},
		methods:{}
	}
</script>

<style scoped>
	.view-root{
		margin: 0 10rpx;
		padding: 0;
	}
</style>
