<template>
	<listScroll class="list-scroll">
		<!-- contentItem传给子组件 -->
		<listCart mode="base" :contentItem="item" v-for="(item,index) in listContent" :key="index"></listCart>
	</listScroll>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue';
	import listCart from '@/components/list-card/list-card.vue';
	export default {
		components:{
			listScroll,listCart
		},
		props : {
			listContent : {
				type : Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list-scroll{
		height: 100%;//指定高度才能滚动
	}
</style>
