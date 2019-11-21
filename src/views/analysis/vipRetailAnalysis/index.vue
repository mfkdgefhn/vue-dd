<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2019-11-15 11:15:00
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>
    <div v-if="loadingCon" class="content-div">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 次数 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="frequencyType" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 件数 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="numberType" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 金额 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="montyType" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 周期 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="cycleType" :loading="loading" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import Search from '@/components/public/search'
import pieEcharts from '@/components/public/pieEcharts'
import { getNumberOfMemberPurchases, getNumberOfPurchasesByMembers, getMemberPurchaseAmount, getMemberBuyingCycle } from '@/api/gmqApi'

export default {
  name: 'VipRetailAnalysis',
  components: {
    Search, pieEcharts
  },
  data() {
    return {
      screenHeight: window.innerHeight,
      // 加载动画
      loading: false,
      loadingCon: false,
      loadCount: 0,
      // 次数
      frequencyType: {
        title: '次数',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '1次' },
          // { value: Math.round(1000 * (Math.random())), name: '2次' },
          // { value: Math.round(1000 * (Math.random())), name: '3次' },
          // { value: Math.round(1000 * (Math.random())), name: '大于3次' }
        ]
      },
      // 件数
      numberType: {
        title: '件数',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '1件' },
          // { value: Math.round(1000 * (Math.random())), name: '2件' },
          // { value: Math.round(1000 * (Math.random())), name: '3件' },
          // { value: Math.round(1000 * (Math.random())), name: '大于3件' }
        ]
      },
      // 金额
      montyType: {
        title: '金额',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '200$' },
          // { value: Math.round(1000 * (Math.random())), name: '500$' },
          // { value: Math.round(1000 * (Math.random())), name: '1000$' },
          // { value: Math.round(1000 * (Math.random())), name: '大于1000$' }
        ]
      },
      // 周期
      cycleType: {
        title: '周期',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '小于3' },
          // { value: Math.round(1000 * (Math.random())), name: '4-6' },
          // { value: Math.round(1000 * (Math.random())), name: '7-9' },
          // { value: Math.round(1000 * (Math.random())), name: '大于10' }
        ]
      }

    }
  },
  watch: {
    // 监听loadCount的值，如果能被4整除的时间，搜索按钮加载动画结束
    loadCount(val) {
      if (val % 4 === 0) {
        this.loading = false
        this.$message({
          message: '查询完成!',
          type: 'success',
          duration: 2000
        })
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight
        that.timer = true
        setTimeout(() => {
          that.timer = false
        }, 400)
      })()
    }
  },
  methods: {
    getAnalysis(params) {
      this.loadingCon = true
      this.loading = true
      // 次数
      getNumberOfMemberPurchases(params).then(response => {
        this.frequencyType.data = this.getObject(response.result)
        this.loadCount++
      })
      // 件数
      getNumberOfPurchasesByMembers(params).then(response => {
        this.numberType.data = this.getObject(response.result)
        this.loadCount++
      })
      // 金额
      getMemberPurchaseAmount(params).then(response => {
        this.montyType.data = this.getObject(response.result)
        this.loadCount++
      })
      // 周期
      getMemberBuyingCycle(params).then(response => {
        this.cycleType.data = this.getObject(response.result)
        this.loadCount++
      })
    },
    getObject(resultArr) {
      var arr = []
      resultArr.forEach(val => {
        var obj = {}
        obj.name = val.name
        obj.value = val.qty
        arr.push(obj)
      })
      return arr
    }

  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
.content-div {
  margin-left: 10px;
  margin-right: 10px;
}
.el-row {
  margin: 10px 0 10px 0;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-bottom: 10px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /* background: #242640; */
  background: #ccc;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
