<template>
  <nav-bar id="nav-bar">
    <!-- 返回按钮 -->
    <div slot="left" class="backHome" @click="backClick">
      <img src="../../../assets/img/detail/back.svg" alt="">
    </div>
    <!-- 中间的导航 -->
    <div slot="center" class="titles">
      <div v-for="(item,index) in titles"
        :class="{active: index == currentIndex}"
        @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  // 导入navbar组件
  import NavBar from '../../../components/common/navbar/NavBar.vue'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0, // 保存当前索引
      }
    },
    methods: {
      // 点击导航时，修改当前的index
      itemClick(index){
        this.currentIndex = index
      },
      // 返回按钮
      backClick(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .titles{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .titles>div{
    flex: 1;
  }

  .active{
    color: rgb(184, 80, 96);
    border-bottom: 1px solid #ccc;
  }

  .backHome{
    width: 44px;
    height: 28px;
    margin-top: 10px;
  }
  .backHome>img{
    width: 100%;
    height: 100%;
  }
</style>