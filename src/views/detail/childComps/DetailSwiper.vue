<template>
  <swiper class="container">
    <swiper-item v-for="item in topImg">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  // 导入轮播图组件
  import Swiper from '../../../components/common/swiper/Swiper'
  import SwiperItem from '../../../components/common/swiper/SwiperItem'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      // 保存父组件传递过来的轮播图数据
      topImg: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .container{
    height: 400px;
    overflow: hidden;
  }
</style>