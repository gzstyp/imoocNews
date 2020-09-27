<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll_box">
				<view class="tab-scroll_item" v-for="(item,index) in list" :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list : {
				type : Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				lists : [
					{
						name : "uni-app"
					},
					{
						name : "vue"
					},
					{
						name : "spring"
					},
					{
						name : "mysql"
					},
					{
						name : "oracle"
					},
					{
						name : "javascript"
					},
					{
						name : "java"
					},
					{
						name : "jquery"
					},
					{
						name : "golang"
					},
					{
						name : "php"
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		border-bottom: 1px solid #f5f5f5;
		background-color:#fff;
		width: 100%;
		box-sizing: border-box;/* 盒内元素,即为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制 */
		-moz-box-sizing:border-box; /* Firefox */
		-webkit-box-sizing:border-box; /* Safari */
		.tab-scroll{
			flex: 1;/* 撑满盒子 */
			overflow: hidden;/* 溢出隐藏 */
			box-sizing: border-box;/* 在view盒子显示 */
			.tab-scroll_box{
				display: flex;
				height: 45px;
				align-items: center;/* 内容垂直居中 */
				flex-wrap: nowrap;/* 不换行 */
				box-sizing: border-box;
				-moz-box-sizing:border-box;
				-webkit-box-sizing:border-box;
				.tab-scroll_item{
					flex-shrink: 0;/* flex布局防止被挤压 */
					padding: 0 10px;
					color: #333;
					font-size: 14px;
				}
			}
		}
		.tab-icons{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
































