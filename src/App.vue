<template>
  <div>
    <Topper />
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Topper from "../src/components/Topper.vue";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Topper,
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
