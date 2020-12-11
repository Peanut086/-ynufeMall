<template>
	<div class="param-container">
		<div class="rule">
			<!-- 尺码对照表 -->
			<p>{{params.disclaimer}}</p>
			<p class="param-title">
				<img src="../../../assets/img/detail/rule.svg">
				{{params.ruleKey}}
			</p>
			
			<!-- 尺码表 -->
			<table class="rule-table">
				<tr v-for="(item,index) in params.table" :key="index">
					<td v-for="(item_sub,index) in item" :key="index">{{item_sub}}</td>
				</tr>
			</table>
		</div>
		
		<div class="set">
			<p class="param-title">
				<img src="../../../assets/img/detail/rule.svg">
				{{params.infoKey}}
			</p>
			
			<!-- 产品参数 -->
			<table class="set-table">
				<tr v-for="(item,index) in params.set" :key="index">
					<td v-for="(item_sub,index) in item " :key="index">{{item_sub}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsParamInfo',
		props: {
			params: {
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style>
	.param-container{
		font-size: 18px;
		width: 100%;
		margin-top: 20px;
		box-sizing: border-box;
	}
	
	/* 尺码对照表 */
	.rule{
		width: 100%;
	}
	
	.rule>p{
		padding: 0 10px;
	}
	
	.param-title{
		font-weight: 600;
		height: 20px;
		line-height: 20px;
		margin: 10px 0 0 0;
		text-align: center;
	}
	
	.param-title>img{
		width: 20px;
		height: 20px;
		vertical-align: text-bottom; 
	}

	.rule-table{
		width: 100%;
		text-align: center;
		margin: 20px 0;
		border: 1px solid #ccc;
		border-collapse: collapse;
	}
	
	.rule-table tr{
		margin: 20px 0;
		background-color: #a1f9f4;
		border-bottom: 1px solid #ccc;
	}
	
	.set-table{
		width: 100%;
		text-align: left;
		padding: 0 15px;
		margin-top: 10px;
		border-collapse: collapse;
	}
	
	.set-table tr{
		height: 30px;
		border-bottom: 1px solid #ccc;
	}
	
	.set-table tr td:nth-child(even){
		width: 80%;
		color: #e685ee;
	}
	
	.set-table tr td:nth-child(odd){
		text-align: center;
	}
</style>
