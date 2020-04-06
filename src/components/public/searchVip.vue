<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col :md="8" :sm="12" :xs="24">
        <el-row style="margin-bottom:0px;">
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.beginDate"
              style="width: 100%; margin-bottom: 5px; font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="开始日期"
              format="yyyyMMdd"
            />
          </el-col>
          <el-col :span="2" style="text-align:center;">
            <span style="line-height:38px; color:#ccc;">至</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.endDate"
              style="width: 100%;margin-bottom: 5px;font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="结束日期"
              format="yyyyMMdd"
            />
          </el-col>
        </el-row>
      </el-col>

      <!-- 价格区间 -->
      <el-col :md="8" :sm="12" :xs="24">
        <el-row style="margin-bottom:0px;">
          <el-col :span="11">
            <el-input
              v-model="listQuery.price1"
              type="tel"
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              maxlength="4"
              placeholder="最小值"
            ></el-input>
          </el-col>
          <el-col :span="2" style="text-align:center;">
            <span style="line-height:38px; color:#ccc;">至</span>
          </el-col>
          <el-col :span="11">
            <el-input
              v-model="listQuery.price2"
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              maxlength="4"
              type="tel"
              placeholder="最大值"
            ></el-input>
          </el-col>
        </el-row>
      </el-col>

      <!-- 经销商 -->
      <el-col :md="5" :sm="8" :xs="24">
        <el-select
          v-model="listQuery.customerIds"
          multiple
          clearable
          collapse-tags
          style="margin-left: 20px;"
          placeholder="经销商"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <!-- 风格选择 -->
      <el-col :md="5" :sm="8" :xs="12">
        <el-select
          v-model="listQuery.mid8"
          multiple
          clearable
          collapse-tags
          style="margin-left: 20px;"
          placeholder="风格"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :md="3" :sm="5" :xs="5">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >分析</el-button>
      </el-col>
    </el-row>

    <!-- 提示信息弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStore } from "@/api/gmqApi"; // , getYear,getSeason,getCustomer,
import { getDateStr } from '@/utils/times'

export default {
  name: "SearchVip",
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: "background-color:rgba(78,143,223,0);"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAllLevels: false,
      listQuery: {
        beginDate: getDateStr(-7),
        endDate: getDateStr(-1),
        loading: false,
        customerIds: []
      },
      storeOptions: [],
      restaurants: [],
      dialogVisible: false,
      options: []
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() { },
  methods: {
    // 初始化经销商档案
    init() {
      this.$store.dispatch("baseApi/getCustomer").then(() => {
        this.options = this.$store.getters.customer.map(x => {
          const option = {
            value: x.id,
            label: x.name
          };
          return option;
        });
        this.options.unshift({ value: 176, label: "总部" });
      });
    },
    // 搜索栏回车事件
    handleFilter() {
      if (this.judge(this.listQuery)) {
        this.$message.error("最小值比最大值，请重新输入！")
        return
      }
      var data = Object.assign({}, this.listQuery)
      this.handle(data)
      this.$emit('getAnalysis', data)
    },
    judge(data) {
      if (!data.price1)
        return false
      else {
        if (!data.price2)
          return false
        else
          return data.price1 > data.price2 ? true : false
      }
    },
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
      if (data.customerIds > 0) {
        var arr = [];
        data.customerIds.forEach(element => {
          arr.push(element[1]);
        });
        data.customerIds = arr.join(",");
      }
    },
    // 刷新事件
    refresh() {
      console.log("刷新");
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    showMessage() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
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
</style>
