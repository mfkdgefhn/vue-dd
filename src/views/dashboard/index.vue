<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-10-15 10:14:59
 -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="text">anan</el-button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getCustomer } from '@/api/gmqApi.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      name: 'aba'
    }
  },
  methods: {
    text() {
      console.log('111')
      getCustomer().then(response => {
        console.log(response.result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  color: #ccc;
  &-container {
    margin: 30px;
  }
  &-text {
    color: #ccc;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
