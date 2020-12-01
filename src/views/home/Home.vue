<template>
	<!--缓存home组件-->
	<keep-alive>
		<div id="home">

			<!--顶部标题-->
			<nav-bar class="home-nav">
				<div slot="center">淘宝女人街</div>
			</nav-bar>

			<!-- 用于解决吸顶效果的卡顿 -->
			<tab-control
					:titles="['流行','新款','精选']"
					@tabClick="tabClick"
					ref="tabControl1"
					v-show="isTabShow">
			</tab-control>

			<scroll class="content"
			        ref="scroll"

			        :probe-type="3"
			        :pull-up-load="true"

			        @scroll="scrollContent"
			        @loading="loadMore">

				<!--轮播图部分-->
				<home-swiper :banners="banners"
				             @swiperImageLoad="getTabConTop"></home-swiper>

				<!--首页推荐-->
				<recommend-views :recommends="recommends"/>

				<!--特性分类推荐商品部分-->
				<feature-view/>

				<!--流行  新款   精选-->
				<tab-control
						:titles="['流行','新款','精选']"
						@tabClick="tabClick"
						ref="tabControl2"
						v-show="!isTabShow">
				</tab-control>
				<goods-list :goods=goodsType></goods-list>
				<!--				</div>-->
			</scroll>

			<!-- 返回顶部 -->
			<!-- 这里要在跟组件监听事件，因此需要加上native修饰符  -->
			<back-top @click.native="backClick" v-show="isShowBackTop"/>
		</div>
	</keep-alive>
</template>

<script>
	/*公共组件*/
	// 导入顶部导航组件
	import NavBar from "components/common/navbar/NavBar";
	import TabControl from "components/content/tabControl/TabControl";

	/*home特有的*/
	//导入首页轮播图组件
	import HomeSwiper from "./childComps/HomeSwiper";
	// 导入首页推荐板块组件
	import RecommendViews from "./childComps/RecommendViews";
	// 导入feature组件
	import FeatureView from "./childComps/FeatureView";
	// 导入首页商品列表组件
	import GoodsList from "../../components/content/goods/GoodsList";
	// 导入better-scroll组件
	import Scroll from '../../components/common/scroll/Scroll'
	// 导入返回顶部 按钮组件
	import BackTop from '../../components/content/back-top/backTop'

	/*数据请求*/
	// 导入首页轮播图数据请求
	import { getHomeMultidata,getHomeGoods } from '../../network/home'

	/*导入函数*/
	// 防抖函数
	import {debounce} from '../../common/utils'

	export default {
		name: "Home",
		components: {
			NavBar,
			TabControl,

			HomeSwiper,
			RecommendViews,
			FeatureView,
			GoodsList,
			Scroll,
			BackTop
		},
		/*====生命周期函数=====*/
		// 组件创建完毕时，发送请求   请求所有数据   但是只保存轮播图、推荐部分的数据
		created() {
			this.getMultidata(),
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted(){
			// 实例被挂载完成后开始监听商品展示组件的每一张图片的加载事件
			// this.$bus.$on('imgLoaded',this.refreshHeight)
			const refresh = debounce(this.refreshHeight,100)

			this.$bus.$on('imgLoaded',()=>{
				refresh()
			})
		},
		deactivated() {
			// 保存离开时bs滚动的Y值
			this.saveY = this.$refs.scroll.scroll.y
		},
		activated() {
			// 再次激活时，设置y值为离开前的那个值
			this.$refs.scroll && this.$refs.scroll.backTop(0,this.saveY,0)
		},
		// 保存请求到的数据
		data(){
			return {
				banners: [],
				recommends: [],
				goods: {  // 保存首页所有商品数据
					'pop': {page:0,list:[]},   // 分别保存当前页码  当前显示的数据条数
					'new': {page:0,list:[]},
					'sell': {page:0,list:[]},
				},
				currentType: 'pop', // 用于控制首页商品数据展示类型
				isShowBackTop: false,  // 保存是否显示回顶部按钮的状态
				tabConOffsetTop: 0,  // 保存tabbarControl的offsetTop值
				isTabShow: false,  // 顶部用于吸顶的tab是否显示
				saveY: 0,  // 用于保存当前组件取消激活时的bs的Y值
			}
		},
		methods: {
			/*网络请求相关方法*/
			/*抽离轮播、推荐数据请求方法*/
			getMultidata(){
				getHomeMultidata().then(res => {
					this.banners = res.data.data.banner.list
					this.recommends = res.data.data.recommend.list
				})
			},
			/*首页流行、新款、精选商品数据方法抽离*/
			getHomeGoods(type){ // type是要请求的商品类别
				// 每请求一次  page+1  因为调用下面的请求方法时不能把请求页码写死
				getHomeGoods(type,this.goods[type].page + 1).then(res => {
					// 将数据保存到对应的goods属性中
					this.goods[type].list.push(...res.data.data.list)
					// 修改page  goods对应的page基础上+1
					this.goods[type].page += 1
				})
			},

			/*
			* 其他方法
			* */

			/*控制tabControl数据显示*/
			tabClick(index){
				// 根据返回的index值修改currentType值
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				// 同步两个tabControl的index值  否则点击其中一个另一个index不会同步变动
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},

			/* 返回顶部按钮监听点击事件 */
			backClick(){
				// 执行操作之前先判断scroll实例是否存在
				this.$refs.scroll && this.$refs.scroll.backTop(0,0,800)
			},

			/*控制返回按钮的显示*/
			scrollContent(position){
				// 判断是否需要显示返回顶部按钮
				this.isShowBackTop = Math.abs(position) > 1000 ? true : false
				
				// 判断滚动的距离是否让tabbarControl到达页面顶部，是否需要添加吸顶效果
				this.isTabShow = Math.abs(position) >= this.tabConOffsetTop
			},

			/*重新计算contentHeight*/
			refreshHeight(){
				this.$refs.scroll && this.$refs.scroll.refreshContent()
			},

			/*上拉加载的事件*/
			loadMore(){
				// 请求数据
				this.getHomeGoods(this.currentType)

				// 请求完毕后结束当前的上拉刷新事件  否则加载一两页之后会无法继续刷新
				this.$refs.scroll && this.$refs.scroll.stopScrollUp()
			},

			/*控制tabControl的吸顶效果*/
			getTabConTop(){
				// 保存tabbarControl的offsetTop值
				this.tabConOffsetTop = this.$refs.tabControl2.$el.offsetTop
			}
		},

		computed: {
			/*
			* 用于返回商品类型
			* */
			goodsType(){
				return this.goods[this.currentType].list
			}
		}
	}
</script>

<style scoped>
	#home {
		/*position: relative;*/
		height: 100vh;
		/*防止顶部导航遮挡轮播图*/
		/* padding-top: 44px; */
	}
	.home-nav{
		color: #fff;
		font-weight: 600;
		background-color: var(--color-tint);
		z-index: 9;
	}

	.content{
		height: calc(100% - 93px + 44px);
		overflow: hidden;
		padding-bottom: 0;
	}
</style>