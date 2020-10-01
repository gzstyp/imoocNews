<!-- 收藏按钮 -->
<template>
	<!-- @click.stop 是阻止冒泡,即解决当前元素的父级元素被点击事件时也被触发点击事件 -->
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like ? 'heart-filled' : 'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
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
		methods:{
			likeTap(){
				console.info('元素的事件');
				this.like = !this.like;
				this.updateCollect();
			},
			//收藏或取消收藏
			updateCollect(){
				this.$api.updateLikes({
					user_id : '5f6f3bfc37d16d000179521d',
					article_id : this.item._id
				}).then(data =>{
					console.info(data);
					if(data.code === 200){
						console.info('收藏|取消收藏成功');
					}
				}).catch(err =>{});
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
