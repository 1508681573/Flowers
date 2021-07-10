<template>
  <div class="my-personal-center">
    <div class="user-info">
      <div class="user-card">
        <el-avatar
          :size="150"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <div class="name-box">
          <h2>{{ getStoreUserName }}</h2>
          <p>{{ getHourTips }}</p>
          <a @click="toChangeInfo">修改个人信息></a>
        </div>
      </div>
      <div class="user-actions">
        <ul>
          <li>账户安全：<span class="level">普通</span></li>
          <li>
            绑定手机：<span>{{ getUserPhone }}</span>
          </li>
          <li>
            绑定邮箱：<span>{{ getUserEmail }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-order">
      <div
        v-for="(item, index) in iconArr"
        :key="index"
        class="goods-order-item"
      >
        <el-avatar :size="100" :src="item.isrc"></el-avatar>
        <div class="order-info">
          <h3>
            {{ item.title }}<span>{{ getOrderStutasNum(index) }}</span>
          </h3>
          <a @click="toOrderCenter">{{ item.a }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiIdOrder } from "../../utils/api";

export default {
  data() {
    return {
      orderList: [],
      iconArr: [
        {
          isrc: require("../../assets/portal-icon-1.png"),
          title: "待支付的订单：",
          a: "查看待支付订单>",
        },
        {
          isrc: require("../../assets/portal-icon-3.png"),
          title: "已支付的订单：",
          a: "查看已支付订单>",
        },
        {
          isrc: require("../../assets/portal-icon-2.png"),
          title: "待收货的订单：",
          a: "查看待收货订单>",
        },
        // {
        //   isrc: require("../../assets/portal-icon-4.png"),
        //   title: "喜欢的商品：",
        //   a: "查看喜欢的商品>",
        // },
      ],
    };
  },
  mounted() {
    apiIdOrder({
      uid: JSON.parse(window.localStorage.getItem("userData")).id,
    }).then((res) => {
      this.orderList = res.data;
    });
  },
  computed: {
    getStoreUserName() {
      return this.$store.state.userName;
    },
    getHourTips() {
      let date = new Date();
      if (date.getHours() >= 6 && date.getHours() < 12) {
        return "上午好~";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return "下午好~";
      } else {
        return "晚上好~";
      }
    },
    getUserPhone() {
      if (JSON.parse(window.localStorage.getItem("userData")).phone != null) {
        // 从localstorage获取手机号并隐藏中间四位
        return JSON.parse(
          window.localStorage.getItem("userData")
        ).phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
      } else {
        return "未绑定"
      }
    },
    getUserEmail() {
      // console.log(JSON.parse(window.localStorage.getItem("userData")));
      if (JSON.parse(window.localStorage.getItem("userData")).email != null) {
        return JSON.parse(window.localStorage.getItem("userData")).email;
      } else {
        return "未绑定";
      }
    },
  },
  methods: {
    toChangeInfo() {
      this.$router.push("/user/changeinfo");
    },
    toOrderCenter() {
      this.$router.push("/user/ordercenter");
    },
    getOrderStutasNum(val) {
      if (val == 0) {
        return this.orderList.filter((item) => item.is_pay == 0).length;
      } else if (val == 2) {
        return this.orderList.filter((item) => item.is_ship == 1).length;
      } else if (val == 1) {
        return this.orderList.filter((item) => item.is_pay == 1).length;
      }
      return 0;
    },
  },
  components: {},
};
</script>

<style scoped lang='scss'>
.my-personal-center {
  background: white;
  padding: 50px 50px;

  .user-info {
    width: 800px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    border-bottom: 1px solid #e0e0e0;

    .user-card {
      display: flex;

      .name-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;

        h2 {
          font-size: 24px;
          font-weight: 400;
          color: #616161;
        }
        p {
          color: #b0b0b0;
          font-size: 14px;
          margin-top: 4px;
        }
        a {
          color: #ff6700;
          text-decoration: none;
          font-size: 14px;
          margin-top: 16px;
          cursor: pointer;
        }
      }
    }
    .user-actions {
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      ul {
        list-style: none;
        font-size: 14px;
        color: #757575;
        li {
          margin: 10px 0;
          .level {
            color: #ffac13;
          }
        }
      }
    }
  }

  .goods-order {
    display: flex;
    width: 800px;
    flex-wrap: wrap;
    .goods-order-item {
      display: flex;
      width: 400px;
      margin: 50px 0;

      .order-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        color: #757575;
        h3 {
          font-size: 18px;
          font-weight: 400;
          span {
            color: #ff6700;
          }
        }
        a {
          text-decoration: none;
          margin-top: 6px;
          color: #757575;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: #ff6700;
          }
        }
      }
    }
  }
}
</style>
