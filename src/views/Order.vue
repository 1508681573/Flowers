<template>
  <div class="order">
    <div class="title"><h2>确认订单</h2></div>
    <div class="container">
      <div class="address">
        <div class="min-title">
          <span>收获地址</span>
        </div>
        <div class="address-list">
          <div
            class="address-info"
            v-for="(item, index) in addressInfos"
            :key="index"
            @click="
              (active = index),
                (ship_address = item.address),
                (ship_name = item.name),
                (ship_phone = item.phone)
            "
            :class="{ active: active == index }"
          >
            <div class="name">
              {{ item.name }}<span>{{ item.label }}</span>
            </div>
            <div class="phone">{{ item.phone }}</div>
            <div class="address-con">
              <span>{{ item.address[0] }}</span>
              <span>{{ item.address[1] }}</span>
              <span>{{ item.address[2] }}</span>
              <span class="info">{{ item.street }}</span>
            </div>
            <div class="address-action">
              <span @click="deleteAddress(item.id)">删除</span>
            </div>
          </div>

          <div class="add-address" @click="dialogFormVisible = true">
            <i class="el-icon-circle-plus"></i><span>添加新地址</span>
          </div>
        </div>
        <el-dialog
          title="添加收获地址"
          v-model="dialogFormVisible"
          width="40%"
          :before-close="handleClose"
        >
          <form class="form-box">
            <div class="name-phone-box">
              <el-input v-model="formInfo.name" placeholder="姓名"></el-input>
              <div class="mbox"></div>
              <el-input
                v-model="formInfo.phone"
                placeholder="手机号"
              ></el-input>
            </div>
            <div class="cascade">
              <el-cascader
                placeholder="选择省/市/区/街道"
                v-model="formInfo.address"
                :options="options"
                @change="handleChange"
              ></el-cascader>
            </div>
            <div class="detailed-address">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="详细地址"
                v-model="formInfo.street"
              >
              </el-input>
            </div>
            <div class="address-label">
              <el-input
                v-model="formInfo.label"
                placeholder="地址标签"
              ></el-input>
            </div>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="addAdress(formInfo), (dialogFormVisible = false)"
              >
                确 定
              </el-button>
            </div>
          </form>
        </el-dialog>
      </div>
      <div class="goodslist">
        <div class="min-title">
          <span>商品列表</span>
        </div>
        <div class="good-item" v-for="(item, index) in goodsInfo" :key="index">
          <div class="good-img">
            <img :src="item.iimg" alt="" />
          </div>
          <div class="good-name">
            <a href=""
              ><span>{{ item.name }}</span></a
            >
          </div>
          <div class="price-box">
            <div class="good-price">{{ item.xprice }} 元 x {{ item.num }}</div>
            <div class="good-total">{{ item.xprice * item.num }} 元</div>
          </div>
        </div>
      </div>
      <div class="shipment">
        <div class="min-title">
          <span>配送方式</span>
          <div class="selected">包邮</div>
        </div>
      </div>
      <div class="count-detail">
        <div class="min-title">
          <span>费用总计</span>
        </div>
        <div class="detail-bill">
          <div class="bill-box">
            <div class="bill-item">
              <div class="bill-name">商品件数:</div>
              <div class="bill-money">{{ goodsInfo.length }} 件</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">商品总价:</div>
              <div class="bill-money">{{ getTotalPrice }} 元</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">运费:</div>
              <div class="bill-money">0 元</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">应付总额:</div>
              <div class="bill-money">
                <span>{{ getTotalPrice }} 元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-detail">
      <div class="btn-box">
        <div class="btn-cart" @click="toCart">返回购物车</div>
        <div class="btn-submit" @click="toSubmit">去结算</div>
      </div>
    </div>
    <el-dialog
      title="请扫码付款"
      v-model="centerDialogVisible"
      width="30%"
      center
    >
      <div class="code-box">
        <img src="../assets/qrcode.png" alt="" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitOrders(0), (centerDialogVisible = false)"
            >稍后再付</el-button
          >
          <el-button
            type="primary"
            @click="submitOrders(1), (centerDialogVisible = false)"
            >已付款</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiIdAddress,
  apiAddAddress,
  apiDeleteAddress,
  apiIdGoods,
  apiAddOrder,
  apiAddOrderGoods,
  apiDropCart,
} from "../utils/api";

