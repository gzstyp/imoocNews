<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList"></tab>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	import tab from '@/components/tab/tab.vue'
	export default {
		components:{
			navbar,tab
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
			}
		}
	}
</script>

<style lang="scss">
</style>