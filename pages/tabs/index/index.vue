<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" @tabEvent="tabChange"></tab>
		<view class="home-list">
			<list :tab="tabList"></list>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	import tab from '@/components/tab/tab.vue';
	import list from '@/components/list/list.vue';
	export default {
		components:{
			navbar,tab,list
		},
		data() {
			return {
				title: 'Hello',
				tabList : []
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
			getLabel(){
				/* var _this = this;
				uniCloud.callFunction({
					name:'get_label',//云函数
					success(data) {
						const {result} = data;
						_this.tabList = result.data;
					},
					fail(err) {}
				}); */
				/* uniCloud.callFunction({
					name:'get_label'
				}).then(data =>{
					const {result} = data;
					this.tabList = result.data;
				}); */
				this.$api.getLabel('get_label',{
				}).then(data =>{
					this.tabList = data.data;
				}).catch(err =>{
					console.info(err);
				});
				// 这个 login 是在 http.js里定义的
				this.$api.login().then(data =>{
					console.info(data);
				});
				// 这个 getListLabel 是在 apis.js里定义的,推荐使用
				this.$api.getListLabel({}).then(data =>{
					console.info(data);
				}).catch(err =>{});
			},
			//事件的接收,原事件是在tab里发送
			//tabChange(item){ 也是可以的
			tabChange({data,index}){ //注意这个地方是否是简写或key是否有误!!!
				console.info(data)
				console.info(index)
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;/* 让内容垂直排列 */
		flex: 1;/* 整行撑满 */
		overflow: hidden;/* 解决 块 被挤到屏幕的外边去了,解决方法就是被挤到屏幕外的元素的父级元素添加 overflow: hidden; 即可!!!*/
		
		/* 已封装成组件所以已移走了
		.scroll{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;//设置页面不能不能滚动滑动
			//给它一个高度
			.list-scroll{
				height: 100%;
				display: flex;
				flex-direction: column;//让内容垂直排列
			}
		} */
		
		.home-list{
			flex: 1;/* 让其撑开 */
			box-sizing: border-box;/* 让子元素在本盒子内排版 */
			//border: 1px solid $mk-base-color;//调试用的
		}
	}
</style>