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

	export default {
		name: 'app',
		components: {
			MainTabBar
		}
	}
</script>

<style>
	@import "assets/css/base.css";
</style>
