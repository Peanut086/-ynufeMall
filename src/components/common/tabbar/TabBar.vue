<template>
	<div id="tabbar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "TabBar",
	}
</script>

<style scoped>
#tabbar{
	height: 49px;
	font-size: 14px;
	background-image: linear-gradient(to bottom right, #f6f5f5, #eab8ef, #d7d4d7);

	/*始终在页面底部显示*/
	position: fixed;
	left: 0;
	right: 0;/*加这个是为了左右两边都保证与设备边缘贴齐*/
	bottom: 0;

	/*布局*/
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	/*上边距阴影*/
	box-shadow: 0 -1px 2px 1px rgba(0,0,0,.3);
}
</style>