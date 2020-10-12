<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in 10" :key="index">
				{{item}}标签
				<uni-icons class="icons-close" type="clear" size="20" color="#f00"></uni-icons>
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">推荐标签</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in 10">{{item}}标签</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color:#f5f5f5;
	}
	.label{
		
		.label-box{
			background-color:#fff;
			margin-bottom: 10px;
			
			.label-header{
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;
				
				.label-edit{
					color: #30b33a;
				}
			}
			
			.label-content{
				display: flex;
				flex-wrap: wrap;/* 多于的换行排列 */
				padding: 15px;
				padding-top: 0px;/* 为什么是0px?因为上面的.label-box的 margin-bottom: 10px;，所以要剪掉 */
				
				.label-content_item{
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
					
					.icons-close{
						position: absolute;
						right: -8px;
						top: -8px;
						background-color:#fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
