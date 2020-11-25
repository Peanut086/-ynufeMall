<template>
	<!--用ref引用比用class引用要好 不会冲突-->
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	/*导入better-scroll插件*/
	import BetterScroll from 'better-scroll'

	export default {
		name: "Scroll",
		data(){
			return {
				scroll: null
			}
		},
		mounted() {
			setTimeout(()=>{
				this.scroll = new BetterScroll(this.$refs.wrapper,{
					probeType: 3,
					click: true
				})
			},2000)
		}
	}
</script>

<style scoped>

</style>