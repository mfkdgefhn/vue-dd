<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-12-07 10:55:15
 * @LastEditors: anan
 * @LastEditTime: 2019-12-07 15:31:47
 -->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
    custom-class="dialog-class"
    center
  >
    <span slot="title" v-html="title" />
    <el-table v-loading="loading" :data="tipsData" style="width: 100%">
      <el-table-column property="billdate" label="单据日期" />
      <el-table-column property="cStoreName" label="店仓" />
      <el-table-column property="docno" label="单据编号" />
      <el-table-column property="mProductName" label="款号" />
      <el-table-column property="totAmtActual" label="价格" />
      <el-table-column property="attribname" label="风格" />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tipsData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
    handleClose(done) {
      this.$emit('handleClose', false)
    }
  }
}
</script>

<style scoped>
span {
  font-size: 16px;
  line-height: 40px;
}
</style>

<style>
.dialog-class .el-dialog__body {
  padding: 10px 20px;
  text-align: center;
}
</style>
