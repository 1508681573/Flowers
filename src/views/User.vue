<template>
  <div class="personal-center">
    <div class="container">
      <div class="bread-crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container-body">
        <el-affix :offset="0">
          <div class="user-menu">
            <el-menu
              router
              default-active="/user/portal"
              active-text-color="#ff6700"
              :default-openeds="menuArr"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template v-slot:title>
                  <!-- <i class="el-icon-location"></i> -->
                  <span>个人中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/portal">个人信息</el-menu-item>
                  <el-menu-item index="/user/address">地址管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template v-slot:title>
                  <!-- <i class="el-icon-location"></i> -->
                  <span>订单中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/ordercenter"
                    >全部订单</el-menu-item
                  >
                  <!-- <el-menu-item @click="toOrderCenter('toBePaid')"
                  >待付款</el-menu-item
                >
                <el-menu-item @click="toOrderCenter('forGoods')"
                  >待收货</el-menu-item
                > -->
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template v-slot:title>
                  <!-- <i class="el-icon-location"></i> -->
                  <span>修改信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/changeinfo">修改信息</el-menu-item>
                  <el-menu-item index="/user/changepassword"
                    >修改密码</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-affix>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuArr: ["1", "2", "3"],
    };
  },
  components: {},
  methods: {
    // toHome() {
    //   this.$router.push('/')
    // }
    toOrderCenter(val) {
      this.$router.push({
        name: "OrderCenter",
        params: { orderGroup: val },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.personal-center {
  background: #f5f5f5;

  .container {
    width: 1200px;
    margin: 0 auto;

    .bread-crumb {
      padding: 20px 0;
      // .el-breadcrumb__item {
      //   cursor: pointer;
      //   &:hover {
      //     color: red;
      //     // background: red;
      //   }
      // }
    }

    .container-body {
      display: flex;
      padding-bottom: 30px;

      .user-menu {
        width: 201px;
        height: 510px;
        padding-left: 30px;
        padding-top: 30px;
        background: white;
        margin-right: 20px;
      }
    }
  }
}
</style>
