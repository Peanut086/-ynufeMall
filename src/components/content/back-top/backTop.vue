<template>
  <div class="back">
    <img src="~assets/img/home/backToTop.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'backTop'
}
</script>

<style scope>
  .back{
    position: fixed;
    bottom: 50px;
    right: 5px;

    width: 40px;
    height: 40px;
    background-color: transparent;
  }

  .back img{
    width: 100%;
    height: 100%;
  }
</style>