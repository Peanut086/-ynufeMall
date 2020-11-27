<template>
	<div id="home">
		<!--顶部标题-->
		<nav-bar class="home-nav">
			<div slot="center">淘宝女人街</div>
		</nav-bar>
		<scroll class="content" 
						ref="scroll"
						@scroll="scrollContent">
<!--				<div>-->
					<!--轮播图部分-->
					<home-swiper :banners="banners"></home-swiper>
					<!--首页推荐-->
					<recommend-views :recommends="recommends"/>
					<!--特性分类推荐商品部分-->
					<feature-view/>
					<!--流行  新款   精选-->
					<tab-control class="tab_con" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
					<goods-list :goods=goodsType></goods-list>
<!--				</div>-->
		</scroll>

		<!-- 返回顶部 -->
		<!-- 这里要在跟组件监听事件，因此需要加上native修饰符  -->
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
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
		/*====声明周期函数=====*/
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
			const refresh = this.debounce(this.refreshHeight,500)

			this.$bus.$on('imgLoaded',()=>{
				refresh()
			})
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
			},

			/* 返回顶部按钮监听点击事件 */
			backClick(){
				// 执行操作之前先判断scroll实例是否存在
				this.$refs.scroll && this.$refs.scroll.backTop(0,0,800)
			},

			/*控制返回按钮的显示*/
			scrollContent(position){
				if(Math.abs(position) > 1000){
					this.isShowBackTop = true
				}else{
					this.isShowBackTop = false
				}
			},

			/*重新计算contentHeight*/
			refreshHeight(){
				this.$refs.scroll && this.$refs.scroll.refreshContent()
			},

			/*监听图片加载的节流方法*/
			debounce(func,delay) {
				let timer = null  // 用于保存定时器
				return function (...args) {
					// 如果定时器存在，清除定时器，随后重新设置timer
					if(timer !== null) clearTimeout(timer)
					timer = setTimeout(()=>{
						func.apply(this,args)
					}, delay)  // 超过delay为接收到事件会调用这里的func   必要的额时候可以修改func的this指向  由于timer对外部存在引用，因此不会被销毁
				}
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
		padding-top: 44px;
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
	}
</style>