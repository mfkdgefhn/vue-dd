<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2020-09-03 15:49:05
 -->
<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh); */
  background-color: #eff5fe;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
