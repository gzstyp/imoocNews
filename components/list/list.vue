<template>
	<swiper class="home-swiper" @change="changeContent" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" class="swiper-item" :key="index">
			<listItem :listContent="listCatchData[index]"></listItem>
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
		data(){
			return {
				//listContent : [], 
				listCatchData : {}//传给子组件
			}
		},
		// onLoad是在页面里周期,created是组件的周期,也就是在组件里是不能用 onLoad
		created() {
			//this.getList(0);//第一项
		},
		watch:{
			tab(newValue,oldValue){
				if(newValue.length === 0) return;
				this.getList(this.activeIndex);//当有值时才去请求数据
			}
		},
		methods : {
			changeContent(e){
				const {current} = e.detail;
				console.info(current);
				console.info(this.tab);
				console.info(this.tab[current]);
				console.info(this.tab[current].name);
				console.info(this.tab[current]._id);
				//切换时也要获取数据
				this.getList(current);
				this.$emit('indexChange',current);//把内容滑块的索引值传给tab标签实现联动,它会发送给调用页面!!!
			},
			getList(current){
				this.$api.getListContent({name:this.tab[current].name}).then(data =>{ // name:name 可以简写为 name
					if(data.code === 200){
						//this.listContent = data.data;
						//数据的懒加载
						this.$set(this.listCatchData,current,data.data);//$set 它可以帮助我们通知页面的数据或对象发生了变化刷新
					}
				}).catch(err =>{
					console.info(err);
				});
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
