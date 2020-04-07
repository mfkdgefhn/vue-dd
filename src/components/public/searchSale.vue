<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col :span="8">
        <el-date-picker
          v-model="listQuery.billdate"
          style="width: 100%; margin-bottom: 5px; font-size:12px;"
          type="date"
          value-format="yyyyMMdd"
          placeholder="开始日期"
          :picker-options="pickerOptions"
          format="yyyyMMdd"
        />
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :span="9">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >查询</el-button>

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
// import { getStore } from "@/api/gmqApi"; // , getYear,getSeason,getCustomer,
import waves from '@/directive/waves' // waves directive
import { getDateStr } from '@/utils/times'

export default {
  name: "SearchSale",
  directives: { waves },
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
        billdate: getDateStr(-1)
      },
      storeOptions: [],
      restaurants: [],
      dialogVisible: false,
      options: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      }
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
    },
    handleDownload(str) {
      this.$emit('handleDownload', str)
    },
    // 搜索栏回车事件
    handleFilter() {
      var data = Object.assign({}, this.listQuery)

      // https://easy-mock.com/mock/5d0c221d15fc6012866760fe/example/getTop30
      // this.handle(data)
      this.$emit('getAnalysis', data)
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
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
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
.filter-item {
  margin-bottom: 5px;
}
</style>
