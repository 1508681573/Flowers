<template>
  <div class="details">
    <div class="goodsDetails">
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ path: '/xianhua', query: { values: check } }"
          >
            {{ detailData.category }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ detailData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="shop">
        <div class="shop-preview">
          <img :src="detailData.iimg" alt="" />
        </div>
        <div class="shop-info">
          <div class="shop-title">
            <h2>{{ detailData.name }}</h2>
            <p>
              {{ detailData.huacai }}
            </p>
          </div>
          <div class="shop-price">
            <p class="price0">
              促销价：<span>￥{{ detailData.xprice }}</span>
            </p>
            <p class="price1">
              原价：<span>￥{{ detailData.yprice }}</span>
            </p>
          </div>
          <div class="shop-num">
            <p>
              <span>数量：</span>
              <el-input-number
                v-model="input"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
            </p>
          </div>
          <div class="shop-bot">
            <span class="btn" @click="toOrder">立即抢购</span>
            <span class="btn" @click="addCart">加入购物车</span>
          </div>
        </div>
      </div>
      <div class="shop-desc">
        <div class="details-left">
          <div class="shop-header">
            <ul>
              <li :class="isActive ? 'active' : ''">
                规格参数
              </li>
              <!-- <li @click="changeState1" :class="!isActive ? 'active' : ''">
                商品介绍
              </li> -->
            </ul>
          </div>
          <div class="shop-params">
            <dl>
              <dt>规格参数：</dt>
              <dd>
                产品名称 <span>{{ detailData.name }}</span>
              </dd>
              <dd>
                主花材料 <span>{{ detailData.huacai }}</span>
              </dd>
              <!-- <dd>花束颜色 <span>红色</span></dd> -->
            </dl>
          </div>
          <div class="shop-body">
            <img
              v-for="item of detailImg.length"
              :key="item"
              :src="detailImg[item - 1]"
              alt=""
            />
          </div>
        </div>
        <div class="affix-container">
          <el-affix target=".affix-container" :offset="0">
            <div class="details-right">
              <div class="hot-title">热销鲜花</div>
              <Floweritem
                v-for="item of 4"
                :key="item"
                :citemData="hotGoods[item - 1]"
              />
            </div>
          </el-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Floweritem from "../components/Floweritem.vue";
import { apiGoodsData, apiIdGoods, apiAddCart } from "../utils/api"; //导入请求查询api

export default {
  data() {
    return {
      input: 1,
      isActive: true,
      hotGoods: [],
      detailData: {},
      detailImg: [],
      check: 1,
    };
  },
  props: {},
  created() {
    apiIdGoods({ id: this.$route.query.id }).then((res) => {
      this.detailData = res.data[0];
      this.detailImg = JSON.parse(res.data[0].dimg);
      // this.detailImg = res.data[0].dimg.split(",");
    });
    apiGoodsData().then((res) => {
      //获取销量前 4 商品
      this.hotGoods = res.data
        .sort((m, n) => n.sold - m.sold)
        .filter((item, index) => index < 4);
      // console.log(this.hotGoods);
    });
  },
  watch: {
    // 对路由变化作出响应...
    $route: "getNewGood", //监听路由变化，重新请求数据
  },
  components: {
    Floweritem,
  },
  computed: {
    getCheck() {
      if (this.detailData.category == "韩式花束") {
        this.check = 1;
      } else if (this.detailData.category == "创意花盒") {
        this.check = 2;
      } else {
        this.check = 3;
      }
    },
  },
  methods: {
    changeState0() {
      this.isActive = true;
    },
    changeState1() {
      this.isActive = false;
    },
    getNewGood() {
      apiIdGoods({ id: this.$route.query.id }).then((res) => {
        this.detailData = res.data[0];
        this.detailImg = JSON.parse(res.data[0].dimg);
      });
    },
    addCart() {
      //已登录
      if (this.$store.state.loginStatus) {
        const val = {
          uid: this.$store.state.userName,
          gid: this.detailData.id,
          num: this.input,
        };
        // 调 api 加入购物车
        apiAddCart(val).then((res) => {
          //服务器返回 200 code 表成功
          if (res.code == 200) {
            this.$message.success("加入购物车成功！");
          } else {
            this.$message.error();
            ("加入购物车失败！");
          }
        });
      } else {
        //用户未登录
        this.$message.warning("请先登录！");
        this.$router.push("/login");
      }
    },
    toOrder() {
      // 将商品id和数量num打包
      let obj = [{ gid: this.detailData.id, num: this.input }];
      //已登录
      if (this.$store.state.loginStatus) {
        // 通过路由导向 order 页 并携带 obj 参数
        this.$router.push({
          name: "Order",
          params: { goodsList: JSON.stringify(obj) },
        });
      } else {
        //用户未登录
        this.$message.warning("请先登录！");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.details {
  .goodsDetails {
    width: 1200px;
    margin: 0 auto;
    .breadCrumb {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .shop {
      overflow: hidden;
      .shop-preview {
        width: 468px;
        height: 468px;
        float: left;
        margin-right: 30px;
        border: 1px solid #dcdcdc;
        img {
          width: 100%;
          height: auto;
        }
      }
      .shop-info {
        float: left;
        width: 690px;
        .shop-title {
          margin-bottom: 60px;
          h2 {
            margin-bottom: 20px;
          }
          p {
            font-size: 14px;
            color: rgb(153, 153, 153);
          }
        }
        .shop-price {
          .price0 {
            margin: 30px 0;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #333;
            span {
              margin-left: 20px;
              font-size: 30px;
              font-weight: 700;
              color: #ff3352;
            }
          }
          .price1 {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #333;
            span {
              margin-left: 20px;
              text-decoration: line-through;
            }
          }
        }
        .shop-num {
          margin-top: 80px;
          span {
            margin-right: 20px;
          }
        }
        .shop-bot {
          margin-top: 80px;
          .btn {
            width: 198px;
            height: 48px;
            line-height: 48px;
            border: 1px solid #ff6980;
            border-radius: 5px;
            font-size: 18px;
            color: #ff6980;
            background-color: #fff;
            text-align: center;
            display: inline-block;
            margin-right: 15px;
            cursor: pointer;
            &:hover {
              background-color: #ff97a7;
              color: #fff;
            }
          }
        }
      }
    }
    .shop-desc {
      margin-top: 30px;
      overflow: hidden;
      .details-left {
        float: left;
        width: 893px;
        .shop-header {
          padding-left: 30px;
          height: 50px;
          font-size: 16px;
          color: #333;
          background-color: #fafafa;
          ul {
            list-style: none;
            li {
              float: left;
              padding: 0 10px;
              margin: 0 20px;
              height: 47px;
              line-height: 47px;
            }
          }
        }
        .shop-params {
          margin: 50px auto;
          padding-left: 50px;
          dl {
            dt {
              margin: 10px auto;
              font-size: 20px;
            }
            dd {
              margin: 6px auto;
              padding-left: 20px;
              span {
                margin-left: 20px;
                color: #8d778d;
              }
            }
          }
        }
      }
      .details-right {
        float: right;
        width: 277px;
        color: #333;
        text-align: center;
        .hot-title {
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          text-align: center;
          color: #333;
          background-color: #fafafa;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
    .affix-container {
      height: 2500px;
      // background: red;
    }
  }
}
.active {
  font-size: 18px;
  font-weight: 700;
  color: #ff6980;
  border-bottom: 3px solid #ff6980;
}
.Floweritem {
  margin: 0;
  margin-bottom: 6px;
  border-bottom: 1px dashed #e5e5e5;
}
</style>
