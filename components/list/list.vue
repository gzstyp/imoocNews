<template>
	<swiper class="home-swiper">
		<swiper-item v-for="(item,index) in tab" class="swiper-item" :key="index">
			<listItem></listItem>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from '@/components/list/list-item.vue'
	export default {
		components : {
			listItem
		},
		props : {
			tab : {
				type: Array,
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
	.home-swiper{
		height: 100%;//指定高度才能滚动
		
		.swiper-item{
			height: 100%;//指定高度才能滚动
			overflow: hidden;
			
			/* .list-scroll{
				height: 100%;//指定高度才能滚动
			} */
		}
	}
</style>
