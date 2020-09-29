<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.scroll{
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;/* 设置页面不能不能滚动滑动 */
		//给它一个高度
		.list-scroll{
			height: 100%;
			display: flex;
			flex-direction: column;/* 让内容垂直排列 */
		}
	}
</style>