export default {
  data() {
    return {
      active: -1,
      addressInfos: [],
      dialogFormVisible: false,
      centerDialogVisible: false,
      options: [
        {
          value: "重庆",
          label: "重庆",
          children: [
            {
              value: "涪陵区",
              label: "涪陵区",
              children: [
                {
                  value: "李渡",
                  label: "李渡",
                },
                {
                  value: "江东",
                  label: "江东",
                },
              ],
            },
            {
              value: "南岸区",
              label: "南岸区",
              children: [
                {
                  value: "茶园",
                  label: "茶园",
                },
                {
                  value: "南坪",
                  label: "南坪",
                },
              ],
            },
          ],
        },
        {
          value: "云南",
          label: "云南",
          children: [
            {
              value: "昆明",
              label: "昆明",
              children: [
                {
                  value: "西山区",
                  label: "西山区",
                },
                {
                  value: "官渡区",
                  label: "官渡区",
                },
                {
                  value: "盘龙区",
                  label: "盘龙区",
                },
              ],
            },
            {
              value: "丽江",
              label: "丽江",
              children: [
                {
                  value: "丽江古城",
                  label: "丽江古城",
                },
                {
                  value: "束河古镇",
                  label: "束河古镇",
                },
              ],
            },
          ],
        },
      ],
      // 添加地址 表单信息
      formInfo: {
        name: "",
        phone: "",
        address: [],
        street: "",
        label: "",
      },
      // 商品信息
      goodsInfo: [],
      ship_name: "",
      ship_phone: "",
      ship_address: "",
      orderInfo: {
        address: "",
        goodsList: [],
        totalPrice: 0,
      },
    };
  },
  mounted() {
    // 进入时请求用户收货地址
    apiIdAddress({ name: this.$store.state.userName }).then((res) => {
      if (res.code == 200) {
        this.addressInfos = res.data;
        // 将地址 address 格式化
        this.addressInfos.forEach((item) => {
          item.address = JSON.parse(item.address); // miss error
        });
      }
    });
    // 进入时请求商品信息
    // console.log(JSON.parse(this.$route.params.goodsList));
    Promise.all(
      // 根据路由参数 goodsList 请求多个商品
      JSON.parse(this.$route.params.goodsList).map((item) => {
        return apiIdGoods({ id: item.gid });
      })
    ).then((res) => {
      // 全部请求完成得 res 数组
      res.forEach((item) => {
        //将请求商品数据放入 goodsInfo
        this.goodsInfo.push(item.data[0]);
      });
      // 将每种商品的数量放入 goodsInfo
      this.goodsInfo.forEach((item, index) => {
        item.num = JSON.parse(this.$route.params.goodsList)[index].num;
      });
      // console.log(typeof(parseInt(this.goodsInfo[0].xprice)));
    });
  },
  computed: {
    getTotalPrice() {
      let sum = 0;
      this.goodsInfo.forEach((item) => {
        sum += item.xprice * item.num;
      });
      return sum;
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 添加地址
    addAdress(val) {
      // 序列化地址
      let address = JSON.stringify(val.address);
      let obj = {
        uid: this.$store.state.userName,
        name: val.name,
        phone: val.phone,
        address: address,
        street: val.street,
        label: val.label,
      };
      // 发送添加地址请求
      apiAddAddress(obj).then((res) => {
        // 成功
        if (res.code == 200) {
          this.$message.success("添加成功！");
          // 重新请求 地址数据
          apiIdAddress({ name: this.$store.state.userName }).then((res) => {
            if (res.code == 200) {
              this.addressInfos = res.data;
              // 将地址 address 格式化
              this.addressInfos.forEach((item) => {
                item.address = JSON.parse(item.address);
              });
            }
          });
        }
      });
    },
    // 删除地址
    deleteAddress(id) {
      apiDeleteAddress({ id: id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          // 重新请求 地址数据
          apiIdAddress({ name: this.$store.state.userName }).then((res) => {
            if (res.code == 200) {
              this.addressInfos = res.data;
              // 将地址 address 格式化
              this.addressInfos.forEach((item) => {
                item.address = JSON.parse(item.address);
              });
            }
          });
        }
      });
    },
    // 去购物车
    toCart() {
      this.$router.push("/cart");
    },
    toSubmit() {
      if (this.ship_address != "") {
        this.centerDialogVisible = true;
      } else {
        this.$message.error("请选择地址！");
      }
    },
    // 生成订单号
    orderCode() {
      let orderCode = "";
      //6位随机数，用以加在时间戳后面。
      for (let i = 0; i < 6; i++) {
        orderCode += Math.floor(Math.random() * 10);
      }
      orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
      console.log(orderCode);
      return orderCode;
    },
    // 提交订单
    submitOrders(is_pay) {
      let orderCode = this.orderCode();
      // 提交订单信息
      let obj = {
        order_number: orderCode,
        uid: JSON.parse(window.localStorage.getItem("userData")).id,
        ship_name: this.ship_name,
        ship_phone: this.ship_phone,
        ship_address: JSON.stringify(this.ship_address),
        pay_price: this.getTotalPrice,
        is_pay: is_pay,
      };
      apiAddOrder(obj).then((res) => {
        if (res.code == 200) {
          // 提交订单商品信息
          console.log("addorder ok");
          Promise.all(
            this.goodsInfo.map((item) => {
              return apiAddOrderGoods({
                order_number: orderCode,
                goods_id: item.id,
                goods_num: item.num,
              });
            })
          ).then((res) => {
            this.$message.success("购买成功！");
            // console.log(this.$router);
            Promise.all(
              this.goodsInfo.map((item) => {
                return apiDropCart({
                  uid: this.$store.state.userName,
                  gid: item.id,
                });
              })
            ).then((res) => {
              console.log("购物车删除成功！");
            });
            setTimeout(() => {
              console.log("延时去个人中心");
              // history.go(-1);
            }, 3000);
            this.$router.push("/user");
          });
        } else {
          this.$message.error("购买失败！");
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.active {
  border-color: #ff6980 !important;
}
.order {
  padding: 30px 0;
  background: #f5f5f5;
  .title {
    margin-bottom: 30px;
    text-align: center;
    h2 {
      line-height: 48px;
      font-size: 28px;
      font-weight: 400;
      color: #424242;
    }
  }
  .container {
    margin: 0 auto;
    padding: 0 20px;
    width: 1160px;
    background: #fff;
    .min-title {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      span {
        padding-left: 10px;
        padding-right: 100px;
        color: #333;
        font-size: 18px;
        line-height: 20px;
      }
    }
    .address {
      padding-top: 30px;
      .address-list {
        display: flex;
        flex-wrap: wrap;
        .address-info {
          width: 200px;
          height: 138px;
          border: 1px solid #e0e0e0;
          margin: 10px 10px;
          padding: 20px 20px;
          cursor: pointer;
          &:hover {
            border: 1px solid #b0b0b0;
            .address-action {
              opacity: 1;
            }
          }
          // &:active {
          //   border: 1px solid #ff6980;
          // }
          .name {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            color: #333;
            line-height: 30px;
            margin-bottom: 10px;
            span {
              font-size: 14px;
              color: rgb(117, 117, 117);
            }
          }
          .phone {
            line-height: 22px;
            color: #757575;
          }
          .address-con {
            line-height: 22px;
            color: #757575;
            span {
              display: inline-block;
              margin-right: 3px;
              word-wrap: break-word;
            }
            .info {
              width: 100%;
            }
          }
          .address-action {
            margin-top: 20px;
            text-align: right;
            opacity: 0;
            span {
              color: #ff6700;
              margin-left: 10px;
            }
          }
        }
        .add-address {
          width: 200px;
          height: 138px;
          border: 1px solid #e0e0e0;
          margin: 10px 10px;
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #e0e0e0;
          cursor: pointer;
          i {
            font-size: 30px;
          }
          &:hover {
            border: 1px solid #b0b0b0;
            color: #b0b0b0;
          }
        }
      }
      .form-box {
        .name-phone-box {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          .mbox {
            width: 30px;
          }
        }
        .cascade {
          width: 100%;
          margin-bottom: 10px;
          .el-cascader {
            width: 100%;
          }
        }
        .detailed-address {
          margin-bottom: 20px;
        }
        .address-label {
          margin-bottom: 30px;
        }
        .dialog-footer {
          text-align: center;
        }
      }
    }
    .goodslist {
      border-bottom: 1px solid #e0e0e0;
      .good-item {
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-bottom: 6px;
        .good-img {
          width: 140px;
          img {
            width: 100px;
          }
        }
        .good-name {
          width: 500px;
          // background: gray;
          a {
            text-decoration: none;
            span {
              color: black;
              font-size: 16px;
              &:hover {
                color: #ff6701;
                transition: all 0.3s;
              }
            }
          }
        }
        .price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 400px;
          .good-total {
            color: #ff6701;
          }
        }
      }
    }
    .shipment {
      border-bottom: 1px solid #e0e0e0;
      .selected {
        line-height: 38px;
        color: #ff6980;
      }
    }
    .count-detail {
      padding-bottom: 30px;
      .detail-bill {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .bill-box {
          padding-right: 50px;
          .bill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            width: 220px;
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
    }
  }
  .footer-detail {
    margin: 0 auto;
    margin-top: 2px;
    margin-bottom: 30px;
    padding: 0 20px;
    width: 1160px;
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn-box {
      display: flex;
      align-items: center;
      margin-right: 50px;
      .btn-cart,
      .btn-submit {
        margin-left: 30px;
        width: 160px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
      }
      .btn-cart {
        color: #e0e0e0;
        border: 1px solid #e0e0e0;
        &:hover {
          color: #b0b0b0;
          border: 1px solid #b0b0b0;
        }
      }
      .btn-submit {
        color: #fff;
        border: 1px solid #ff6700;
        background: #ff6700;
        &:hover {
          background: #f25807;
          transition: all 0.4s;
        }
      }
    }
  }
  .code-box {
    text-align: center;
  }
}
</style>

