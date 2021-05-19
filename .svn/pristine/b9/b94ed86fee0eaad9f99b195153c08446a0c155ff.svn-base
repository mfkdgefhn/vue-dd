<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-11-05 08:55:38
 * @LastEditors: anan
 * @LastEditTime: 2019-11-05 09:09:04
 -->
<template>
  <!-- <echarts :big-data="bigData" :style="'height:'+(screenHeight*0.66*0.78)+'px;'" /> -->
  <echarts :big-data="bigData" style="height:100%;" />
</template>

<script>
import echarts from './echarts'
import { getBigData } from '@/api/gmqApi'

export default {
  components: {
    echarts
  },
  data() {
    return {
      bigData: [],
      screenHeight: window.innerHeight
    }
  },
  mounted() {
    this.getBigData()
  },
  methods: {
    getBigData(params) {
      getBigData(params).then(response => {
        // this.bigData = response.result
        this.bigData = response
      })
    }
  }
}
</script>
