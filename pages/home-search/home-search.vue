<!-- 首页点击首页跳转到搜索页面 -->
<template>
	<view class="home">
		<!-- 自定义导航栏,v-model="value"用于点击搜索历史某项时直接显示在搜索框里,所以要把 v-model里的key[value]传递子组件navbar.vue里,即在props添加一个属性名value -->
		<navbar :isSearch="true" @inputEvent="eventInput" :dataValue="dataValue"></navbar>
		<!-- 搜索历史 -->
		<view class="home-list">
			<!-- ++++++++++++如果是历史标签容器 -->
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<!-- ****************如果有历史数据时 -->
				<view v-if="historyLists.length > 0" class="label-content">
					<view class="label-content_item" v-for="(item,index) in historyLists" :key="index" @click="historyTagsClick(item)">{{item.name}}</view>
				</view>
				<!-- ****************如果没有历史数据时 -->
				<view v-else class="no-data">
					搜索历史为空
				</view>
			</view>
			<!-- ++++++++++++如果不是历史标签容器,<button type="primary" @click="textBtn">给store的state的historyLists添加值</button> -->
			<listScroll v-else class="list-scroll">
				<!-- 自定义事件名为@itemClick是接收从子页面list-cart发送的实时事件 -->
				<listCart  :contentItem="item" v-for="(item,index) in searchList" :key="index" @itemClick="setHistory"></listCart>
			</listScroll>
		</view>
	</view>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue';
	import listCart from '@/components/list-card/list-card.vue';
	import {mapState} from 'vuex';
	import navbar from '@/components/navbar/navbar.vue';
	export default {
		components:{
			navbar,listCart,listScroll
		},
		//计算属性,它实时监听vuex的状态mapState的变化,即实时监听 /store/index.js 的标识state下里定义的 historyLists 值;watch是监听 data() 或 props的值的变化而执行响应的事件或更改值
		computed : {
			//...mapState(['historyLists']) //数组方法,这个'historyLists'是在 /store/index.js 的标识state下里定义的 historyLists 值,它historyLists是属性[相当于在data()或props定义的key],页面可以使用这个historyLists数据
			...mapState( // ...mapState是调用vuex的mapState,它接收的是一个数组[]或对象{}
				{
					historyLists : state => state.historyLists //这个是对象为参数,页面可以使用这个historyLists数据
				}
			)
		},
		data() {
			return {
				//有了上面计算属性 computed 之后，这里的data()下的historyLists : [] 就不需要了,就是上面的computed的historyLists可以本处替换相同的key(historyLists)
				is_history : true,//区分是搜索结果还是搜索记录,为true显示的是历史记录,false显示的是搜索结果,默认是搜索记录
				searchList : [],
				dataValue : '',//存储发送来的搜索关键字
			}
		},
		methods: {
			//监听改变事件
			eventInput(value){
				this.dataValue = value;
				if(!value){
					clearTimeout(this.timer);
					this.mark = false;
					this.getListSearch(value);
					return;
				}
				//做标记,限制请求次数,第1次进来时this.mark的值肯定是false
				if(!this.mark){
					this.mark = true;
					this.timer = setTimeout(()=>{
						this.mark = false;
						this.getListSearch(value);
					},1000);
				}
			},
			setHistory(){
				if(this.dataValue){
					// vuex的actions异步调用,其意义是分发 action。options 里可以有 root: true，它允许在命名空间模块里分发根的 action。返回一个解析所有被触发的 action 处理器的 Promise。
					this.$store.dispatch('set_history',{ //set_history是 actions下的 set_history 异步方法，格式为json发送到store/index.js下的actions的方法set_history()
						name : this.dataValue
					});
				}				
			},
			clear(){
				this.$store.dispatch('clearHistory');
				uni.showToast({
					title:'清空成功'
				});
			},
			//搜索
			getListSearch(value){
				if(!value){
					this.searchList = [];
					this.is_history = true;
					return
				}
				this.is_history = false;
				this.$api.getSearch({value : value}).then(data =>{
					console.info(data);
					if(data.code === 200){
						this.searchList = data.data;
					}
				}).catch(err =>{
					console.info(err);
				});
			},
			//点击把值渲染到输入框，同时搜索
			historyTagsClick(item){
				this.getListSearch(item.name);
				this.dataValue = item.name;
			}
		}
	}
</script>

<style lang="scss">
	page{
		display: flex;
		background-color: #f5f5f5;
		height: 100%;
	}
	/* 高度 */
	.home{
		display: flex;
		flex-direction: column;/* 垂直排列 */
		flex: 1;/* 撑满整个宽高度!!! */
		
		/* 搜索历史区域 */
		.label-box{
			background-color: #fff;
			margin-bottom: 10px;
			
			/* 控制搜索历史和清空的父容器 */
			.label-header{
				display: flex;
				justify-content: space-between;/* 左右对齐 */
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				
				//搜索历史
				.label-title{
					color: $mk-base-color;
				}
				
				//清空
				.label-clear{
					color: #30b33a;
				}
			}
			
			//标签容器
			.label-content{
				display: flex;
				flex-wrap: wrap;/* 水平排列当大于1行时自动换行 */
				padding: 15px;
				padding-top: 0;/* 为什么是 padding-top: 0 呢? 因为上面的.label-box的是 margin-bottom: 10px; */
				
				.label-content_item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 4px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
			
			//没有搜索历史数据时
			.no-data{
				height: 200px;
				width: 100%;
				line-height: 200px;
				color: #666;
				text-align: center;
				font-size: 12px;
			}
		}
	}
</style>