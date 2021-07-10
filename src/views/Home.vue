<template>
  <div class="home">
    <!-- <Topper />
    <Header /> -->
    <Slider />
    <div class="hview">
      <Tuijian id="tj1" :ctjAreaData="tjAreaData" />
      <Banner />
      <FlowerArea id="tj2" :cAreaData="hsAreaData" :chsbasicData="hsbasicData" />
      <FlowerArea id="tj3" :cAreaData="hhAreaData" :chsbasicData="hhbasicData" />
      <FlowerArea id="tj4" :cAreaData="ysAreaData" :chsbasicData="ysbasicData" />
    </div>
    <Rside :crsideData="rsideData" />
    <!-- <Footer/> -->
  </div>
</template>

<script>
// import Topper from "../components/Topper.vue";
// import Header from "../components/Header.vue";
import Slider from "../components/Home/Slider.vue";
import Tuijian from "../components/Home/Tuijian.vue";
import Banner from "../components/Banner.vue";
import FlowerArea from "../components/Home/FlowerArea";
import Rside from "../components/Home/Rside.vue";
// import Footer from "../components/Footer/Footer.vue"

// import { GETTREEDATA, three } from "../utils/user.js"; //导入api
import { apiGoodsData } from "../utils/api"; //导入api

export default {
  name: "Home",
  data() {
    return {
      apidata: [],
      tjAreaData: [],
      hsAreaData: [],
      hsbasicData: {
        check: 1,
        Farea: "韩式鲜花",
        Stitle: "意·爱的简约而不简单",
        isrc: require('../assets/Flowerarea/ib200.jpg'),
      },
      ysAreaData: [],
      ysbasicData: {
        check: 3,
        Farea: "永生花",
        Stitle: "许·她一生承诺",
        isrc: require('../assets/Flowerarea/ib201-3.jpg'),
      },
      hhAreaData: [],
      hhbasicData: {
        check: 2,
        Farea: "创意花盒",
        Stitle: "质·A级花材/奢侈一族",
        isrc: require('../assets/Flowerarea/ib202.jpg'),
      },
      rsideData: ["热门推荐"],
    };
  },
  created() {
    apiGoodsData() //调用api接口以及传参
      .then(res => {
        // console.log(res);
        this.apidata = res.data;
        this.tjAreaData = res.data;
        this.tjAreaData.sort((m, n) => {
          return n.sold - m.sold;
        });
        res.data.forEach((item) => {
          if (item.category == "韩式花束") {
            this.hsAreaData.push(item);
          }
        });
        res.data.forEach((item) => {
          if (item.category == "永生花") {
            this.ysAreaData.push(item);
          }
        });
        res.data.forEach(item => {
          if(item.category == "创意花盒") {
            this.hhAreaData.push(item);
          }
        })
        this.rsideData.push(this.hsbasicData.Farea);
        this.rsideData.push(this.hhbasicData.Farea);
        this.rsideData.push(this.ysbasicData.Farea);
        // console.log(this.tjAreaData);
      });
  },
  computed: {},
  methods: {},
  components: {
    // Topper,
    // Header,
    Slider,
    Tuijian,
    Banner,
    FlowerArea,
    Rside,
    // Footer
  },
};
</script>

<style lang="scss" scoped>
.home .hview {
  width: 1200px;
  margin: 0 auto;
  // &:nth-child()
}
</style>
