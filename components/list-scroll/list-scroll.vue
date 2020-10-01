<!-- 是列表list.vue组件的item项,它是list-item.vue的容器视图,它会把list-item.vue的dom的listScroll内容插入到插槽<slot>里 -->
<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
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
		},
		methods:{
			// 触发上拉, 组件 scroll-view的事件scrolltolower,官方的说明：滚动到底部/右边，会触发 scrolltolower 事件
			loadMore(){
				console.info('触发上拉,本vue为list-scroll.vue事件获取之后,发送到上一级vue组件->list.vue');
				//事件获取之后,要发送事件到调用页面,即父组件 list-item.vue
				this.$emit('loadMore');//通过父组件(调用页面)的自定义事件实时发送事件;此处用不到参数!!!即发往 list-scroll.vue -> list-item.vue -> list.vue
			}
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
