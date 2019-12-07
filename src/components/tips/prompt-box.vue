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
    <span v-html="tipsData" />
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
      type: String,
      default: ''
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
    tips(val) {
      console.log(val)
    }
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
