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
    <div class="el-row-class">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 折扣率 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px"
              :data="discountRate"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
        <!-- 单笔金额 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px"
              :data="singleSum"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 会员积分 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px"
              :data="membershipScore"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
        <!-- 商品类别 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px"
              :data="CommodityCategory"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 点击响应弹窗详细信息 -->
    <prompt-box-new
      :table-header="tableHeader"
      :dialog-visible="dialogVisible"
      :loading="itemLoading"
      :title="titleNew"
      :item-date="itemDate"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>

import Search from '@/components/public/search'
import pieEcharts from '@/components/public/pieEcharts'
import promptBoxNew from '@/components/tips/prompt-box-new'
import { getProductType, getDiscountRate, getSingleSum, getMembershipScore, getCommodityCategory } from '@/api/gmqApi'

export default {
  name: 'VipAnalysis',
  components: {
    Search, pieEcharts, promptBoxNew
  },
  data() {
    return {
      // 加载动画
      loading: false,
      dialogVisible: false,
      itemLoading: false,
      titleNew: '明细',
      itemDate: [],
      loadCount: 0,
      params: {},
      tableHeader: [
        { id: 1, property: 'billdate', label: '单据日期' },
        { id: 2, property: 'cStoreName', label: '店仓' },
        { id: 3, property: 'docno', label: '单据编号' },
        { id: 4, property: 'mProductName', label: '款号' },
        { id: 5, property: 'totAmtActual', label: '价格' },
        { id: 6, property: 'attribname', label: '风格' }
      ],
      // 折扣率 单笔金额 会员积分 商品类别
      discountRate: { title: '折扣率', type: 'discountRate', data: [] },
      singleSum: { title: '单笔金额', type: 'singleAmount', data: [] },
      membershipScore: { title: '会员积分', type: 'membershipPoints', data: [] },
      CommodityCategory: { title: '商品类别', type: 'commodityCategory', data: [] },
      // 提示信息
      title: '根据查询条件进行查询数据(该报表只查询会员数据)',
      tipsData: [
        { name: '折扣率：', description: '以会员折扣比例为维度' },
        { name: '单笔金额：', description: '以单笔金额为维度' },
        { name: '会员积分：', description: '以会员积分为维度' },
        { name: '商品类别：', description: '以商品类别为维度' }
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
    // 渲染参数
    readerParams(val) {
      this.tableHeader = [
        { property: 'billdate', label: '单据日期' },
        { property: 'cStoreName', label: '店仓' },
        { property: 'docno', label: '单据编号' }
      ]
      this.itemDate = []
      this.dialogVisible = true
      this.itemLoading = true
      const paramsDate = Object.assign({}, this.params)
      if (val.seriesName === '折扣率') {
        this.titleNew = (paramsDate.discountRate = val.name) + ' ' + val.seriesName
        this.tableHeader.push({ property: 'mProductName', label: '款号' })
        this.tableHeader.push({ property: 'totAmtActual', label: '价格' })
        this.tableHeader.push({ property: 'discountRate', label: '折扣率' })
      } else if (val.seriesName === '单笔金额') {
        this.titleNew = (paramsDate.singleAmount = val.name.replace(/\$/g, '')) + ' ' + val.seriesName
        console.log(val.name.replace(/\$/g, ''))
        this.tableHeader.push({ property: 'singleAmount', label: '单笔金额' })
      } else if (val.seriesName === '会员积分') {
        this.titleNew = (paramsDate.membershipPoints = val.name) + ' ' + val.seriesName
        this.tableHeader = [
          { property: 'cardno', label: '会员卡号' },
          { property: 'vipname', label: '会员昵称' },
          { property: 'mobil', label: '手机号' },
          { property: 'birthday', label: '出生日期' },
          { property: 'membershipPoints', label: '会员积分' }
        ]
      } else if (val.seriesName === '商品类别') {
        this.titleNew = (paramsDate.commodityCategory = val.name) + ' ' + val.seriesName
        this.tableHeader.push({ property: 'commodityCategory', label: '商品类别' })
      }
      this.$store.dispatch('baseApi/getRetailItemAnalysis', paramsDate).then(() => {
        setTimeout(() => {
          this.itemDate = this.$store.getters.retailItemAnalysis
          this.itemLoading = false
        }, 500)
      }).catch(error => {
        this.itemLoading = false
        console.log(error)
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
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
      this.params = Object.assign({}, params)
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
