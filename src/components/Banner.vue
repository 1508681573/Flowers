<template>
  <div class="banner">
    <img :src="bsrc" alt="!" />
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      bsrc: require("../assets/16cd8_441d.jpg"),
    };
  },
  components: {},
};
</script>

<style scoped lang='scss'>
.banner {
  margin-bottom: 50px;
}
</style>
