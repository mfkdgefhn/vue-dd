<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 搜索按钮 -->
      <el-col>
        <!-- 加载 -->
        <el-button
          type="primary"
          :loading="loading"
          @click="load"
        >{{ loading==='true'? '加载中' : title }}</el-button>

        <!-- 导出 -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('this')"
        >导出</el-button>

        <!-- PDF -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="exportPdf"
        >PDF</el-button>

        <!-- 提示信息 -->
        <el-button type="primary" icon="el-icon-message" circle @click="tipsInfo" />
      </el-col>
    </el-row>

    <!-- 提示信息弹窗 -->
    <prompt-box
      :dialog-visible="dialogVisible"
      :title="title"
      :tips-data="tipsData"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import promptBox from '@/components/tips/prompt-box'

export default {
  name: 'SearchSaleNew',
  directives: { waves },
  components: {
    promptBox
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      tips: {
        'inSaleStorage': [
          {
            name: '区域',
            description: '根据地域不同分为南区、北区'
          },
          {
            name: '经销商',
            description: '以客户区分'
          },
          {
            name: '发货量',
            description: '出库数量'
          },
          {
            name: '余货量',
            description: '订单数量-发货数量'
          },
          {
            name: '批发数量',
            description: '销售给二级经销商的数量'
          },
          {
            name: '零售数量',
            description: '季度总零售数量'
          },
          {
            name: '整体单价',
            description: '季度款 总零售数量/零售数量'
          },
          {
            name: '整体售罄率',
            description: '(批发数量+零售数量)/(批发数量+零售数量+总库存)'
          },
          {
            name: '毛利率',
            description: '(累计销售金额-累计成本)/累计销售金额'
          },
          {
            name: '仓存',
            description: '季度款 仓库库存'
          },
          {
            name: '总库存',
            description: '季度款总库存(包括仓库+所有门店)'
          },
          {
            name: '铺店数',
            description: '门店数量(排除店仓：加盟、特卖、店名带仓、福利店)'
          },
          {
            name: '单店存',
            description: '所有门店季度款  总库存/门店数量'
          }
        ],
        'layoutStructure': [
          {
            name: '经销商',
            description: '以客户区分'
          },
          {
            name: '品名',
            description: '款号字段MID6，版面结构来区分'
          },
          {
            name: '款数',
            description: '款号N总数量'
          },
          {
            name: 'SKU',
            description: '款号总数量'
          },
          {
            name: '客户批发',
            description: '1级销售给2级经销商的数量'
          },
          {
            name: '累销',
            description: '所有门店的零售数量'
          },
          {
            name: '上周',
            description: '昨日往前14天的零售数量'
          },
          {
            name: '本周',
            description: '昨日往前7天的零售数量'
          },
          {
            name: '量环比',
            description: '(本周-上周)/上周'
          },
          {
            name: '累计毛利率',
            description: '(累计零售金额-累计成本)/累计零售金额'
          },
          {
            name: '均成本',
            description: '出厂价平均值'
          },
          {
            name: '总单价',
            description: '所有门店零售总金额/总数量'
          },
          {
            name: '上周',
            description: '昨日往前14天零售总单价'
          },
          {
            name: '本周',
            description: '昨日往前7天零售总单价'
          },
          {
            name: '单价变化',
            description: '本周-上周'
          },
          {
            name: '仓库数量',
            description: '对应仓库库存数量'
          },
          {
            name: '店铺数量',
            description: '对应门店库存数量'
          },
          {
            name: '售罄率',
            description: '(批发+累销)/(批发+累销+仓库+店铺)'
          },
          {
            name: '周存销',
            description: '店铺数量/((直营销售上周+直营销售本周)/2)'
          }
        ]
      }
    }
  },
  computed: {
    tipsData() {
      if (this.title.indexOf('进销存') >= 0) {
        return this.tips.inSaleStorage
      } if (this.title.indexOf('版面结构') >= 0) {
        return this.tips.layoutStructure
      } else {
        return ['字段提示，提示板块开发中.....']
      }
    }
  },
  methods: {
    // 修改标题并加载
    load() {
      this.$emit('editTitle')
    },
    tipsInfo(str) {
      this.dialogVisible = !this.dialogVisible
    },
    // 导出EXCEL
    handleDownload(str) {
      this.$emit('handleDownload', str)
    },
    // 导出PDF
    exportPdf() {
      this.$emit('exportPdf')
    },
    handleClose(done) {
      this.dialogVisible = !this.dialogVisible
    }

  }
}
</script>

<style scoped>
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 5px;
}
.filter-item {
  margin-bottom: 5px;
}
</style>
