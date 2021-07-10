<template>
  <div class="Floweritem" @click="gotoDetails()">
    <a href="#">
      <div><img :src="citemData.iimg" alt="!" /></div>
      <h5>{{citemData.name}}</h5>
      <p>
        <span>￥{{ citemData.xprice }}</span>
        <span class="scj">原价 ￥{{ citemData.yprice }}</span>
        <label>已售 {{ citemData.sold }}</label>
      </p>
    </a>
  </div>
</template>

<script>
// import { apiIdGoods } from '../utils/api'

export default {
  name: "Floweritem",
  data() {
    return {
      // fdata : {},
      isrc: require("../assets/Floweritem/279c7_17c14.jpg"),
      Ftitle: "Full love浓情鲜花系列9枝红玫瑰+栀子叶",
      Cprice: "138.00",
      Oprice: "328.00",
      Sold: "2499",
    };
  },
  props: {
    citemData: {
      type: Object,
      default() {
        return { iimg: "", name: "", xprice: "", yprice: "", sold: "" };
      },
    },
  },
  methods: {
    gotoDetails() {
      this.$router.push({path:'/details',query:{id:this.citemData.id}});
      // console.log(this.citemData);
    }
  },
  created() {
    // console.log(this.citemData);
  },
  components: {},
};
</script>

<style scoped lang='scss'>
.Floweritem {
  margin: 0 10px 10px 10px;
  &:hover {
    position: relative;
    top: -10px;
  }
}
.Floweritem a {
  color: #333;
  text-decoration: none;
  width: 278px;
  height: 313px;
  border-radius: 5px;
  background-color: #fff;
  display: inline-block;
  &:hover {
    -moz-box-shadow: 0 0 15px #f4f4f4;
    -webkit-box-shadow: 0 0 15px #f4f4f4;
    box-shadow: 0 0 15px #f4f4f4;
  }
  &:hover h5 {
    color: #ff6980;
  }
  img {
    background-color: #f9fafe;
    width: 278px;
    height: 244px;
    text-align: center;
  }
  h5 {
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    margin: 10px 25px 5px 25px;
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  p {
    margin: 0 25px;
    text-align: left;
    line-height: 20px;
    font-weight: 700;
    font-size: 16px;
    color: #ff6980;
    .scj {
      line-height: 20px;
      font-size: 12px;
      color: #999;
      text-decoration: line-through;
      font-weight: normal;
    }
    label {
      float: right;
      color: #b57c5b;
      font-weight: normal;
      font-size: 13px;
    }
  }
}
</style>
