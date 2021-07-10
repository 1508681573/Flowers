<template>
  <div class="block">
    <el-carousel height="460px">
      <el-carousel-item v-for="item in isrc" :key="item">
        <a href="#"><img :src="item" alt="!"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    name: 'Slider',
    data() {
        return {
            isrc: ['img/2021d_43cb.jpg','img/201d3_28bf.jpg','img/13e61_17e18.jpg','img/17270_1148b.jpg']
        }
    }
}
</script>

<style scoped lang="scss" >
  .el-carousel__item a {
    display: block;
  }
</style>