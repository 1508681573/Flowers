<template>
  <div class="orders">
    <div class="title">
      <h1>我的订单</h1>
      <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
    </div>
    <div class="clearfix">
      <div class="filter-list">
        <div
          @click="(isActive = 1), getAllOrder()"
          :class="{ active: isActive == 1 }"
        >
          全部订单
        </div>
        <el-divider direction="vertical"></el-divider>
        <div
          @click="(isActive = 2), getToBePaid()"
          :class="{ active: isActive == 2 }"
        >
          待支付
        </div>
        <el-divider direction="vertical"></el-divider>
        <div
          @click="(isActive = 3), getForGoods()"
          :class="{ active: isActive == 3 }"
        >
          待收货
        </div>
      </div>
      <div class="search">
        <el-input
          placeholder="请输入订单号"
          prefix-icon="el-icon-search"
          v-model="searchInput"
          @keyup.enter="searchOrder(searchInput)"
        >
        </el-input>
      </div>
    </div>
    <el-empty v-if="isNull()" description="订单为空"></el-empty>
    <div v-else class="orders-list">
      <div
        class="orders-item"
        v-for="(item, index) in ordersList"
        :class="{ areadyend: item.is_ship, areadypay: item.is_pay }"
        :key="index"
      >
        <div class="header">
          <h3>{{ getStatus(item) }}</h3>
          <div class="order-info">
            <div class="info-list">
              <span>{{ getOrderDate(item.order_number) }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.ship_name }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>订单号: {{ item.order_number }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>在线支付</span>
            </div>
            <div class="info-price">
              <span>应付金额:</span>
              <span class="total-price">{{ item.pay_price }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="details">
          <div class="goods-list">
            <div
              class="list-item"
              v-for="(value, index1) in item.goodsList"
              :key="index1"
            >
              <div class="good-img">
                <img :src="value.goodsInfo.iimg" alt="" />
              </div>
              <div class="good-info">
                <div class="good-title">{{ value.goodsInfo.name }}</div>
                <div class="good-num">
                  {{ value.goodsInfo.xprice }}元 x {{ value.goods_num }}
                </div>
              </div>
            </div>
          </div>
          <div class="order-btn">
            <div v-if="!item.is_ship" class="btn1" @click="toSubmit(item.id, item.is_pay)">
              {{ getBtnStatus(item.is_pay) }}
            </div>
            <div class="btn2" @click="toOrderDetails(item)">订单详情</div>
            <div class="btn3">联系客服</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="请扫码付款"
      v-model="centerDialogVisible"
      width="30%"
      center
    >
      <div class="code-box">
        <img src="../../assets/qrcode.png" alt="" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">稍后再付</el-button>
          <el-button
            type="primary"
            @click="areadyPay(), (centerDialogVisible = false)"
            >已付款</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiIdOrder,
  apiOrderGoods,
  apiIdGoods,
  apiChangeOrderShip,
  apiChangeOrderPay,
} from "../../utils/api";

export default {
  data() {
    return {
      size: 10,
      isActive: 1,
      ordersList: [],
      ordersListMirror: [], // ordersList 镜像 用来分类
      searchInput: "", // 搜索框内容
      centerDialogVisible: false, // visible 开关
      payId: -1, // 付款 订单 id
    };
  },
  mounted() {
    apiIdOrder({
      uid: JSON.parse(window.localStorage.getItem("userData")).id,
    }).then((res) => {
      this.ordersList = res.data;
      Promise.all(
        this.ordersList.map((item) => {
          return apiOrderGoods({ order_number: item.order_number });
        })
      ).then((res) => {
        this.ordersList.forEach((item, index) => {
          item.goodsList = res[index].data;
          Promise.all(
            item.goodsList.map((item) => {
              return apiIdGoods({ id: item.goods_id });
            })
          ).then((res) => {
            item.goodsList.forEach((item, index) => {
              item.goodsInfo = res[index].data[0];
            });
            this.ordersListMirror = this.ordersList; // 添加 ordersList 镜像
          });
        });
      });
    });
  },
  computed: {},
  methods: {
    getOrderDate(val) {
      let timeStamp = val.slice(0, -6); //删去后六位随机码 '1619907410517'
      let date = new Date(Number(timeStamp));
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getStatus(val) {
      if (val.is_ship) {
        return "已完成";
      } else if (val.is_pay) {
        return "待收货";
      } else {
        return "待付款";
      }
    },
    getBtnStatus(val) {
      return val ? "我已收货" : "立即付款";
    },
    // 订单是否为空
    isNull() {
      if (this.ordersList.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    // 获取全部订单
    getAllOrder() {
      this.ordersList = this.ordersListMirror;
    },
    // 获取待付款订单
    getToBePaid() {
      this.ordersList = this.ordersListMirror.filter(
        (item) => item.is_pay == 0
      );
    },
    // 获取待收货订单
    getForGoods() {
      this.ordersList = this.ordersListMirror.filter(
        (item) => item.is_receipt == 0 && item.is_pay == 1
      );
    },
    // 搜索订单
    searchOrder(val) {
      this.ordersList = this.ordersListMirror.filter(item => item.order_number.indexOf(val) !== -1)
    },
    // 付款、收货按钮
    toSubmit(id, is_pay) {
      if (is_pay == 0) {
        // 未支付
        this.centerDialogVisible = true;
        this.payId = id;
      } else {
        // 已支付 收货
        apiChangeOrderShip({ id: id, is_ship: 1 }).then((res) => {
          if (res.code == 200) {
            this.$message.success("订单已完成！");
            this.ordersListMirror = this.ordersListMirror.filter(
              (item) => item.id != id
            ); // 过滤 已收货
            this.ordersList = this.ordersList.filter((item) => item.id != id); // 排除 已收货
          }
        });
      }
    },
    areadyPay() {
      // 发送请求，修改数据库is_pay
      apiChangeOrderPay({ id: this.payId, is_pay: 1 }).then((res) => {
        if (res.code == 200) {
          console.log("change is_pay ok");
          // 修改为 已支付
          this.ordersListMirror.forEach((item) => {
            if (item.id == this.payId) {
              item.is_pay = 1;
            }
          });
          // 将修改后的 加入 ordersList
          this.ordersList = this.ordersListMirror;
          this.$message.success("付款成功！");
        }
      });
    },
    //  去订单详情
    toOrderDetails(val) {
      // console.log(val);
      this.$router.push({
        name: "OrderDetails",
        params: { orderInfo: JSON.stringify(val) },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.active {
  color: #ff6700 !important;
}
// 已经支付 样式
.areadypay {
  border: 1px solid #67c23a !important;
  .header {
    background: #f0f9eb !important;
    border-bottom: 1px solid #99cc99 !important;
    h3 {
      color: #67c23a !important;
    }
  }
  .btn1 {
    background: #72d440 !important;
    border: 1px solid #72d440 !important;
    &:hover {
      background: #44b144 !important;
    }
  }
}

.areadyend {
  border: 1px solid #bdbdbd !important;
  .header {
    background: #e7e7e7 !important;
    border-bottom: 1px solid #bdbdbd !important;
    h3 {
      color: #bdbdbd !important;
    }
  }
}

.orders {
  background: white;
  padding: 50px 50px;
  width: 800px;
  .title {
    display: flex;
    align-items: center;
    h1 {
      margin-bottom: 10px;
      margin-right: 6px;
      font-size: 30px;
      font-weight: 400;
      line-height: 68px;
      color: #757575;
    }
    span {
      font-size: 12px;
      line-height: 1.5;
      color: #757575;
    }
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .filter-list {
      display: flex;
      align-items: center;
      div {
        margin: 0px 10px;
        font-size: 16px;
        line-height: 1.25;
        cursor: pointer;
        color: #333;
        &:hover {
          color: #ff6700;
        }
      }
    }
  }
  .orders-list {
    // padding: 10px 20px;
    .orders-item {
      border: 1px solid #ff6700;
      margin-bottom: 20px;
      .header {
        padding: 30px 20px;
        background: #fffaf7;
        border-bottom: 1px solid #feccac;
        h3 {
          // margin: 20px 0 10px 0;
          font-size: 18px;
          font-weight: 400;
          color: #ff6700;
        }
        .order-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .info-list {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #757575;
            vertical-align: bottom;
          }
          .info-price {
            font-size: 14px;
            font-weight: 400;
            text-align: right;
            color: #757575;
            vertical-align: bottom;
            .total-price {
              height: 18px;
              margin-left: 10px;
              margin-right: 5px;
              font-size: 28px;
              font-weight: 400;
              line-height: 1;
              color: #333;
            }
          }
        }
      }
      .details {
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .goods-list {
          .list-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .good-img {
              > img {
                margin-right: 20px;
                width: 60px;
              }
            }
            .good-info {
              font-size: 14px;
            }
          }
        }
        .order-btn {
          .btn1 {
            width: 120px;
            height: 30px;
            margin-bottom: 10px;
            background: #ff6700;
            border: 1px solid #ff6700;
            color: #fff;
            text-align: center;
            font-size: 12px;
            line-height: 28px;
            cursor: pointer;
            &:hover {
              background: #f25807;
              transition: all 0.4s;
            }
          }
          .btn2,
          .btn3 {
            width: 120px;
            height: 30px;
            margin-bottom: 10px;
            background: white;
            border: 1px solid #b0b0b0;
            text-align: center;
            color: #757575;
            font-size: 12px;
            line-height: 28px;
            cursor: pointer;
            &:hover {
              background: #b0b0b0;
              color: white;
              transition: all 0.4s;
            }
          }
        }
      }
    }
  }
  .code-box {
    text-align: center;
  }
}
</style>
