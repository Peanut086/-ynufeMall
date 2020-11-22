<template>
	<swiper  ref="swiper" v-if="this.banners.length > 0">
		<swiper-item v-for="(item, index) in banners" :key="index">
			<a :href="item.link">
				<img :src="item.image" alt="">
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
		props: {
			// 父组件传递过来的轮播图数据
			banners: {
				type: Array,
				default() {// 这里默认值必须是一个方法返回的对象
					return []
					// }
				}
			}
		}
	}
</script>

<style scoped>

</style>