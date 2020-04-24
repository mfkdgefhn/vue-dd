<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:58:38
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
        <!-- 折扣率 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="discountRate"
              :tips-data="tipsData"
              :title="discountRate.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
        <!-- 单笔金额 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="singleSum"
              :tips-data="tipsData"
              :title="singleSum.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 会员积分 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="membershipScore"
              :tips-data="tipsData"
              :title="membershipScore.title"
              :loading="loading"
              class="pie-class"
              style="height:300px"
            />
          </el-card>
        </el-col>
        <!-- 商品类别 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="CommodityCategory"
              :tips-data="tipsData"
              :title="CommodityCategory.title"
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
import { getProductType, getDiscountRate, getSingleSum, getMembershipScore, getCommodityCategory } from '@/api/gmqApi'

export default {
  name: 'VipAnalysis',
  components: {
    Search, pieEcharts
  },
  data() {
    return {
      // 加载动画
      loading: false,
      loadingCon: true,
      loadCount: 0,
      // 折扣率
      discountRate: {
        title: '折扣率',
        data: []
      },
      // 单笔金额
      singleSum: {
        title: '单笔金额',
        data: []
      },
      // 会员积分
      membershipScore: {
        title: '会员积分',
        data: []
      },
      // 商品类别
      CommodityCategory: {
        title: '商品类别',
        data: []
      },
      // 提示信息
      title: '根据查询条件进行查询数据(该报表只查询会员数据)',
      tipsData: [
        {
          name: '折扣率：',
          description: '以会员折扣比例为维度'
        },
        {
          name: '单笔金额：',
          description: '以单笔金额为维度'
        },
        {
          name: '会员积分：',
          description: '以会员积分为维度'
        },
        {
          name: '商品类别：',
          description: '以商品类别为维度'
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
    // this.getProductType()
  },
  methods: {
    // 获取款号类型
    getProductType() {
      var that = this
      // 获取款号类型并渲染到组件中
      getProductType().then(response => {
        var arrData = response.result
        var ob = ''
        var arr = []
        for (let i = 0; i < arrData.length; i++) {
          ob = { value: Math.round(1000 * (Math.random())), name: arrData[i].attribname }
          arr.push(ob)
          // if (arr.length >= 7) break
        }
        that.CommodityCategory.data = arr
      })
    },
    getAnalysis(params) {
      this.loadingCon = true
      this.loading = true
      // 折扣率分析饼图
      getDiscountRate(params).then(response => {
        this.discountRate.data = this.getObject(response.result)
        this.loadCount++
      })
      // 单笔金额饼图
      getSingleSum(params).then(response => {
        this.singleSum.data = this.getObject(response.result)
        this.loadCount++
      })
      // 会员积分饼图
      getMembershipScore(params).then(response => {
        this.membershipScore.data = this.getObject(response.result)
        this.loadCount++
      })
      // 商品类别饼图
      getCommodityCategory(params).then(response => {
        this.CommodityCategory.data = this.getObject(response.result)
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
.pie-class {
  color: #04beff;
  font-weight: 900;
}
</style>
