<template>
  <div class="wrap">
    <div class="title">热门推荐</div>
    <dl>
      <dt class="advice">
        <h1>热门推荐</h1>
        <el-button
          @click="changetj()"
          type="primary"
          icon="el-icon-refresh"
          round
          >换一换</el-button>
        <p>每周一个惊喜，装扮美好生活。</p>
      </dt>
      <dd v-for="(item, index) in goodsList" :key="index">
        <Floweritem :citemData="goodsList[index]" />
      </dd>
    </dl>
  </div>
</template>

<script>
import Floweritem from "../Floweritem.vue";

export default {
  name: "Tuijian",
  data() {
    return {
      goodsList: []
    };
  },
  props: {
    ctjAreaData: {
      type: Object,
      defalut() {
        return {}
      }
    }
  },
  components: {
    Floweritem,
  },
  watch: {
    ctjAreaData: function(newVal,oldVal){
      // props 数据一来就存在goodslist里，并执行changetj()
      this.goodsList = newVal;
      newVal&&this.changetj()
    }
  },
  methods: {
    changetj () {
      this.goodsList = []
      this.goodsList.push(this.ctjAreaData[Math.floor(Math.random() * this.ctjAreaData.length)])
      this.goodsList.push(this.ctjAreaData[Math.floor(Math.random() * this.ctjAreaData.length)])
      this.goodsList.push(this.ctjAreaData[Math.floor(Math.random() * this.ctjAreaData.length)])
    }
  }
};
</script>

<style scoped lang='scss'>
.wrap {
  height: 460px;
  // margin-bottom: 20px;
  .title {
    text-align: center;
    color: rgb(58, 58, 58);
    font-size: 30px;
    height: 60px;
    margin-top: 50px;
    margin-bottom: 10px;
  }
  dl dd {
    float: left;
    // margin-left: 30px;
    margin-bottom: 19px;
  }
}
.advice {
  float: left;
  width: 276px;
  height: 260px;
  padding: 30px 0;
  margin-right: 30px;
  text-align: center;
  background: rgb(199, 34, 83);
  h1 {
    color: white;
    margin: 25px 0;
  }
  .el-button {
    width: 150px;
    height: 60px;
    font-size: 20px;
    margin: 30px 0;
  }
  p {
    margin-top: 10px;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>
