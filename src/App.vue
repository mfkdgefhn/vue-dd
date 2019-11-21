<!--
 * @Description: 入口文件
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-10-12 12:15:30
 -->

<template>
  <div id="app" style="height:100%;">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // fullHeight: document.documentElement.clientHeight
    }
  },
  // watch: {
  //   fullHeight(val) {
  //     if (!this.timer) {
  //       this.fullHeight = val
  //       this.timer = true
  //       const that = this
  //       setTimeout(function() {
  //         that.timer = false
  //       }, 400)
  //     }
  //   }
  // },
  mounted() {
    // this.get_bodyHeight()
  },
  methods: {
    get_bodyHeight() {
      const that = this
      window.onresize = () => {
        return () => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        }
      }
    }
  }
}
</script>

<style>
#app {
  background-color: #191b2b;
}
</style>
