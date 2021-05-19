<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 13:45:01
 * @LastEditors: anan
 * @LastEditTime: 2019-10-11 16:55:18
 -->
<template>
  <div class="table-data" />
</template>

<script>

export default {
  data() {
    return {
      tableData: [],
      showHeader: false
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      for (var i = 0; i < 4; i++) {
        var data = {}
        data.name = 'name' + i
        data.sex = 'sex' + i
        data.age = 'age' + i
        this.tableData.push(data)
      }
    },
    rowClassName({ row, rowIndex }) {
      return 'row-style'
    }
  }
}
</script>

<style scoped>
.table-data {
  height: 100%;
}
.mytable-style {
  border: 1px solid #242640;
}
.vxe-body--row {
  background: #242640;
}
</style>
