<template>
  <div class="login">
    <div class="full-login">
      <div class="login-box">
        <div class="box-bar">
          <ul>
            <li @click="toLogin()" :class="isActive ? 'active' : ''">登录</li>
            <li @click="toRegister()" :class="!isActive ? 'active' : ''">
              注册
            </li>
          </ul>
        </div>
        <div v-if="isLogin" class="login-form">
          <form action="" method="post">
            <input
              name="name"
              v-model="input1"
              type="text"
              placeholder="请输入账号"
            /><br />
            <input
              name="password"
              v-model="input2"
              type="password"
              placeholder="请输入密码"
            /><br />
            <button @click="login" type="button">登录</button>
          </form>
        </div>
        <div v-else class="login-form">
          <form action="" method="post">
            <input
              v-model="input1"
              type="text"
              name=""
              placeholder="请输入账号"
            /><br />
            <input
              v-model="input2"
              type="password"
              name=""
              placeholder="请输入密码"
            /><br />
            <input
              v-model="input3"
              type="password"
              name=""
              placeholder="请再次输入密码"
            /><br />
            <button @click="register" type="button">注册</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUserLogin, apiUserRegister, apiUserInfo } from "../utils/api";

export default {
  data() {
    return {
      isActive: true,
      isLogin: true,
      input1: "",
      input2: "",
      input3: "",
      // input4: "",
      // input5: "",
    };
  },
  mounted() {},
  components: {},
  methods: {
    toLogin() {
      this.isLogin = true;
      this.isActive = true;
    },
    toRegister() {
      this.isLogin = false;
      this.isActive = false;
    },
    login() {
      apiUserLogin({ name: this.input1, password: this.input2 }) //发送网络请求验证
        .then((res) => {
          //登录成功处理

          //弹出提示
          if (res.code == 666) {
            //修改登录状态
            this.$store.commit("SET_LOGINSTATUS", true);
            //把token存入store
            this.$store.commit("SET_TOKEN", res.token);
            //把用户名存入store
            this.$store.commit("SET_USERNAME", res.data.name);
            //先把token存入res.data,以存入local Storage
            res.data.token = res.token
            //把用户数据及token存入localStorage
            window.localStorage.setItem("userData",JSON.stringify(res.data));

            this.$message({
              message: "登录成功",
              type: "success",
            });
            //发射用户名给topper组件
            // this.$emit('userName',res.data.name)
            //返回上一页
            history.go(-1);
          } else if (res.code == 602) {
            this.$message.error("账号不存在！");
          } else {
            this.$message.error("密码错误！");
          }
        });
    },
    register() {
      if (this.input1 != "") {
        if (this.input2 == this.input3) {
          //查找数据库里有没有这个用户
          apiUserInfo({ name: this.input1 }).then((res) => {
            // 201 没有查到这个用户
            if (res.code == 201) {
              // 提交数据，进行注册
              apiUserRegister({
                name: this.input1,
                password: this.input2,
              }).then((res) => {
                // 200 注册成功
                if (res.code == 200) {
                  //成功后登录
                  this.login(); 
                }
              });
            }else{
              this.$message.error("账号已存在！");
            }
          });
        } else {
          this.$message.error("两次输入密码不同！");
        }
      } else {
        this.$message.error("请输入用户名！");
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.login {
  .full-login {
    // margin-bottom: 100px;
    height: 812px;
    background-image: url(../assets/Login/login_bg.png);
    .login-box {
      position: absolute;
      left: 960px;
      top: 360px;
      width: 544px;
      height: 547px;
      padding: 9px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 20px #e5e5e5;
      .box-bar {
        text-align: center;
        padding-top: 60px;
        padding-bottom: 10px;
        ul {
          margin: 0 auto;
          width: 400px;
          height: 55px;
          border-bottom: 1px solid rgb(226, 226, 226);
          //   background: green;
          display: flex;
          justify-content: center;
          list-style: none;
          li {
            float: left;
            height: 54px;
            line-height: 54px;
            width: 100px;
            cursor: pointer;
            // &:hover {
            //     color: rgb(255, 47, 47);
            // }
          }
        }
      }
      .login-form {
        text-align: center;
        form {
          input {
            width: 360px;
            height: 55px;
            padding-right: 30px;
            padding-top: 30px;
            outline: none;
            font-size: 14px;
            color: #999;
            border: 0;
            border-bottom: 1px solid #e5e5e5;
            vertical-align: middle;
          }
          button {
            width: 400px;
            padding: 12px 0;
            display: block;
            margin: 0 auto;
            margin-top: 60px;
            font-size: 18px;
            color: #fefefe;
            text-align: center;
            background-color: #63c170;
            border: 1px solid #63c170;
            border-radius: 5px;
            outline: none;
            cursor: pointer;
            // vertical-align: middle;
          }
        }
      }
    }
  }
}
.active {
  height: 54px;
  line-height: 54px;
  border-bottom: 3px solid #63c170;
  font-size: 24px;
  font-weight: 700;
  color: #63c170;
}
</style>
