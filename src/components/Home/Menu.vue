<template>
  <div class="menu">
    <div class="menuitem" v-for="(item,index) in menuInfo" :key="index">
      <h4>{{ item.title }}</h4>
      <ul class="label-box">
        <li v-for="(value,index) in item.labels" :key="index"><a @click="toXianhua(value)">{{ value }}</a></li>
        <!-- <li><a href="#">爱情鲜花</a></li>
        <li><a href="#">爱情鲜花</a></li>
        <li><a href="#">爱情鲜花</a></li>
        <li><a href="#">爱情鲜花</a></li>
        <li><a href="#">爱情鲜花</a></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuInfo: [{
        title: '韩式花束',
        labels: ['Cherish系列','Relative系列','Full love系列','Secret love系列']
      },{
        title: '创意花盒',
        labels: ['Friendship系列','Relative系列','Full love系列','Cherish系列','Blessing系列']
      },{
        title: '永生花',
        labels: ['水瓶座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天平座','天蝎座','双鱼座']
      }]
    };
  },
  mounted() {

  },
  methods: {
    toXianhua(val) {
      if(val.slice(-2) == '系列') {
        val = val.slice(0,-2)
      }
      this.$router.push({ path: "/xianhua", query: { values: val } });
    }
  }
};
</script>

<style scoped lang='scss'>
.menu {
  width: 300px;
  height: 460px;
  background: rgb(249, 250, 254);
}
.menu {
  line-height: normal;
  position: absolute;
  top: 222px;
  z-index: 200;
  display: block;
}
.menu ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
}
.menu ul li {
  margin-top: 6px;
  margin-bottom: 6px;
  margin-right: 8px;
}
.menuitem {
  // margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
.menuitem h4 {
  margin-bottom: 10px;
}
.menuitem:hover {
  -moz-box-shadow: 5px 5px 20px #999;
  -webkit-box-shadow: 5px 5px 20px #999;
  box-shadow: 5px 5px 20px #999;
}
.menuitem:hover h4 {
  color: rgb(255, 105, 128);
}
.menuitem a {
  cursor: pointer;
  color: black;
  text-decoration: none;
}
.menuitem a:hover {
  color: rgb(255, 105, 128);
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
