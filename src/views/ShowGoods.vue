<template>
  <div class="goods-list">
    <div class="container">
      <Banner />
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>鲜花列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div class="search-options">
          <div class="leibie">
            <div class="title">类别：</div>
            <div class="label">
              <el-badge
                is-dot
                class="item"
                v-for="(item, index) in hcata"
                :key="index"
                @click="(activeIndex1 = index), (activeIndex2 = -1)"
                :hidden="activeIndex1 !== index"
                :class="{ active: activeIndex1 === index }"
              >
                <el-check-tag @click="changeList1(item.check)" checked>
                  {{ item.title }}
                </el-check-tag>
              </el-badge>
            </div>
          </div>
          <div class="jiage">
            <div class="title">销售价：</div>
            <div class="label">
              <el-badge
                is-dot
                class="item"
                v-for="(item, index) in hprice"
                :key="index"
                @click="(activeIndex2 = index), (activeIndex1 = -1)"
                :hidden="activeIndex2 !== index"
                :class="{ active: activeIndex2 === index }"
              >
                <el-check-tag @click="changeList2(item.check)" checked>
                  {{ item.title }}
                </el-check-tag>
              </el-badge>
            </div>
          </div>
        </div>
        <!-- <div class="sort"></div> -->
        <el-empty v-if="isNull()" description="商品为空"></el-empty>
        <div v-else class="productlist">
          <Floweritem
            v-for="(item, index) in viewGoods"
            :key="index"
            :citemData="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import Floweritem from "../components/Floweritem.vue";
import { apiGoodsData, apicgGoods } from "../utils/api.js";

export default {
  data() {
    return {
      itemHidden: true,
      hcata: [
        { title: "韩式花束", check: 1 },
        { title: "创意花盒", check: 2 },
        { title: "永生花", check: 3 },
      ],
      hprice: [
        { title: "250元以内", check: 4 },
        { title: "250-400元", check: 5 },
        { title: "400元以上", check: 6 },
      ],
      activeIndex1: -1,
      activeIndex2: -1,
      allGoods: [],
      viewGoods: [],
    };
  },
  mounted() {
    apiGoodsData().then((res) => {
      this.allGoods = res.data;
      //   this.viewGoods = this.allGoods;
    });
    if (this.$route.query.values == 0) {
      apiGoodsData().then((res) => {
        this.viewGoods = res.data;
      });
    } else if (this.$route.query.values == 1) {
      apicgGoods({ category: "韩式花束" }).then((res) => {
        this.viewGoods = res.data;
      });
    } else if (this.$route.query.values == 2) {
      apicgGoods({ category: "创意花盒" }).then((res) => {
        this.viewGoods = res.data;
      });
    } else if (this.$route.query.values == 3) {
      apicgGoods({ category: "永生花" }).then((res) => {
        this.viewGoods = res.data;
      });
    } else {
      apiGoodsData().then((res) => {
        this.viewGoods = res.data.filter(
          (item) => item.name.indexOf(this.$route.query.values) != -1
        );
      });
    }
  },
  watch: {
    $route: "getNewGoodsList",
  },
  components: {
    Banner,
    Floweritem,
  },
  methods: {
    isNull() {
      if (this.viewGoods.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    changeList1(check) {
      this.viewGoods = [];
      if (check == 1) {
        //点击了 韩式花束
        this.allGoods
          .filter((item) => item.category == "韩式花束") //选出韩式花束数组
          .forEach((item) => this.viewGoods.push(item)); //将每一项压入viewGoods数组
      } else if (check == 2) {
        //点击了 创意花盒
        this.allGoods
          .filter((item) => item.category == "创意花盒") //选出创意花盒数组
          .forEach((item) => this.viewGoods.push(item)); //将每一项压入viewGoods数组
      } else {
        //点击了 永生花
        this.allGoods
          .filter((item) => item.category == "永生花") //选出永生花数组
          .forEach((item) => this.viewGoods.push(item)); //将每一项压入viewGoods数组
      }
    },
    changeList2(check) {
      //   if(this.viewGoods.length == 0){
      //       console.log("err");
      //   }
      this.viewGoods = this.allGoods;
      if (check == 4) {
        this.viewGoods = this.viewGoods.filter((item) => item.xprice < 250); //选出 250元以内
      } else if (check == 5) {
        this.viewGoods = this.viewGoods.filter(
          (item) => item.xprice >= 250 && item.xprice <= 400
        ); //选出 250-400 元
      } else {
        this.viewGoods = this.viewGoods.filter((item) => item.xprice > 400); //选出 400 元以上
      }
    },
    getNewGoodsList() {
      //路由变化重新申请数据
      if (this.$route.query.values == 0) {
        apiGoodsData().then((res) => {
          this.viewGoods = res.data;
        });
        // this.viewGoods = this.allGoods;
      } else if (this.$route.query.values == 1) {
        apicgGoods({ category: "韩式花束" }).then((res) => {
          this.viewGoods = res.data;
        });
      } else if (this.$route.query.values == 2) {
        apicgGoods({ category: "创意花盒" }).then((res) => {
          this.viewGoods = res.data;
        });
      } else if (this.$route.query.values == 3) {
        apicgGoods({ category: "永生花" }).then((res) => {
          this.viewGoods = res.data;
        });
      } else {
        apiGoodsData().then((res) => {
          this.viewGoods = res.data.filter(
            (item) => item.name.indexOf(this.$route.query.values) != -1
          );
        });
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.active {
  color: red;
}
.goods-list {
  width: 100%;
  // background: #fafafa;
  .container {
    width: 1200px;
    margin: 0 auto;
    .banner {
      margin: 20px 0;
    }
    .breadcrumb {
      margin: 10px 0;
    }
    .main {
      .search-options {
        .leibie,
        .jiage {
          display: flex;
          background: #fafafa;
          height: 50px;
          align-items: center;
          border-bottom: 1px dashed #e5e5e5;
          .title {
            width: 80px;
            padding-left: 10px;
            margin-right: 20px;
          }
          .label {
            el-check-tag {
              //   margin-right: 40px;
              cursor: pointer;
              &:hover {
                color: pink;
              }
              //   &:visited {
              //     color: pink;
              //   }
            }
          }
        }
        .jiage {
          margin-bottom: 40px;
        }
      }
      .productlist {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 50px;
      }
    }
  }
}
.item {
  margin-right: 40px;
}
</style>
