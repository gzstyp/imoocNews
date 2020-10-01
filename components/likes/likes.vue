<!-- 收藏按钮 -->
<template>
	<!-- @click.stop 是阻止冒泡,即解决当前元素的父级元素被点击事件时也被触发点击事件 -->
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like ? 'heart-filled' : 'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props : {
			item : {
				type : Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				like : false //实现点击变实心或空心
			};
		},
		created() {
			this.like = this.item.is_like; //但是有可能还没赋值成功,所以要用到watch功能
		},
		// watch 是监听 props属性或 data()数据的某一个值的变化而执行某个方法或更改属性值
		watch : {
			item(newValue,oldValue){ //此处监听执行的是属性
				this.like = this.item.is_like;
			}
		},
		methods : {
			likeTap(){
				console.info('元素的事件');
				this.like = !this.like;
				this.updateCollect();
			},
			//收藏或取消收藏
			updateCollect(){
				uni.showLoading({title:'正在操作……'});//显示正在操作动画
				this.$api.updateLikes({
					user_id : '5f6f3bfc37d16d000179521d',
					article_id : this.item._id
				}).then(data =>{
					uni.hideLoading();//功能时隐藏
					//提示操作结果
					uni.showToast({
						title:this.like ? '收藏成功' : '取消收藏',
						icon:'none'
					})
					console.info(data);
					if(data.code === 200){
						console.info('收藏|取消收藏成功');
					}
				}).catch(err =>{
					uni.hideLoading();//失败时隐藏
				});
			}
		}
	}
</script>

<style lang="scss">
	.icons{
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}
</style>
