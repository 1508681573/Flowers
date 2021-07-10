<template>
  <div class="Rside">
    <div class="cservice">
      <span>好花导航</span>
    </div>
    <ul>
      <li class="rotate" v-for="item of 4" :key="item">
        <a :href="'#tj'+item">{{ crsideData[item-1] }}</a>
      </li>
      <li>
        <a href="#">
          <!-- <el-backtop target=".el-icon-arrow-up"></el-backtop> -->
          <i class="el-icon-arrow-up"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Rside",
  data() {
    return {
      fname: "韩式鲜花",
    };
  },
  props: {
    crsideData: {
      type: Array,
      defalut() {
        return
      }
    }
  },
  components: {},
};
</script>

<style scoped lang='scss'>
.Rside {
  position: fixed;
  width: 100px;
  right: 90px;
  /* bottom: 184px; */
  top: 171px;
  border-radius: 5px;
  z-index: 999;
  box-shadow: 0 0 20px #e5e5e5;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .cservice {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    color: white;
    width: 100%;
    background-color: #ff6980;
    border-radius: 5px 5px 0 0;
  }
  ul {
    list-style: none;
    li {
      display: block;
      height: 80px;
      line-height: 80px;
      text-align: center;
      &:hover {
        background: rgb(249, 250, 254);
        a {
          color: #ff6980;
        }
      }
      a {
        display: block;
        text-decoration: none;
        color: black;
      }
    }
    .rotate {
      border-bottom: 1px dashed #e5e5e5;
    }
  }
}
</style>
