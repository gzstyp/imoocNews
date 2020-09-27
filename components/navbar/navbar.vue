<template>
	<view class="navbar">
		<view class="navbar-flexd">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="navbar-content" :style="{height:barHeight+'px','width':windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search"></uni-icons>
					</view>
					<view class="navbar-search_text">输入关键字</view>
				</view>
			</view>
		</view>
		<view :style="{height:barHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight : 20,
				barHeight : 45,
				windowWidth : 278/* 375 */				
			};
		},
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync();
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			//获取胶囊小程序按钮位置
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.info(menuButtonInfo)
			//(胶囊底部的高度 - 状态栏的高度) + (胶囊顶部的高度 - 状态栏内的高度) = 导航栏的高度
			this.barHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight);
			console.info(this.barHeight)
			this.windowWidth = menuButtonInfo.left;
			//#endif
		}
	}
</script>

<style lang="scss">
	@import '../../resources/css/icons.css';
	.navbar {
		.navbar-flexd {
			position: fixed;
			/* 固定排列 */
			top: 0;
			left: 0;
			z-index: 99;
			/* 保证导航栏在最上层 */
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;
				/* 盒内显示 */
				display: flex;
				justify-content: center;
				align-items: center;

				.navbar-search {
					display: flex;
					align-items: center;
					width: 100%;
					border-radius: 30px;
					padding: 0 10px;
					height: 30px;
					background-color: #fff;

					.navbar-search_icon {
						margin-right: 10px;
					}

					.navbar-search_text {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>