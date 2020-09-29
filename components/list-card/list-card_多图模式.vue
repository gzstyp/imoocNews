<template>
	<view>
		<!-- 基础卡片 -->
		<!-- <view class="listcard">
			<view class="listcard-image">
				<image src="/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="listcard-context">
				<view class="listcard-context_title">
					<text>
						uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架uni。java，php
					</text>
				</view>
				<view class="listcard-context_des">
					<view class="listcard-context_des_label">
						<view class="listcard-context_des_label_item">前端</view>
					</view>
					<view class="listcard-context_des_browse">10254浏览</view>
				</view>
			</view>
		</view> -->
		<!-- 多图模式 -->
		<view class="listcard mode-column">
			<view class="listcard-context">
				<view class="listcard-context_title">
					<text>
						uni-app开发框架uni-app开发框架uni-app开发框架uni-app开发框架uni。java，php
					</text>
				</view>
				<view class="listcard-image">
					<view v-for="item in 3" :key="item" class="listcard-image_item">
						<image src="/static/logo.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-context_des">
					<view class="listcard-context_des_label">
						<view class="listcard-context_des_label_item">前端</view>
					</view>
					<view class="listcard-context_des_browse">10254浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listcard{
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;/* 仅在div盒子内排版显示 */
		/* 解决 ‘当前块’ 被挤到屏幕的外边去的方法是当前被挤到屏幕外的元素的父级元素添加 overflow: hidden; 即可!!! */
		
		.listcard-image{
			height: 50px;
			width: 50px;
			border-radius: 5px;
			overflow: hidden;
			flex-shrink: 0;/* 当临近的宽度为100%时图片会被挤压现象,所以要添加该样式 */
			/* 下面的样式图片才能正常显示 */
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.listcard-context{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;/* 宽度100%时上面的图片被挤压现象,在被挤压的图片元素里添加 flex-shrink: 0;即解决 */
			
			.listcard-context_title{
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				
				text{
					overflow: hidden;/* 文字多了之后要隐藏 */
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
			}
			
			.listcard-context_des{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				
				.listcard-context_des_label{
					display: flex;/* 横向排列 */
					
					.listcard-context_des_label_item{
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 4px;
						color: $mk-base-color;
						border: 1px solid $mk-base-color;
					}
				}
				
				.listcard-context_des_browse{
					color: #999;
					line-height: 1.5;
				}
			}
		}
		
		&.mode-column{ //表示和父元素同级的
			//实现多图的样式
			.listcard-context{
				width: 100%;
				padding-left: 0;
			}
			
			.listcard-image{
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;
				
				.listcard-image_item{
					margin-left: 10px;
					width: 100%;
					border-radius: 6px;
					overflow: hidden;
					&:first-child{//第1个元素
						margin-left: 0px;
					}
					
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			//注意同级的关系,否则样式没有效果!!!
			.listcard-context_des{
				margin-top: 10px;
			}
		}
	}
</style>
