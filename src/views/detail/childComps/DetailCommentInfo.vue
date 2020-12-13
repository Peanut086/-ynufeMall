<template>
	<div v-if="Object.keys(comments).length !== 0" class="comment-info">
		<!-- 评论区标题 -->
		<div class="comment-title">
			<img src="../../../assets/img/detail/comment.svg">
			看看买过的人怎么说...
		</div>
		
		<!-- 没有评论数据时 -->
		<div v-if="comments.cRate == 0">
			<p style="text-align: center;font-size: 16px;">空空如也，快下单评论吧！</p>
		</div>
		
		<div v-else>
			<!-- 评论区头部 -->
			<div class="comment-hd clear-fix">
				<span>所有评论 ({{comments.cRate}}条)</span>
				<span style="float: right;font-size: 16px;margin-top: 5px;">更多>></span>
			</div>
			
			<!-- 评论的用户信息 -->
			<div class="comment-user">
				<!-- 头像 -->
				<div class="userIcon">
					<img :src="'http:' + comments.userIcon">
				</div>
				<!-- 用户名  购买的商品尺码 -->
				<div class="userStyle">
					<div class="u-name">{{comments.userName}}</div>
					<div class="u-style">{{comments.style}}</div>
				</div>
			</div>
			
			<!-- 评论内容及商家回复 -->
			<div class="content" >
				<div class="user-comment">{{comments.comment}}</div>
				<img class="showing"
					v-for="(item,index) in comments.images"
					:src="item">
				</img>
			</div>
			<div class="replies" v-if="comments.explain">{{comments.explain}}</div>
			<div class="cur-time">{{comments.cretaed | showDate}}</div>
		</div>
	</div>
</template>

<script>
	// 日期格式化方法导入
	import {formatDate} from "../../../common/utils.js"
	export default {
		name: 'DetailCommentInfo',
		props: {
			comments: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		filters: {
		  showDate: function (value) {
		    let dates = new Date(value*1000);
		    return formatDate(dates, 'yyyy-MM-dd')
		  }
		}
	}
</script>

<style>
	.comment-info{
		box-sizing: border-box;
		width: 100%;
		margin-top: 20px;
		padding-bottom: 10px;
		background-color: #f8f8f8;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 2px 2px 2px 3px #e2e2e2 inset;
	}
	
	/* 评论区标题 */
	.comment-title{
		height: 20px;
		color: #5e5e5e;
		margin: 10px 0;
		font-size: 22px;
		line-height: 20px;
		text-align: center;
	}
	
	.comment-title>img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	/* 评论区头部 */
	.comment-hd{
		padding: 10px;
		border-bottom: 1px solid #da6cda;
	}
	.comment-hd>span{
		font-size: 20px;
	}
	
	/* 用户信息 */
	.comment-user{
		display: flex;
		flex-direction: row;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
	.comment-user>.userIcon{
		display: inline-block;
		width: 60px;
		height: 60px;
		border-radius: 30px;
		overflow: hidden;
	}
	.comment-user>.userIcon>img{
		width: 100%;
		height: 100%;
	}
	.comment-user>.userStyle{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.comment-user>.userStyle div{
		flex: 1;
		line-height: 100%;
		padding-left: 10px;
	}
	.u-name{
		font-size: 18px;
		color: #0F0F0F;
	}
	.u-style{
		color: #bababa;
	}

	.user-comment{
		color: #af3ca9;
		padding: 15px 8px 0 8px;
		font-size: 16px;
		text-indent: 20px;
	}
	
	.showing{
		width: 60px;
		height: 60px;
		margin-left: 18px;
	}
	
	.replies{
		font-size: 16px;
		color: #A9A9A9;
		padding: 20px;
		/* 用于设置超过三行的内容省略号的形式显示 */
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.cur-time{
		font-size: 16px;
		color: #A9A9A9;
		padding: 0 20px;
	}
</style>
