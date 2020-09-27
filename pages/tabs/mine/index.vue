<template>
	<view class="view-root">我的</view>
</template>

<script>
	export default{
		props : {},
		data() {
			return {}
		},
		onTabItemTap(item) {
			console.info('我的的onTabItemTap');
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
