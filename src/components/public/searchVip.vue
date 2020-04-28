<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col>
        <el-select
          class="price-class"
          v-if="menuProperty.menus[0].checked"
          v-model="listQuery.selectDate"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in menuProperty.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>

        <!-- 经销商选择 -->
        <el-select
          v-if="menuProperty.menus[1].checked"
          v-model="listQuery.customer"
          class="price-class"
          style="width: 200px;"
          multiple
          clearable
          collapse-tags
          placeholder="经销商"
          @change="selectCustomer"
        >
          <el-option
            v-for="item in menuProperty.customers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>

        <!-- 店仓选择 -->
        <el-select
          v-if="menuProperty.menus[11].checked"
          v-model="listQuery.store"
          class="price-class"
          style="width: 200px;"
          filterable
          remote
          multiple
          clearable
          collapse-tags
          :remote-method="remoteMethod"
          :loading="loadingStore"
          placeholder="店仓"
        >
          <el-option
            v-for="item in menuProperty.stores"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>

        <!-- 价格区间 -->
        <el-input
          v-if="menuProperty.menus[2].checked"
          v-model="listQuery.minPrice"
          class="price-class"
          type="tel"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="4"
          placeholder="低价"
        ></el-input>
        <span v-if="menuProperty.menus[2].checked" style="line-height:38px; color:#ccc;">至</span>
        <el-input
          v-if="menuProperty.menus[2].checked"
          v-model="listQuery.maxPrice"
          class="price-class"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="4"
          type="tel"
          placeholder="高价"
        ></el-input>

        <!-- 风格选择 -->
        <el-select
          v-if="menuProperty.menus[3].checked"
          v-model="listQuery.mid8"
          class="price-class"
          multiple
          clearable
          collapse-tags
          placeholder="风格"
        >
          <el-option
            v-for="item in menuProperty.mid8s"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>

        <!-- 颜色选择 -->
        <el-input
          v-if="menuProperty.menus[4].checked"
          class="price-class"
          v-model="listQuery.color"
          placeholder="颜色"
        ></el-input>

        <!-- 尺码 -->
        <el-select
          v-if="menuProperty.menus[5].checked"
          v-model="listQuery.size"
          class="price-class"
          multiple
          clearable
          collapse-tags
          placeholder="尺码"
        >
          <el-option
            v-for="item in menuProperty.sizes"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>

        <!-- 折扣区间 -->
        <el-input
          v-if="menuProperty.menus[6].checked"
          v-model="listQuery.minDiscount"
          class="price-class"
          type="tel"
          placeholder="最低折扣"
        ></el-input>
        <span v-if="menuProperty.menus[6].checked" style="line-height:38px; color:#ccc;">至</span>
        <el-input
          v-if="menuProperty.menus[6].checked"
          v-model="listQuery.maxDiscount"
          class="price-class"
          type="tel"
          placeholder="最高折扣"
        ></el-input>

        <!-- 剩余积分 -->
        <el-input
          v-if="menuProperty.menus[7].checked"
          class="price-class"
          type="tel"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="5"
          v-model="listQuery.integral"
          placeholder="积分"
        ></el-input>

        <!-- 双数选择 -->
        <el-input
          v-if="menuProperty.menus[8].checked"
          class="price-class"
          v-model="listQuery.double"
          type="tel"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          maxlength="1"
          placeholder="双数"
        ></el-input>

        <!-- 季节选择 -->
        <el-select
          v-if="menuProperty.menus[9].checked"
          v-model="listQuery.mid9"
          class="price-class"
          multiple
          clearable
          collapse-tags
          placeholder="季节"
        >
          <el-option
            v-for="item in menuProperty.mid9s"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>

        <!-- 卡类型选择 -->
        <el-select
          v-if="menuProperty.menus[10].checked"
          v-model="listQuery.vipType"
          class="price-class"
          multiple
          clearable
          collapse-tags
          placeholder="卡类型"
        >
          <el-option
            v-for="item in menuProperty.vipTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>

      <el-col>
        <!-- 搜索按钮 -->
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >{{title}}</el-button>

        <!-- 查询全部菜单 -->
        <el-dropdown :hide-on-click="false" class="menu-right">
          <el-button type="primary" class="el-dropdown-link">
            查询菜单
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item v-for="i in menuProperty.menus" :key="i.id">
              <el-checkbox v-model="i.checked" :disabled="i.disabled">{{i.name}}</el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 导出数据 -->
        <el-dropdown class="menu-right" @command="handleCommand">
          <el-button type="primary">
            导出
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item command="pageExcel">单页导出(EXCEL)</el-dropdown-item>
            <el-dropdown-item command="allExcel">全部导出(EXCEL)</el-dropdown-item>
            <el-dropdown-item command="allZip">全部导出(ZIP)</el-dropdown-item>
            <el-dropdown-item command="allPdf">导出PDF</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <i class="el-icon-warning menu-icon" @click="tipsInfo" />
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
import { getDateStr } from '@/utils/times'
import waves from '@/directive/waves' // waves directive
import { isEmpty } from '@/utils/string'
import promptBox from '@/components/tips/prompt-box'


