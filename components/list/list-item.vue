<template>
	<!-- 接收子组件发送来的事件,自定义事件名为 loadMore,它是由子组件实时发送事件本调用页面实时接收执行事件的 -->
	<listScroll class="list-scroll" @loadMore="loadMoreData">
		<!-- contentItem传给子组件 -->
		<listCart mode="base" :contentItem="item" v-for="(item,index) in listContent" :key="index"></listCart>
		<!-- 添加加载更多或加载动画,当大于每页大小时才显示加载动画,当前默认大小是5 -->
		<uniLoadMore v-if="listContent.length === 0 || listContent.length > 4" iconType="snow" :status="load.status"></uniLoadMore>
	</listScroll>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue';
	import listCart from '@/components/list-card/list-card.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components:{
			listScroll,listCart,uniLoadMore
		},
		props : {
			listContent : {
				type : Array,
				default(){
					return []
				}
			},
			load : {
				type : Object,
				default(){
					return {
						status : 'loading'
					}
				}
			}
		},
		data() {
			return {};
		},
		methods:{
			loadMoreData(){
				console.info('list-item.vue ->调用页面是实时接收的');
				this.$emit('loadMoreData');//又发送给父组件,子组件 -> 子组件 -> 父组件,即发往 list-scroll.vue -> list-item.vue -> list.vue
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll{
		height: 100%;//指定高度才能滚动
	}
</style>
