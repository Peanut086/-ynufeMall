<template>
	<div class="tab-control">
		<div 	class="tab-item" 
					v-for="(item,index) in titles"
		     	:class="{active: index === currentIndex}"
					@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		/*根据传入的标题数决定有几个子元素*/
		props: {
			titles: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				currentIndex: 0  // 控制激活的文字样式
			}
		},
		methods: {
			itemClick(index){  // 点击切换流行/潮流/新款
				this.currentIndex = index
				// 使用自定义事件将index传给父组件
				this.$emit('tabClick',index)
			},
		},
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		justify-content: space-evenly;
		line-height: 40px;
		background-color: #fff;
		margin-top: 5px;
		text-align: center;
	}
	.tab-item{
		flex: 1;
	}
	.tab-item span{
		font-size: 16px;
		font-weight: 500;
	}
	.active{
		color: var(--color-high-text);
		transition: all ease-in-out .2ms;
	}
	.active span{
		border-bottom: 2px solid var(--color-tint);
		padding: 8px;
		transition: all ease-in-out .3s;
	}
</style>