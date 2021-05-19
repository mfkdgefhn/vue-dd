<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-11-23 08:50:21
 * @LastEditors: anan
 * @LastEditTime: 2019-11-23 09:30:12
 -->
<template>
  <div>
    {{ listQuery }}
    <div />
    <el-button @click="test">按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test1: 1

    }
  },
  computed: {
    listQuery() {
      return this.$store.getters.listQuery
    }
  },
  watch: {
    listQuery(oldv, newv) {
      console.log('前' + oldv)
      console.log('后' + newv)
    }
  },
  mounted() {
    this.$store.dispatch('baseApi/setMonths', '测试' + this.test1)
  },
  methods: {
    test() {
      console.log('测试')
      ++this.test1
      this.$store.dispatch('baseApi/setMonths', '测试' + this.test1)
      console.log(this.$store.getters.listQuery)
    }
  }
}
</script>
