<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col>
        <el-date-picker
          v-model="listQuery.beginDate"
          class="price-class"
          type="date"
          value-format="yyyyMMdd"
          placeholder="开始日期"
          format="yyyyMMdd"
        />
        <span style="line-height:38px; color:#ccc;">至</span>
        <el-date-picker
          v-model="listQuery.endDate"
          class="price-class"
          type="date"
          value-format="yyyyMMdd"
          placeholder="结束日期"
          format="yyyyMMdd"
        />

        <!-- 价格区间 -->
        <el-input
          v-model="listQuery.minPrice"
          class="price-class"
          type="tel"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="4"
          placeholder="低价"
        ></el-input>
        <span style="line-height:38px; color:#ccc;">至</span>
        <el-input
          v-model="listQuery.maxPrice"
          class="price-class"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="4"
          type="tel"
          placeholder="高价"
        ></el-input>

        <!-- 经销商选择 -->
        <el-select
          v-model="listQuery.customer"
          class="price-class"
          multiple
          clearable
          collapse-tags
          style="margin-left: 20px;"
          placeholder="经销商"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <!-- 风格选择 -->
        <el-select
          v-model="listQuery.mid8"
          class="price-class"
          multiple
          clearable
          collapse-tags
          style="margin-left: 20px;"
          placeholder="风格"
        >
          <el-option v-for="item in mid8s" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>

        <!-- 搜索按钮 -->
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >会员挖掘</el-button>

        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('this')"
        >单页导出</el-button>

        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('all')"
        >全部导出</el-button>

        <!-- PDF -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="exportPdf"
        >PDF</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDateStr } from '@/utils/times'
import waves from '@/directive/waves' // waves directive
import { isEmpty } from '@/utils/string'

export default {
  name: "SearchVip",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listQuery: {
        beginDate: getDateStr(-7),
        endDate: getDateStr(-1),
        loading: false,
      },
      options: [],
      mid8s: []
    };
  },
  directives: { waves },
  computed: {
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      // 经销商档案
      this.$store.dispatch("baseApi/getCustomer").then(() => {
        this.options = this.$store.getters.customer
      });
      // 款号风格
      this.$store.dispatch("baseApi/getProductStyle").then(() => {
        this.mid8s = this.$store.getters.productStyle
      });
    },

    // 搜索栏回车事件
    handleFilter() {
      if (this.judge(this.listQuery)) {
        this.$message.error("最小值超过最大值，请重新输入！")
        return
      }
      if (isEmpty(this.listQuery.customer.length) && (isEmpty(this.listQuery.minPrice) && isEmpty(this.listQuery.maxPrice))) {
        this.$message.error("查询数据过万，请输入查询参数！！！")
        return
      }
      var data = Object.assign({}, this.listQuery)
      this.handle(data)
      this.$emit('getAnalysis', data)
    },
    // 判断价格值
    judge(data) {
      if (!data.minPrice)
        return false
      else {
        if (!data.maxPrice)
          return false
        else
          return data.minPrice > data.maxPrice ? true : false
      }
    },
    // 对查询参数进行转换
    handle(data) {
      // 时间转换
      if (!data.beginDate) {
        if (data.endDate) {
          data.jzDate = data.endDate;
          data.endDate = null;
        }
      }
      if (!data.endDate) {
        if (data.beginDate) {
          data.qsDate = data.beginDate;
          data.beginDate = null;
        }
      }
      if (!data.beginDate && !data.endDate) {
        data.beginDate = 20180101;
        data.endDate = getDateStr(-1);
      }
      // 经销商转换
      if (data.customer.length > 0) {
        var arr = [];
        data.customer.forEach(element => {
          arr.push(element);
        });
        data.customer = arr.join(",");
      } else {
        delete data.customer
      }
      // 网格转换
      if (data.mid8.length > 0) {
        var arr = [];
        data.mid8.forEach(element => {
          arr.push(element);
        });
        data.mid8 = arr.join(",");
      } else {
        delete data.mid8
      }
    },
    // 导出excel
    handleDownload(str) {
      this.$emit('handleDownload', str)
    },
    // 导出PDF
    exportPdf() {
      this.$emit('exportPdf')
    },
  }
};
</script>

<style scoped>
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 5px;
}
.price-class {
  width: 150px;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
