<template>
  <div class="cart">
    <div class="title"><h2>我的购物车</h2></div>
    <div class="container">
      <div class="cart-head">
        <!-- <div class="col-check"> -->
        <el-checkbox
          class="el-checkbox"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选
        </el-checkbox>
        <!-- </div> -->
        <div class="col-img"></div>
        <div class="col-name">商品名称</div>
        <div class="col-price">单价</div>
        <div class="col-num">数量</div>
        <div class="col-total">小计</div>
        <div class="col-action">操作</div>
      </div>
      <div class="cart-body" @click.stop>
        <el-checkbox-group v-model="checkList" @change="handleCheckListChange">
          <el-checkbox
            class="el-checkbox"
            v-for="(item, index) in goodsInfo"
            :key="index"
            :label="index"
          >
            <div class="list-item">
              <!-- <div class="col-check"> -->
              <!-- <el-checkbox :label="index"></el-checkbox> -->
              <!-- </div> -->
              <div class="col-img">
                <img :src="item.iimg" alt="" />
              </div>
              <div class="col-name">
                <a @click="toDetals(item.id)">{{ item.name }}</a>
              </div>
              <div class="col-price">￥{{ item.xprice }}</div>
              <div class="col-num" @click.stop>
                <div class="num-box">
                  <i @click.stop="handleChangeNum(item.id,-1)" class="el-icon-minus"></i>
                  <span>{{ item.num }}</span>
                  <i @click.stop="handleChangeNum(item.id,1)" class="el-icon-plus"></i>
                </div>
                <!-- <el-input-number
                  @click.stop
                  size="mini"
                  :modelValue="numList[index]"
                  @change="handleChangeNum(item.id, (item.num - numList[index]))"
                  :min="1"
                  :max="100"
                ></el-input-number> -->
              </div>
              <div class="col-total">
                <!-- ￥{{ getSubTotal(item.xpirce, goodsInfo[index].num) }} -->
                ￥{{ item.xprice * item.num }}
              </div>
              <div class="col-action">
                <i class="el-icon-close" @click="dropGood(item.id)"></i>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="box"></div>
      <div class="clearfix">
        <div class="section-left">
          <a @click="toHome">继续购物</a
          ><span
            >共<i>{{ goodsInfo.length }}</i
            >件商品，已选择<i>{{ checkList.length }}</i
            >件</span
          >
        </div>
        <div class="total-price">
          <span
            >合计：<i>{{ getTotalPrice }}</i
            >元</span
          ><a @click="toOrder">去结算</a>
        </div>
      </div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
import { apiIdCart, apiAddCart, apiDropCart } from "../utils/api.js";

export default {
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      checkList: [],
      // numList: [],
      // goodsList: [],
      goodsInfo: [],
    };
  },
  mounted() {
    //根据 用户id 查询购物车信息
    apiIdCart({ uid: this.$store.state.userName }).then((res) => {
      if (res.code == 200) {
        //将购物车数据存入goodInfo
        this.goodsInfo = res.data;
        // this.numList = []
        // this.goodsInfo.forEach((item) => {
        //   this.numList.push(item.num);
        // });
      } else {
        // 为空
        this.$message.warning("购物车为空！");
      }
    });
  },
  computed: {
    // getSubTotal(price, num) {
    //   return parseInt(price) * num;
    // },
    getTotalPrice() {
      let sum = 0;
      this.checkList.forEach((item) => {
        sum += this.goodsInfo[item].xprice * this.goodsInfo[item].num;
      });
      return sum;
    },
  },
  methods: {
    handleCheckAllChange(val) {
      let arr = [];
      this.goodsInfo.forEach((item, index) => {
        arr.push(index);
      });
      this.checkList = val ? arr : [];
      this.isIndeterminate = false;
    },
    handleCheckListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.goodsInfo.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.goodsInfo.length;
    },
    handleChangeNum(gid, val) {
      const obj = {
        uid: this.$store.state.userName,
        gid: gid,
        num: val,
      };
      apiAddCart(obj).then((res) => {
        if (res.code == 200) {
          // console.log(res.data);
          apiIdCart({ uid: this.$store.state.userName }).then((res) => {
            if (res.code == 200) {
              //将购物车数据存入goodInfo
              this.goodsInfo = res.data;
              // this.numList = []
              // this.goodsInfo.forEach((item) => {
              //   this.numList.push(item.num);
              // });
            } else {
              // 为空
              this.$message.warning("购物车为空！");
            }
          });
        } else {
          this.$message.error("改变数量失败！");
        }
      });
    },
    dropGood(id) {
      this.goodsInfo = this.goodsInfo.filter((item) => item.id != id);
      apiDropCart({ uid: this.$store.state.userName, gid: id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
        }
      });
    },
    toOrder() {
      // 将商品id和数量num打包
      let obj = this.checkList.map((item) => {
        return { gid: this.goodsInfo[item].id, num: this.goodsInfo[item].num };
      });
      // 通过路由导向 order 页 并携带 obj 参数
      this.$router.push({
        name: "Order",
        params: { goodsList: JSON.stringify(obj) },
      });
    },
    toHome() {
      this.$router.push("/");
    },
    toDetals(id) {
      this.$router.push({ path: "/details", query: { id: id } });
    },
  },
  components: {},
};
</script>

