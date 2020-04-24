<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:51:54
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <div v-if="loadingCon" class="el-row-class">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 次数 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="frequencyType"
              :tips-data="tipsData"
              :title="frequencyType.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
        <!-- 件数 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="numberType"
              :tips-data="tipsData"
              :title="numberType.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 金额 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="montyType"
              :tips-data="tipsData"
              :title="montyType.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
        <!-- 周期 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="cycleType"
              :tips-data="tipsData"
              :title="cycleType.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
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
      loadingCon: true,
      loadCount: 0,
      // 次数
      frequencyType: {
        title: '次数',
        data: [
        ]
      },
      // 件数
      numberType: {
        title: '件数',
        data: [
        ]
      },
      // 金额
      montyType: {
        title: '金额',
        data: [

        ]
      },
      // 周期
      cycleType: {
        title: '周期',
        data: [
        ]
      },
      // 提示信息
      title: '根据查询条件进行查询数据(该报表只查询会员数据)',
      tipsData: [
        {
          name: '次数：',
          description: '全部会员购买次数'
        },
        {
          name: '件数：',
          description: '全部会员购买件数'
        },
        {
          name: '金额：',
          description: '全部会员购买金额'
        },
        {
          name: '周期：',
          description: '会员购买周期，该图时间段为1年内(当天往前365天内)有购买过的总会员，两次购买的最短时间(该饼图与查询参数无关)'
        }
      ]
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

<style >
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.el-row-class {
  margin-left: 10px;
  margin-right: 10px;
}
.el-col-class {
  margin-top: 10px;
}
</style>
