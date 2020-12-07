<template>
  <div>
    <detail-nav-bar/>
		<!-- 轮播 -->
    <detail-swiper :topImg="topImg"/>
		<!-- 商品基本信息 -->
		<detail-base-info :goodsData="goods"></detail-base-info>
	</div>
</template>

<script>
  // 导入详情页导航组件
  import DetailNavBar from './childComps/DetailNavBar'
  // 导入轮播
  import DetailSwiper from './childComps/DetailSwiper'
	// 导入DetailBaseInfo组件
	import DetailBaseInfo from './childComps/DetailBaseInfo'

  // 网络请求
  import {getDetail,Goods} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
			DetailBaseInfo
    },
    data(){
      return {
        iid: null, // 用于保存路由传递过来的参数：商品id
        topImg: [], // 保存轮播图数据
				goods: {}, // 用于保存要传递给DetailBaseInfo组件的数据
      }
    },
    created(){
      // 保存商品id
      this.iid = this.$route.params.iid

      // 根据id请求数据并保存下来
      getDetail(this.iid).then(res => {
        // 保存轮播图数据
				const datas = res.data.result;
        this.topImg = datas.itemInfo.topImages
		
				// 保存要传递给保存要传递给DetailBaseInfo组件的数据
				this.goods = new Goods(datas.columns,datas.itemInfo,datas)
      })
    }
  }
</script>

<style scoped>

</style>>
