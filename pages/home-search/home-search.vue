<!-- 首页点击首页跳转到搜索页面 -->
<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar :isSearch="true" @inputEvent="inputEvent"></navbar>
		<!-- 搜索历史 -->
		<view class="home-list">
			<!-- 历史标签容器 -->
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<!-- 有历史数据时 -->
				<view v-if="listHistory.length > 0" class="label-content">
					<view class="label-content_item" v-for="item in listHistory" :key="item">{{item}}</view>
				</view>
				<!-- 没有历史数据时 -->
				<view v-else class="no-data">
					搜索历史为空
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	export default {
		components:{
			navbar
		},
		data() {
			return {
				listHistory : []
			}
		},
		methods: {
			inputEvent(value){
				console.info(value)
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
		border: 1px solid #007AFF;
		
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