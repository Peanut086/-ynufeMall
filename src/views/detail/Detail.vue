<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topImg="topImg"/>
  </div>
</template>

<script>
  // 导入详情页导航组件
  import DetailNavBar from './childComps/DetailNavBar'
  // 导入轮播
  import DetailSwiper from './childComps/DetailSwiper'


  // 网络请求
  import {getDetail} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data(){
      return {
        iid: null, // 用于保存路由传递过来的参数：商品id
        topImg: [], // 保存轮播图数据
      }
    },
    created(){
      // 保存商品id
      this.iid = this.$route.params.iid

      // 根据id请求数据并保存下来
      getDetail(this.iid).then(res => {
        // 保存轮播图数据
        this.topImg = res.data.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>>