export default {
  name: "SearchVip",
  directives: { waves },
  components: {
    promptBox
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingStore: false,
      dialogVisible: false,
      // 标题
      title: '会员挖掘',
      // 提示信息
      tipsData: [
        {
          name: '经销商',
          description: '一级客户信息'
        },
        {
          name: '开卡店仓',
          description: '店仓'
        },
        {
          name: '会员卡号',
          description: '会员号'
        },
        {
          name: '会员卡类别',
          description: '会员所属类别'
        },
      ],
      // 菜单属性
      menuProperty: {
        // 菜单
        /**
         * id:基本没用
         * checked:控制是否显示
         * value:菜单字段名
         * name:菜单名称
         * disabled:是否禁用
         */
        menus: [
          { id: 1, checked: true, value: 'selectDate', name: '时间', disabled: true },
          { id: 2, checked: true, value: 'customer', name: '经销商', disabled: true },
          { id: 3, checked: true, value: 'price', name: '价格区间', disabled: false },
          { id: 4, checked: true, value: 'mid8', name: '风格', disabled: false },
          { id: 5, checked: false, value: 'color', name: '颜色', disabled: false },
          { id: 6, checked: false, value: 'size', name: '尺码', disabled: false },
          { id: 7, checked: false, value: 'discount', name: '折扣', disabled: false },
          { id: 8, checked: false, value: 'integral', name: '积分', disabled: false },
          { id: 9, checked: false, value: 'double', name: '双数', disabled: false },
          { id: 10, checked: false, value: 'mid9', name: '季节', disabled: false },
          { id: 11, checked: false, value: 'vipType', name: '卡类型', disabled: false },
          { id: 12, checked: false, value: 'store', name: '店仓', disabled: true }
        ],
        // 查询时间选择
        options: [
          {
            value: getDateStr(-7),
            label: '1周内未零售会员',
            disabled: true
          }, {
            value: getDateStr(-31),
            label: '1月内未零售会员'
          }, {
            value: getDateStr(-61),
            label: '2月内未零售会员'
          }, {
            value: getDateStr(-91),
            label: '1季度内未零售会员'
          }, {
            value: getDateStr(-183),
            label: '半年内未零售会员'
          }, {
            value: getDateStr(-365),
            label: '1年内未零售会员'
          }],
        // 经销商
        customers: [],
        // 风格
        mid8s: [],
        sizes: [
          { id: '00', value: '均码' },
          { id: '33', value: '33' },
          { id: '34', value: '34' },
          { id: '35', value: '35' },
          { id: '36', value: '36' },
          { id: '37', value: '37' },
          { id: '38', value: '38' },
          { id: '39', value: '39' },
          { id: '40', value: '40' }
        ],
        // 季节
        mid9s: [
          { id: 37, value: '春季' },
          { id: 38, value: '夏季' },
          { id: 39, value: '秋季' },
          { id: 40, value: '冬季' },
          { id: 666, value: '其他' },
        ],
        stores: [],
        // 卡类型
        vipTypes: [],
        // 折扣
        discounts: [
          {
            id: '', value: ''
          }
        ]
      },
      listQuery: {
        selectDate: getDateStr(-31),
        loading: false
      },

    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 经销商档案
      this.$store.dispatch("baseApi/getCustomer").then(() => {
        this.menuProperty.customers = this.$store.getters.customer
      });
      // 款号风格
      this.$store.dispatch("baseApi/getProductStyle").then(() => {
        this.menuProperty.mid8s = this.$store.getters.productStyle
      });
      // VIP卡类型
      this.$store.dispatch("baseApi/getVipType").then(() => {
        this.menuProperty.vipTypes = this.$store.getters.vipType
      });
      // 会员挖掘店仓信息
      this.$store.dispatch("baseApi/getHywjStores")
    },
    // 搜索栏回车事件
    handleFilter() {
      if (isEmpty(this.listQuery.selectDate)) {
        this.$message.error("你未设置月份，这将无法挖掘数据!!!")
        return
      }
      if (this.judgePrice(this.listQuery)) {
        this.$message.error("最小值超过最大值，请重新输入！")
        return
      }
      if (this.judgeDiscount(this.listQuery)) {
        this.$message.error("折扣区间要在0.01-1.00之间，请修改!")
        return
      }
      if (isEmpty(this.listQuery.customer.length) && (isEmpty(this.listQuery.minPrice) && isEmpty(this.listQuery.maxPrice))) {
        this.$message.error("查询数据过十万，请输入查询参数！！！")
        return
      }
      var data = Object.assign({}, this.listQuery)
      // 对查询参数进行转换
      this.handle(data)
      this.$emit('getAnalysis', data)
    },
    // 过滤查询参数
    handle(data) {
      // 过滤掉查询参数中未显示的查询字段
      for (let index = 0; index < this.menuProperty.menus.length; index++) {
        if (!this.menuProperty.menus[index].checked) {
          if (this.menuProperty.menus[index].value === 'price') {
            delete data[this.menuProperty.menus[index].minPrice]
            delete data[this.menuProperty.menus[index].maxPrice]
          } else {
            delete data[this.menuProperty.menus[index].value]
          }
        }
      }

      // 将过滤掉后的查询参数为数组的转换成字符串
      for (const key in data) {
        if (typeof data[key] === 'object') {
          if (data[key].length > 0) {
            data[key] = data[key].join(",");
          } else {
            delete data[key]
          }
        } else {
          if (key === 'minPrice' || key === 'maxPrice' || key === 'integral' || key === 'double') {
            data[key] = parseInt(data[key])
          } else if (key === 'minDiscount' || key === 'maxDiscount') {
            data[key] = parseFloat(data[key])
          }
        }
        if (isNaN(data[key]) && typeof data[key] === 'string' && data[key].length === undefined) {
          delete data[key]
        }
      }
    },
    // 判断价格值
    judgePrice(data) {
      if (!data.minPrice) return false
      else {
        if (!data.maxPrice) return false
        else return parseInt(data.minPrice) > parseInt(data.maxPrice) ? true : false
      }
    },
    // 判断折扣率
    judgeDiscount(data) {
      if (!data.minDiscount) return false
      else {
        if (!data.maxDiscount) {
          return parseFloat(data.minDiscount) < 0.01 || parseFloat(data.minDiscount) > 1.0 ? true : false
        } else {
          return parseFloat(data.minDiscount) > parseFloat(data.maxDiscount) ? true :
            parseFloat(data.minDiscount) > 1.0 ? true :
              parseFloat(data.maxDiscount) < 0.01 ? true : false
        }
      }
    },
    // 经销商选择后，
    selectCustomer(val) {
      if (val.length > 0) this.menuProperty.menus[11].checked = true
      this.$store.dispatch("baseApi/getHywjStores", { 'customerId': this.listQuery.customer.join(",") })

      this.menuProperty.vipTypes = []
      //更新会员卡类型与店仓
      this.$store.getters.vipType.forEach(element => {
        val.forEach(customer => {
          if (customer === element.cCustomerId) {
            this.menuProperty.vipTypes.push(element)
          }
        });
      });
    },
    // 店仓选择后的结果
    remoteMethod(query) {
      this.loadingStore = true;
      let store = this.$store.getters.hywjStores
      if (query !== '') {
        setTimeout(() => {
          this.loadingStore = false;
          this.menuProperty.stores = store.filter(item => {
            return item.name.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.loadingStore = false;
        this.menuProperty.stores = store
      }
    },
    // 导出
    handleCommand(val) {
      this.$emit('handleDownload', val)
    },
    // 提示
    tipsInfo(str) {
      this.dialogVisible = !this.dialogVisible
    },
    handleClose(done) {
      this.dialogVisible = !this.dialogVisible
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
.price-class {
  width: 150px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.el-dropdown-link {
  margin-left: 10px;
  cursor: pointer;
}
.menu-right {
  float: right;
  margin-right: 10px;
}
.menu-icon {
  float: right;
  padding-top: 10px;
  padding-right: 10px;
  margin-right: 10px;
  border: 0px solid;
  color: #409eff;
  font-size: 25px;
}
.menu-icon:hover {
  color: #66b1ff;
}
.el-select__tags {
  white-space: nowrap;
  overflow: hidden;
}
</style>
