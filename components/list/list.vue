<!-- 首页[]加载的list列表数据的子组件-->
<template>
	<swiper class="home-swiper" @change="changeContent" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" class="swiper-item" :key="index">
			<listItem :listContent="listCatchData[index]" :load="load[index]" @loadMoreData="loadMoreData"></listItem>
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
				listCatchData : {},//传给子组件
				load :{},//处理共有变量问题
				pageSize : 5 // 当前不能使用共有变量
			}
		},
		// onLoad是在页面里周期,created是组件的周期,也就是在组件里是不能用 onLoad
		created() {
		},
		// watch 是监听 props属性或 data()数据的某一个值的变化而执行某个方法或更改属性值
		watch:{
			tab(newValue,oldValue){ //此处监听执行的是方法
				if(newValue.length === 0) return;
				this.getList(this.activeIndex);//当有值时才去请求数据,当为0时加载第1项[标签]
			}
		},
		methods : {
			// 加载更多,这个方法是从子组件监听并触发,是从 list-scroll.vue -> list-item.vue -> list.vue
			loadMoreData(){
				console.info('上拉加载更多,本/components/list/list.vue获取事件之后,立即执行!!');
				if(this.load[this.activeIndex].status === 'noMore') return; //当为没有数据时不再去请求数据
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex);
			},
			changeContent(e){
				const {current} = e.detail;
				console.info(current);
				console.info(this.tab);
				console.info(this.tab[current]);
				console.info(this.tab[current].name);
				console.info(this.tab[current]._id);
				this.$emit('indexChange',current);//把内容滑块的索引值传给tab标签实现联动,它会发送给调用页面!!!
				const _lcd = this.listCatchData[current];
				if(!_lcd || _lcd.length === 0){
					//切换时也要获取数据
					this.getList(current);
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page : 1, //默认加载第1页
						status : 'loading'//加载动画控制,传递到子组件
					}
				}
				this.$api.getListContent(
					{
						name : this.tab[current].name,
						page : this.load[current].page,
						pageSize : this.pageSize
					}
				).then(data =>{ // name:name 可以简写为 name
					if(data.code === 200){
						//this.listContent = data.data;
						//数据的懒加载
						if(data.data.length === 0){
							let oldData = {};
							oldData.status = 'noMore';
							oldData.page = this.load[current].page;//重新赋值当前页数
							this.$set(this.load,current,oldData);
							//强制渲染页面刷新页面
							this.$forceUpdate();
							return;
						}
						//当返回的数据条数小于每页大小时,提示没有更多数据
						/* if(data.data.length < this.pageSize){
							let oldData = {};
							oldData.status = 'noMore';
							oldData.page = this.load[current].page;//重新赋值当前页数
							this.$set(this.load,current,oldData);
							//强制渲染页面刷新页面
							this.$forceUpdate();
						} */
						let oldList = this.listCatchData[current] || [];//防止 TypeError: Cannot read property 'push' of undefined
						oldList.push(...data.data);//...是扩展符,解构一下???,即在原来的数据基础上添加新数据,即把 data.data 扩展出来再push到oldList
						this.$set(this.listCatchData,current,oldList);//$set 它可以帮助我们通知页面的数据或对象发生了变化刷新
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
