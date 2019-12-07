<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2019-11-21 10:17:55
 :style="backgroundColor"
 -->
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

      <!-- 店仓 -->
      <!-- <el-col :md="5" :sm="8" :xs="12">
        <el-cascader
          v-model="listQuery.storeId"
          placeholder="店仓"
          :options="options"
          :show-all-levels="showAllLevels"
          :props="props"
          style="width:100%"
          collapse-tags
          clear-checked-nodes
        />
      </el-col>-->
      <!-- 经销商、店仓 -->
      <el-col :md="5" :sm="8" :xs="12">
        <el-cascader
          v-model="listQuery.storeIds"
          placeholder="店仓"
          :props="props"
          collapse-tags
          :show-all-levels="false"
          clear-checked-nodes
          style="width:100%"
        />
      </el-col>

      <!-- 年份 -->
      <el-col :md="4" :sm="8" :xs="12">
        <el-select
          v-model="listQuery.year"
          multiple
          clearable
          collapse-tags
          style="width:100%"
          placeholder="款号年份"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>

      <!-- 季节 -->
      <el-col :md="4" :sm="8" :xs="12">
        <el-select
          v-model="listQuery.season"
          style="width:100%"
          multiple
          clearable
          collapse-tags
          placeholder="款号季节"
        >
          <el-option
            v-for="item in seasonOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
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
        >搜索</el-button>
      </el-col>

      <!-- 提示信息 -->
      <!-- <el-col :md="1" :sm="1" :xs="1">
        <el-button type="primary" icon="el-icon-message" circle @click="showMessage" />
      </el-col>-->
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
import { getStore } from '@/api/gmqApi' // , getYear,getSeason,getCustomer,

export default {
  name: 'Search',
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: 'background-color:rgba(78,143,223,0);'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAllLevels: false,
      props: {
        multiple: true,
        value: 'id',
        label: 'name',
        // 通过lazy开启动态加载，并通过lazyload来设置加载数据源的方法。
        // lazyload方法有两个参数，第一个参数node为当前点击的节点，第二个resolve为数据加载完成的回调(必须调用)。
        // 为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为leaf，可通过props.leaf修改)，
        // 否则会简单的以有无子节点来判断是否为叶子节点
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level < 2) {
            setTimeout(() => {
              if (node.level === 0) {
                this.$store.dispatch('baseApi/getCustomer').then(() => {
                  const areas = this.$store.getters.customer.map((value, i) => ({
                    id: value.id,
                    name: value.name,
                    leaf: node.level >= 1
                  }))
                  resolve(areas)
                })
              } else if (node.level === 1) {
                getStore({ customerId: node.value }).then(response => {
                  const areas = response.map((value, i) => ({
                    id: value.id,
                    name: value.name,
                    leaf: node.level >= 1
                  }))
                  resolve(areas)
                })
              }
            }, 200)
          }
          resolve()
        }
      },
      listQuery: {
        beginDate: this.getDateStr(-7),
        endDate: this.getDateStr(-1),
        storeIds: [],
        loading: false
      },
      // year: [],
      // season: [],
      // yearOptions: [],
      // seasonOptions: [],
      storeOptions: [],
      restaurants: [],
      dialogVisible: false
    }
  },
  computed: {
    // options() {
    //   return this.$store.getters.store
    // },
    yearOptions() {
      return this.$store.getters.year
    },
    seasonOptions() {
      return this.$store.getters.season
    }
  },
  watch: {
  },
  created() {
    this.$store.dispatch('baseApi/getYear')
    this.$store.dispatch('baseApi/getSeason')
  },
  mounted() {
    // this.init()
  },
  methods: {
    // 初始化
    init() {
      // this.$store.dispatch('baseApi/getYear').then(() => {
      //   this.year = this.$store.getters.year
      // })
      // this.$store.dispatch('baseApi/getSeason').then(() => {
      //   this.season = this.$store.getters.season
      // })
      // getYear().then(response => {
      //   this.yearOptions = response.result
      // })
      // 季节
      // getSeason().then(response => {
      //   this.seasonOptions = response.result
      // })
    },
    // 搜索栏回车事件
    handleFilter() {
      // console.log('回车搜索事件')
      // console.log(this.listQuery)

      var data = Object.assign({}, this.listQuery)
      this.handle(data)
      // console.log(data)
      this.$emit('getAnalysis', data)
    },
    handle(data) {
      if (data.year.length > 0) data.year = data.year.join(',') // 年份数组转字符串
      if (data.season.length > 0) data.season = data.season.join(',') // 季节数组转字符串
      // 时间转换
      if (!data.beginDate) {
        if (data.endDate) {
          data.jzDate = data.endDate
          data.endDate = null
        }
      }
      if (!data.endDate) {
        if (data.beginDate) {
          data.qsDate = data.beginDate
          data.beginDate = null
        }
      }
      if (!data.beginDate && !data.endDate) {
        data.beginDate = 20180101
        data.endDate = this.getDateStr(-1)
      }
      // 店仓转换
      if (data.storeIds.length > 0) {
        var arr = []
        data.storeIds.forEach(element => {
          arr.push(element[1])
        })
        data.storeIds = arr.join(',')
      }
    },
    // 刷新事件
    refresh() {
      console.log('刷新')
    },
    getDateStr(count) {
      var dd = new Date()
      dd.setDate(dd.getDate() + count)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      return '' + y + m + d
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    showMessage() {
      // console.log('显示信息')
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
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
</style>
