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
    :title="title"
    width="50%"
    :before-close="handleClose"
    custom-class="dialog-class"
  >
    <!-- <span v-html="tipsData" /> -->
    <el-table :data="tipsData">
      <el-table-column property="name" label="字段名" width="150" />
      <el-table-column property="description" label="字段说明" />
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
}
</style>
