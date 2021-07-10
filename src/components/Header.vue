<template>
  <div class="header2brt">
    <div class="header">
      <div class="logo">
        <a title="【花海网】专注鲜花电商，只做品质鲜花！"
          ><img @click="toHome" src="../assets/logo.png" alt="花海网"
        /></a>
        <div class="search">
          <el-input
            class="inp"
            suffix-icon="el-icon-search"
            placeholder="请输入关键词搜索"
            v-model="input1"
            @keyup.enter="toXianhua(input1), (input1 = '')"
          >
          </el-input>
          <div class="tips">
            <span>热搜：</span>
            <a @click="toXianhua('红玫瑰')" class="frist">红玫瑰</a>
            <a @click="toXianhua('珍爱鲜花')">珍爱鲜花</a>
            <a @click="toXianhua('浓情鲜花')">浓情鲜花</a>
            <a @click="toXianhua('永生花')">永生花</a>
          </div>
        </div>
      </div>
      <div class="main-nav clearfix">
        <dl>
          <dt>
            <div class="dt" @click="toXianhua(0)"><a>全部商品导航</a></div>
            <Menu v-if="$route.meta.keepAlive" />
          </dt>
          <dd><a @click="toHome">首页</a></dd>
          <dd v-for="(item, index) in titleData" :key="index">
            <a @click="toXianhua(item.check)">{{ item.title }}</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Home/Menu";

export default {
  name: "Header",
  data() {
    return {
      input1: "",
      titleData: [
        { title: "鲜花", check: 1 },
        { title: "花盒", check: 2 },
        { title: "永生花", check: 3 },
      ],
    };
  },
  components: {
    Menu,
  },
  methods: {
    toHome() {
      // console.log(this.$router);
      this.$router.push("/");
    },
    toXianhua(val) {
      this.$router.push({ path: "/xianhua", query: { values: val } });
    },
  },
};
</script>

<style scoped lang='scss'>
.header2brt {
  background-color: #fff;
  border-bottom: 2px solid #ff6980;
}
.header {
  height: 178px;
  width: 1200px;
  margin: 0 auto;
}
.logo {
  height: 128px;
}
.logo > a {
  float: left;
  margin-top: 43px;
  width: 250px;
  color: #333;
  text-decoration: none;
}
.logo > a img {
  width: 290px;
  height: 48px;
  cursor: pointer;
}
.search {
  float: right;
  width: 500px;
  height: 40px;
  padding-top: 43px;
  margin-right: 200px;
  .inp {
    /deep/ input {
      height: 50px;
      background: rgb(255, 246, 247);
      border-color: rgb(255, 105, 128);
    }
  }
  .tips {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .frist {
      color: rgb(255, 105, 128);
    }
    span {
      font-size: 13px;
      color: #999;
      margin-left: 16px;
      margin-right: 10px;
    }
    a {
      text-decoration: none;
      cursor: pointer;
      margin-right: 16px;
      font-size: 13px;
      color: #999;
      &:hover {
        color: rgb(255, 105, 128);
      }
    }
  }
}
.search .el-input {
  font-size: 14px;
  color: #999;
  border: none;
  background-color: transparent;
  outline: medium;
}
.main-nav dl {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.main-nav dl a {
  text-decoration: none;
}
.main-nav dl .dt {
  width: 250px;
  height: 50px;
  line-height: 50px;
  background: rgb(255, 105, 128);
  padding-left: 50px;
  cursor: pointer;
}
.main-nav dl .dt a {
  color: white;
  font-size: 20px;
}
.main-nav dl dd {
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.main-nav dl dd a {
  color: black;
  font-size: 20px;
  cursor: pointer;
}
.main-nav dl dd a:hover {
  color: red;
}
</style>