<style scoped lang='scss'>
.cart {
  background: #f5f5f5;
  padding-top: 30px;
  .title {
    h2 {
      line-height: 48px;
      font-size: 28px;
      font-weight: 400;
      color: #424242;
    }
    text-align: center;
    margin-bottom: 20px;
  }
  .container {
    width: 1200px;
    background: white;
    margin: 0 auto;

    .cart-head {
      display: flex;
      align-items: center;
      .el-checkbox {
        padding-left: 30px;
      }
      > div {
        height: 70px;
        line-height: 70px;
        color: #424242;
      }
    }
    .cart-body {
      .el-checkbox {
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding-left: 10px;
      }
      .list-item {
        display: flex;
        align-items: center;
        margin-left: 30px;
        border-top: 1px solid #e0e0e0;
      }
      .list-item > div {
        color: #424242;
      }
    }
    .cart-head,
    .cart-body {
      .col-check {
        width: 110px;
        text-align: center;
      }
      .col-img {
        width: 200px;
        img {
          height: 120px;
          padding: 10px 0;
          cursor: pointer;
        }
      }
      .col-name {
        width: 300px;

        a {
          text-decoration: none;
          color: #424242;
          &:hover {
            color: #ff6700;
            transition: color 0.3s;
          }
        }
      }
      .col-price {
        width: 140px;
        padding-right: 18px;
        text-align: center;
        color: #424242;
      }
      .col-num {
        width: 150px;
        text-align: center;
        color: #424242;
        .num-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          padding: 0 10px;
          width: 90px;
          height: 40px;
          border: 1px solid #e0e0e0;
          i {
            &:hover {
              color: #ff6700;
              transition: color 0.3s;
            }
          }
        }
      }
      .col-total {
        width: 120px;
        padding-right: 81px;
        text-align: center;
      }
      .col-action {
        width: 80px;
        text-align: center;

        i {
          cursor: pointer;
          &:hover {
            color: #ff6700;
            transition: color 0.3s;
          }
        }
      }
    }
    .box {
      height: 30px;
      background: #f5f5f5;
    }
    .clearfix {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .section-left {
        > a {
          // display: block;
          width: 78px;
          padding-left: 32px;
          padding-right: 12px;
          color: #757575;
          text-decoration: none;
          border-right: 1px solid #eeeeee;
          cursor: pointer;
          &:hover {
            color: #ff6700;
            transition: color 0.3s;
          }
        }
        span {
          padding-left: 20px;
          color: #757575;

          i {
            margin: 0 8px;
            color: #ff6700;
            font-size: 18px;
            font-style: normal;
          }
        }
      }
      .total-price {
        height: 50px;
        display: flex;
        // align-items: stretch;
        span {
          color: #ff6700;
          margin-right: 60px;
          i {
            font-size: 30px;
            font-style: normal;
          }
        }
        a {
          cursor: pointer;
          width: 200px;
          background: #ff6700;
          text-align: center;
          line-height: 50px;
          font-size: 20px;
          text-decoration: none;
          color: white;
          &:hover {
            background: #f25807;
          }
        }
      }
    }
  }
}
</style>
