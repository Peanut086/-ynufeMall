<template>
  <div class="contain">
    <detail-nav-bar class="detail-nav"/>
		<scroll ref="scroll" 
						class="contents"
						:probeType="3"
						:pullUpLoad="true">
			<!-- 轮播 -->
			<detail-swiper :topImg="topImg"/>
			<!-- 商品基本信息 -->
			<detail-base-info :goodsData="goods"/>
			<!-- 店铺基本信息 -->
			<shop-base-info :shopInfo="shop"/>
			<!-- 商品详情展示 -->
			<detail-goods-info :goodsInfo="detaiGoodsInfo"
													@loaded="loadCompelete"/>
			<!-- 商品参数 -->
			<goods-param-info :params="goodsParams"/>
			<!-- 评论区 -->
			<detail-comment-info :comments="commentData"></detail-comment-info>
		</scroll>
	</div>
</template>

<script>
	// 导入Scroll组件
	import Scroll from '../../components/common/scroll/Scroll.vue'
  // 导入详情页导航组件
  import DetailNavBar from './childComps/DetailNavBar'
  // 导入轮播
  import DetailSwiper from './childComps/DetailSwiper'
	// 导入DetailBaseInfo组件
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	// 导入店铺基本信息ShopBaseInfo组件
	import ShopBaseInfo from './childComps/ShopBaseInfo'
	// 导入商品详情展示组件DetailGoodsInfo
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	// 导入商品参数组件
	import GoodsParamInfo from './childComps/GoodsParamInfo'
	// 导入评论区组件DetailCommentInfo
	import DetailCommentInfo from './childComps/DetailCommentInfo'

  // 网络请求
  import {getDetail,Goods,Shop,GoodsInfo,ItemParam,Comment} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
			Scroll,
      DetailNavBar,
      DetailSwiper,
			DetailBaseInfo,
			ShopBaseInfo,
			DetailGoodsInfo,
			GoodsParamInfo,
			DetailCommentInfo
    },
    data(){
      return {
        iid: null, // 用于保存路由传递过来的参数：商品id
        topImg: [], // 保存轮播图数据
				goods: {}, // 用于保存要传递给DetailBaseInfo组件的数据
				shop: {},  // 用于保存店铺基本信息
				detaiGoodsInfo: {}, // 用于保存商品详情
				goodsParams: {},  // 用于保存商品参数
				commentData: {},  // 用于保存评论信息
			}
    },
    created(){
      // 保存商品id
      this.iid = this.$route.params.iid

      // 根据id请求数据并保存下来
      getDetail(this.iid).then(res => {
        // 保存轮播图数据
        console.log(res.data.result);
				const datas = res.data.result;
        this.topImg = datas.itemInfo.topImages
		
				// 保存要传递给保存要传递给DetailBaseInfo组件的数据
				this.goods = new Goods(datas.columns,datas.itemInfo,datas.shopInfo.services)
				
				// 保存请求到的店铺基本信息
				this.shop = new Shop(datas.shopInfo)
				
				// 保存商品详情数据
				this.detaiGoodsInfo = new GoodsInfo(datas.detailInfo)
				
				// 保存商品参数
				this.goodsParams = new ItemParam(datas.itemParams.info,datas.itemParams.rule)
				
				// 保存商品评论
				this.commentData = new Comment(datas.rate.cRate,datas.rate.list)
      })
    },
		methods: {
			// 商品图片加载完毕，刷新content高度
			loadCompelete(){
				this.$refs.scroll && this.$refs.scroll.refreshContent()
			}
		}
  }
</script>

<style scoped>
	.contain{
		position: relative;
		height: 100vh;
		z-index: 9;
	}
	.contents{
		z-index: 9;
		height: calc(100% - 44px);
		background-color: #fff;
	}
	
	.detail-nav{
		position: relative;
		z-index: 10;
		background-color: #fff;
	}
</style>>
