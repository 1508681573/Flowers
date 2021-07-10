<template>
  <div class="order-details">
    <div class="title">
      <h1>订单详情</h1>
      <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
    </div>
    <div class="top">
      <div class="order-number">
        <span>订单号: </span>
        <span> {{ orderInfo.order_number }}</span>
      </div>
      <div class="order-btn">
        <div class="btn3">联系客服</div>
        <!-- <div class="btn2" @click="toOrderDetails">订单详情</div> -->
        <div
          class="btn1"
          v-if="!orderInfo.is_pay"
          @click="centerDialogVisible = true"
        >
          立即付款
        </div>
      </div>
    </div>
    <div class="progress">
      <div class="min-title">订单进度</div>
      <div class="progress-bar">
        <el-steps :active="orderProgress" align-center>
          <el-step title="下单"></el-step>
          <el-step title="付款"></el-step>
          <el-step title="配货"></el-step>
          <el-step title="收货"></el-step>
          <el-step title="交易成功"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="goods-list">
      <div
        class="good-item"
        v-for="(item, index) in orderInfo.goodsList"
        :key="index"
      >
        <div class="good-img">
          <img :src="item.goodsInfo.iimg" alt="" />
        </div>
        <div class="good-name">
          <a href=""
            ><span>{{ item.goodsInfo.name }}</span></a
          >
        </div>
        <div class="good-num">
          <span>{{ item.goodsInfo.xprice }} 元 x {{ item.goods_num }}</span>
        </div>
      </div>
    </div>
    <div class="take-goods-info">
      <div class="min-title">
        <span>收货信息</span>
        <!-- <div class="change-address">修改</div> -->
      </div>
      <div class="take-body">
        <div class="info-box">
          姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:
          <span>{{ orderInfo.ship_name }}</span>
        </div>
        <div class="info-box">
          联系电话: <span>{{ orderInfo.ship_phone }}</span>
        </div>
        <div class="info-box">
          收货地址: <span>{{ orderInfo.ship_address }}</span>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="min-title">支付方式</div>
      <div class="payment-body">
        <div class="info-box">支付方式: <span>在线支付</span></div>
      </div>
    </div>
    <div class="invoice-info">
      <div class="min-title">发票信息</div>
      <div class="invoice-body">
        <div class="info-box">发票类型: <span>电子普通发票</span></div>
        <div class="info-box">发票内容: <span>购买商品明细</span></div>
        <div class="info-box">发票抬头: <span>个人</span></div>
      </div>
    </div>
    <div class="summary">
      <div class="bill-box">
        <div class="bill-item">
          <div class="bill-name">商品总价:</div>
          <div class="bill-money">{{ orderInfo.pay_price }} 元</div>
        </div>
        <div class="bill-item">
          <div class="bill-name">运费:</div>
          <div class="bill-money">0 元</div>
        </div>
        <div class="bill-item">
          <div class="bill-name">应付总额:</div>
          <div class="bill-money">
            <span>{{ orderInfo.pay_price }} </span>元
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
import { apiChangeOrderPay } from '../../utils/api'

export default {
  data() {
    return {
      orderInfo: {},
      orderProgress: 1, // 用于控制订单进度
      centerDialogVisible: false, // visible 开关
    };
  },
  mounted() {
    this.orderInfo = JSON.parse(this.$route.params.orderInfo);
    this.orderInfo.ship_address = this.orderInfo.ship_address.slice(2);
    this.orderInfo.ship_address = this.orderInfo.ship_address.slice(0, -2);
    this.orderInfo.ship_address = this.orderInfo.ship_address.split('","');
    let shipAddress = "";
    this.orderInfo.ship_address.forEach((item) => {
      shipAddress += item + " ";
    });
    this.orderInfo.ship_address = shipAddress;
    if (this.orderInfo.is_ship == 1) {
      // 已经收货
      this.orderProgress = 5;
    } else if (this.orderInfo.is_receipt == 1) {
      // 已经发货
      this.orderProgress = 3;
    } else if (this.orderInfo.is_pay == 1) {
      // 已经付款
      this.orderProgress = 2;
    }
  },
  methods: {
    // 付款、收货按钮
    // toSubmit(id, is_pay) {
    //   this.centerDialogVisible = true;
    // },
    areadyPay() {
      // 发送请求，修改数据库is_pay
      apiChangeOrderPay({ id: this.orderInfo.id, is_pay: 1 }).then((res) => {
        if (res.code == 200) {
          console.log("change is_pay ok");
          this.orderInfo.is_pay = 1;
          this.orderProgress = 2;
          this.$message.success("付款成功！");
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.order-details {
  background: white;
  padding: 50px 50px 20px 50px;
  width: 800px;
  .title {
    display: flex;
    align-items: center;
    h1 {
      margin-bottom: 10px;
      margin-right: 10px;
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
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    .order-number {
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    .order-btn {
      display: flex;
      align-items: center;
      .btn1 {
        width: 120px;
        height: 30px;
        margin-left: 5px;
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
      .btn3 {
        width: 120px;
        height: 30px;
        margin-left: 5px;
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
  .min-title {
    margin: 20px 0;
    font-size: 16px;
  }
  .info-box {
    font-size: 14px;
    font-weight: 400;
    margin: 4px 0;
    span {
      margin-left: 6px;
      color: #757575;
      font-size: 14px;
    }
  }
  .progress {
    padding-bottom: 20px;
  }
  .goods-list {
    .good-item {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      border-bottom: 1px solid #e0e0e0;
      .good-img {
        width: 140px;
        img {
          width: 80px;
        }
      }
      .good-name {
        width: 360px;
        a {
          text-decoration: none;
          span {
            color: black;
            font-size: 14px;
            &:hover {
              color: #ff6701;
              transition: all 0.3s;
            }
          }
        }
      }
      .good-num {
        font-size: 14px;
      }
    }
  }
  .take-goods-info {
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    .min-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .change-address {
        width: 120px;
        height: 30px;
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
  .payment {
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .invoice-info {
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .summary {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .bill-box {
      margin-top: 20px;
      .bill-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        width: 260px;
        .bill-name {
          width: 120px;
          font-size: 16px;
          text-align: right;
          color: #757575;
        }
        .bill-money {
          width: 150px;
          font-size: 16px;
          text-align: right;
          color: #ff6701;
          span {
            font-size: 30px;
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
