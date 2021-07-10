<template>
  <div class="flowerarea" >
    <div class="ibbar">
      <h3><a @click="toXianhua(chsbasicData.check)">{{chsbasicData.Farea}}</a><span>{{chsbasicData.Stitle}}</span></h3>
      <a class="more" @click="toXianhua(chsbasicData.check)">查看更多 &gt;</a>
    </div>
    <div class="left">
      <a class="info" @click="toXianhua(chsbasicData.check)">
        <div class="img">
          <img :src="chsbasicData.isrc"/>
        </div>
        <h5>{{chsbasicData.Farea}}专区</h5>
        <p>进入专区</p>
      </a>
    </div>
    <div class="right">
      <Floweritem v-for="item of 6" :key="item" :citemData="cAreaData[item-1]" />
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import Floweritem from "../Floweritem.vue";

export default {
  name: "FlowerArea",
  data() {
    return {
        // Farea: "韩式鲜花",
        // Stitle: "意·爱的简约而不简单",
        // isrc: require('../../assets/Flowerarea/ib200.jpg'),
    };
  },
  props: {
    chsbasicData: {
      type: Object,
      defalut() {
        return {}
      }
    },
    cAreaData: {
      type: Object,
      defalut() {
        return {}
      }
    }
  },
  methods: {
    // gotoDetails() {
    //   this.$router.push('/details');
    // }
    toXianhua(val) {
      this.$router.push({ path: "/xianhua", query: { values: val } });
    },
  },
  components: {
    Floweritem,
  },
};
</script>

<style scoped lang='scss'>
.flowerarea {
  margin-bottom: 50px;
  .clear {
      clear: both;
  }
}
.ibbar {
  height: 50px;
    position: relative;
  h3 {
    font-size: 100%;
    a {
      font-size: 26px;
      font-weight: 700;
      color: #ab0828;
      text-decoration: none;
      cursor: pointer;
    }
    span {
      margin-left: 10px;
      font-size: 14px;
      color: #6e6e6e;
    }
  }
  a {
    cursor: pointer;
  }
  .more {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: #6e6e6e;
    text-decoration: none;
    &:hover {
      color: #ff6980;
      transition: color 0.3s;
    }
  }
}
.left {
  float: left;
  margin-right: 30px;
  width: 276px;
  height: 645px;
  cursor: pointer;
  .info {
    width: 276px;
    height: 645px;
    background-color: #f7f7f7;
    display: inline-block;
    position: relative;
    color: #333;
    text-decoration: none;
    .img {
      height: 412px;
      width: 276px;
      text-align: center;
      img {
        height: 412px;
        width: 276px;
        max-width: 295px;
      }
    }
    h5 {
      font-size: 26px;
      color: #ab0828;
      margin-top: 65px;
      text-align: center;
    }
    p {
      height: 30px;
      line-height: 30px;
      margin: 45px 80px;
      border: 1px solid #7d0022;
      font-size: 18px;
      color: #ab0828;
      text-align: center;
      &:hover {
        background: rgb(125, 0, 34);
        color: white;
      }
    }
  }
}
.right .Floweritem {
  float: left;
}
</style>
