<template>
  <div class="contain">
    <detail-nav-bar class="detail-nav" @detailNavClick="gotoTarget" ref="nav"/>
		<scroll ref="scroll" 
						class="contents"
						:probeType="3"
						:pullUpLoad="true"
						@scroll="onScrolling"
						touch-action: none>
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
			<goods-param-info ref="param" :params="goodsParams"/>
			<!-- 评论区 -->
			<detail-comment-info ref="comment" :comments="commentData"></detail-comment-info>
			<!-- 商品推荐 -->
			<goods-list ref="recommend" :goods="recommend"/>
		</scroll>
		<!-- 返回顶部  组件根元素监听原生事件，需要加.native修饰符 -->
		<back-top @click.native="back"
							v-if="positionY >= 1000"/>
		<!-- 底部导航 -->
		<detai-bottom-nav @addGoods="addGoodsItem"/>
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
	// 导入推荐商品组件
	import GoodsList from '../../components/content/goods/GoodsList'
	
	// 导入返回顶部按钮组件
	import BackTop from '../../components/content/back-top/backTop.vue'
	// 导入底部导航组件
	import DetaiBottomNav from './childComps/DetailBottomNav.vue'

  // 网络请求
  import {getDetail,Goods,Shop,GoodsInfo,ItemParam,Comment,getRecommend} from 'network/detail'

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
			DetailCommentInfo,
			GoodsList,
			BackTop,
			DetaiBottomNav,
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
				positionY: 0, // 用于保存y轴滚动的距离
				recommend: [], // 用于保存请求到的推荐列表的数据
				topThemeY: [], // 用于保存nav对应的组件的offsetTop值
				curIndex: null, // 用于保存nav联动滚动时需要传递的index
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
			
			/* 请求推荐模块的数据 */
			getRecommend().then(res => {
				// 保存数据
				this.recommend = res.data.data.list
			})
    },
		methods: {
			// 商品图片加载完毕，刷新content高度
			loadCompelete(){
				this.$refs.scroll && this.$refs.scroll.refreshContent()
				
				// 计算nav对应的模块的offsetTop值    这部分的逻辑代码放到create、mounted、updated中都不合适   也不能使用$nextTick()
				// 由于所有图片加载完成后才会执行该方法，因此这里不需要考虑防抖
				this.topThemeY.push(0)
				this.topThemeY.push(this.$refs.param.$el.offsetTop)
				this.topThemeY.push(this.$refs.comment.$el.offsetTop)
				this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
			},
			
			/* 返回顶部 */
			back(){
				this.$refs.scroll && this.$refs.scroll.backTop(0,0,800)
			},
			
			/* 记录当前滚动的y值 */
			onScrolling(position){
				this.positionY = Math.abs(position);
				
				// 滚动时nav导航的联动效果实现方法
				const posi = Math.abs(position)
				const themeLength = this.topThemeY.length;
				/* i~i+1之间
				 0:0~n1之间  index--0
				 1:n1~n2之间  index--1
				 2:n2~n3之间  index--2
				 3:n3及以上  index--3
				 */
				// 1.判断当前滚动到什么位置
				// 需要分情况  因为前三个区间是闭合的   最后一个可以大于等于临界值
				for (let i in this.topThemeY) {
					// 前三个
					if(i < themeLength - 1){
						let tempNum = Number(i) + 1
						if(posi > this.topThemeY[i] && posi <= this.topThemeY[tempNum]){
							this.curIndex = i;
							this.$refs.nav.currentIndex = this.curIndex
						}
					}
					// 最后一个
					else if(posi >= this.topThemeY[i]){
						this.curIndex = i;
						this.$refs.nav.currentIndex = this.curIndex
					}
				}
			},
			
			/* 点击导航跳转到对应的位置 */
			gotoTarget(index){
				// 为啥要 -1 呢？  因为这里计算的不是很准确  从而导致跳转的不太对  需要稍微减掉一部分值
				this.$refs.scroll && this.$refs.scroll.backTop(0,-this.topThemeY[index] - 1,800)
			},
			
			/* 添加到购物车 */
			addGoodsItem(){
				// 用于保存加入到购物车的商品需要展示的信息
				let product = {}
				product.title = this.goods.title
				product.desc = this.detaiGoodsInfo.desc
				product.price = this.goods.lowNowPrice
				product.image = this.topImg[0]
				product.iid = this.iid  // 需要传递id  
				
				// 将商品保存到vuex中
				this.$store.dispatch('addCartItem',product)
			}
		}
  }
</script>

<style scoped>
	.contain{
		position: relative;
		height: 100vh;
		z-index: 9;
		background-color: #fff;
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
