<template>
	<swiper  ref="swiper" v-if="this.banners.length > 0">
		<swiper-item v-for="(item, index) in banners" :key="index">
			<a :href="item.link">
				<img :src="item.image" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	// 导入轮播图组件
	import Swiper from "../../../components/common/swiper/Swiper";
	import SwiperItem from "../../../components/common/swiper/SwiperItem";

	export default {
		name: "HomeSwiper",
		components: {
			Swiper,
			SwiperItem
		},
		data(){
			return {
				isLoaded: false, // 保存图片是否加载完成的状态
			}
		},
		props: {
			// 父组件传递过来的轮播图数据
			banners: {
				type: Array,
				default() {// 这里默认值必须是一个方法返回的对象
					return []
					// }
				}
			}
		},

		methods: {
			/*图片加载完毕后发送自定义事件*/
			imageLoad(){
				// 加一个判断，不然每加载一次图片就执行一次
				if(!this.isLoaded){
					this.$emit('swiperImageLoad')
					this.isLoaded = true
				}
			}
		}
	}
</script>

<style scoped>

</style>