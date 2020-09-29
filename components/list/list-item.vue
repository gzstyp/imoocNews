<template>
	<listScroll class="list-scroll">
		<listCart mode="base"></listCart>
		<listCart mode="image"></listCart>
		<listCart mode="column"></listCart>
		<listCart mode="column"></listCart>
		<listCart mode="column"></listCart>
		<listCart mode="column"></listCart>
	</listScroll>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue';
	import listCart from '@/components/list-card/list-card.vue';
	export default {
		components:{
			listScroll,listCart
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
