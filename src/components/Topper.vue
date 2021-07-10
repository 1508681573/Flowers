<template>
  <div class="topper">
    <div class="wrap">
      <div class="left">
        <a href="#" title="收藏花海网（huahai.vip)"
          >花海客服电话：400-888-XXXX</a
        >
        <a href="#"
          >关注微信
          <div class="topperpop">
            <div class="fqrcode">
              <p class="note">回复“礼物”有惊喜！" 活动多多，在好花遇见幸福</p>
              <p class="img">
                <img
                  src="../../public/img/qrcode.png"
                  width="128"
                  height="130"
                />
              </p>
              <p class="gzh">公众号</p>
            </div>
          </div>
        </a>
      </div>
      <div class="right">
        <!-- <router-link to="/login"   -->
        <a class="iconbounce login" @click="gotoPage" :title="userState">
          <i class="el-icon-user"></i>{{getUserState? getStoreUserName:'登录 / 注册'}}</a
        >
        <!-- <a class="iconbounce login" @click="gotoPage" :title="userState">
          <i class="el-icon-user"></i>{{userName}}</a
        > -->
        <a v-if="getUserState" class="iconbounce" @click="claerLocalstorage" href="#" title="登 出"
          ><i class="el-icon-star-off"></i>登 出</a
        >
        <!-- <a class="iconbounce" href="#" onclick="" title="联系客服" ><i class="icon icon-service"></i>联系客服</a> -->
        <a class="iconbounce cart2" @click="toCart" title="购物车"
          ><i class="el-icon-shopping-cart-2"></i>购物车<span></span
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topper",
  data() {
    return {
      userState: '',
      userName: '登录 / 注册'
    }
  },
  // mounted() {
  //   if (window.localStorage.getItem('userData').name) {
  //       this.userName = window.localStorage.getItem('userData').name
  //     } else {
  //       if(this.$store.state.loginStatus) {
  //         this.userName = this.$store.state.userName
  //       }
  //     }
  // },
  created() {
    //已登录，修改标签信息
    // if(this.$store.state.loginStatus){
    //   this.userState = this.$store.state.userName
    // }
  },
  computed: {
    //获取登录状态
    getUserState() {
      if (JSON.parse(window.localStorage.getItem('userData')) != null) {
        //修改登录状态
        this.$store.commit("SET_LOGINSTATUS", true);
        //把token存入store
        this.$store.commit("SET_TOKEN", JSON.parse(window.localStorage.getItem('userData')).token);
        //把用户名存入store
        this.$store.commit("SET_USERNAME", JSON.parse(window.localStorage.getItem('userData')).name);
      }
      return this.$store.state.loginStatus
    },
    //已登录，修改标签信息
    getStoreUserName() {
      return this.$store.state.userName
    }
  },
  watch: {
    // getStoreUserName:( data => {
    //   this.userState = data
    // })
  },
  methods: {
    gotoPage() {
      //如果用户未登录，跳转login页
      if(this.$store.state.loginStatus == false){
        this.$router.push('/login')
      }else{
        //跳转个人中心页
        this.$router.push('/user')
      }
    },
    toCart() {
      this.$router.push('/cart')
    },
    // 登 出
    claerLocalstorage() {
      //修改登录状态
      this.$store.commit("SET_LOGINSTATUS", false);
      //把 vuex 里 token 清空
      this.$store.commit("SET_TOKEN", '');
      //把 vuex 里 用户名 清空
      this.$store.commit("SET_USERNAME", '');
      //把local Storage 里 userData 置空
      window.localStorage.setItem('userData',null)
      //清空 localStorage
      window.localStorage.clear();
      console.log('aready login out');
    }
  }
};
</script>

<style lang="scss" scoped>
.topper {
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  color: #333;
  background-color: #f4f4f4;
}
.wrap {
  width: 1200px;
  margin: 0 auto;
}
.left {
  float: left;
}
.right {
  float: right;
}
.topper a {
  text-align: left;
  margin-right: 46px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: red;
    .topperpop {
      display: block;
    }
  }
}

.topper a .topperpop {
  line-height: normal;
  position: absolute;
  top: 42px;
  margin-left: 200px;
  z-index: 210;
  padding: 20px 25px;
  background-color: #fff;
  display: none;
  -moz-box-shadow: 5px 5px 20px #999;
  -webkit-box-shadow: 5px 5px 20px #999;
  box-shadow: 5px 5px 20px #999;
}
.fqrcode {
  width: 180px;
  /* max-width: 400px; */
}
.fqrcode .note {
  line-height: 25px;
  font-size: 12px;
  color: #333;
}
.fqrcode .img {
  text-align: center;
  height: 130px;
  margin-top: 10px;
}
.fqrcode .gzh {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
  text-align: center;
}
.topper .wrap .right i {
  width: 20px;
  height: 20px;
}
</style>
