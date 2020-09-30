<template>
	<swiper class="home-swiper" @change="changeContent" :current="activeIndex">
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
			},
			activeIndex : { //标签的索引值
				type : Number,
				default : 0
			} 
		},
		methods : {
			changeContent(e){
				const {current} = e.detail;
				this.$emit('indexChange',current);//把内容滑块的索引值传给tab标签实现联动,它会发送给调用页面!!!
			}
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
