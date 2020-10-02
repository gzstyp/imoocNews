<template>
	<view class="navbar">
		<view class="navbar-flexd">
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- 状态栏的内容,此处的openSearch事件要添加 .stop 来阻止冒泡事件,即解决点击它的子元素时直接触发 openSearch()事件,因为子元素本身也有点击事件 -->
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:barHeight+'px','width':windowWidth+'px'}" @click.stop="openSearch">
				<!-- 在搜索页时显示 -->
				<view v-if="isSearch" class="navbar-content_search_icon">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 取反,即不是搜索页时显示 -->
				<view class="navbar-search" v-if="!isSearch">
					<!-- 非搜索页显示 -->
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search"></uni-icons>
					</view>
					<view class="navbar-search_text">输入关键字</view>
				</view>
				<!-- 是搜索页时显示 -->
				<view v-else class="navbar-search">
					<!-- input事件,实时监听数据事件 -->
					<input v-model="value" @input="inputChange" class="navbar-search_text" type="text" placeholder="输入关键字" />
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight + barHeight +'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch : {
				type : Boolean,
				default : false
			}
		},
		data() {
			return {
				statusBarHeight : 20,
				barHeight : 45,
				windowWidth : 278,/*, 375 */
				value : '20'
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
		},
		methods:{
			openSearch(){
				if(this.isSearch) return;
				uni.navigateTo({
					url:"/pages/home-search/home-search"
				});
			},
			/* input事件,实时监听数据事件,它会返回输入的内容 */
			inputChange(e){
				const {value} = e.detail;
				//实时监听并发送事件到调用的父组件
				this.$emit('inputEvent',value);
			}
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
						font-size: 14px;
						color: #999;
						vertical-align: middle;
					}
				}
				
				&.search{
					padding-left: 0;
					
					.navbar-content_search_icon{
						margin: 0 10px;
					}
					
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>