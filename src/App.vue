<template>
  <div id="app">
		<!--缓存当前激活的组件  除了Detail组件-->
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
		<main-tab-bar/>
  </div>
</template>

<script>
	import MainTabBar from "./components/content/mainTabbar/MainTabBar";
	
	// 导入状态管理对象
	import store from './store/index.js'

	export default {
		name: 'app',
		components: {
			MainTabBar
		},
		store
	}
</script>

<style>
	@import "assets/css/base.css";
</style>
