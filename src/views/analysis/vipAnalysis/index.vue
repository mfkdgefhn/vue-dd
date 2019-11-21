<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2019-11-15 11:14:44
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
        <!-- 折扣率 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="discountRate" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 单笔金额 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="singleSum" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 会员积分 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="membershipScore" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 商品类别 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts
              :screen-height="screenHeight"
              :data="CommodityCategory"
              :loading="loading"
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
      screenHeight: window.innerHeight,
      // 加载动画
      loading: false,
      loadingCon: false,
      loadCount: 0,
      // 折扣率
      discountRate: {
        title: '折扣率',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '小于3折' },
          // { value: Math.round(1000 * (Math.random())), name: '3-5折' },
          // { value: Math.round(1000 * (Math.random())), name: '5-7折' },
          // { value: Math.round(1000 * (Math.random())), name: '大于7折' }
        ]
      },
      // 单笔金额
      singleSum: {
        title: '单笔金额',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '小于100￥' },
          // { value: Math.round(1000 * (Math.random())), name: '100-149￥' },
          // { value: Math.round(1000 * (Math.random())), name: '150-200￥' },
          // { value: Math.round(1000 * (Math.random())), name: '大于200￥' }
        ]
      },
      // 会员积分
      membershipScore: {
        title: '会员积分',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '小于1K' },
          // { value: Math.round(1000 * (Math.random())), name: '1K-2K' },
          // { value: Math.round(1000 * (Math.random())), name: '2K-3K' },
          // { value: Math.round(1000 * (Math.random())), name: '大于3K' }
        ]
      },
      // 商品类别
      CommodityCategory: {
        title: '商品类别',
        data: []
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
    this.getProductType()
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
