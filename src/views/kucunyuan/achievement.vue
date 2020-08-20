<template>
  <div class="kucunyuan">
    <el-card shadow="hover" class="crad">
      <el-table v-loading="loading" show-summary :data="tableData" class="kucunyuan-table">
        <el-table-column prop="rn" label="排序" align="center" />
        <el-table-column prop="name" label="江西达成" align="center" />
        <el-table-column prop="target" label="目标" align="center" />
        <el-table-column prop="sales" label="销售" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Kucunyuan',
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  created() {
    console.log('这里')
    this.loading = true
    setTimeout(() => {
      this.tableData = [
        { yearSeason: '19春', purchase: '105236', sellOut: '98.8%', surplusGoods: '0', storehouse: '564', store: '702', qtyJx: '5', amountJx: '550', qtyWz: '1', amountWz: '100', sale: '16576', retail: '87394' },
        { yearSeason: '19夏', purchase: '105597', sellOut: '95.6%', surplusGoods: '0', storehouse: '875', store: '3820', qtyJx: '26', amountJx: '2700', qtyWz: '12', amountWz: '1096', sale: '15087', retail: '85815' },
        { yearSeason: '19秋', purchase: '59306', sellOut: '88.0%', surplusGoods: '0', storehouse: '2281', store: '4827', qtyJx: '21', amountJx: '3012', qtyWz: '6', amountWz: '859', sale: '5424', retail: '46774' },
        { yearSeason: '19冬', purchase: '102253', sellOut: '79.8%', surplusGoods: '0', storehouse: '13803', store: '6824', qtyJx: '0', amountJx: '0', qtyWz: '0', amountWz: '0', sale: '9146', retail: '72480' },
        { yearSeason: '20春', purchase: '62782', sellOut: '65.6%', surplusGoods: '300', storehouse: '4185', store: '17123', qtyJx: '68', amountJx: '13423', qtyWz: '36', amountWz: '6107', sale: '8492', retail: '32682' },
        { yearSeason: '20夏', purchase: '106737', sellOut: '51.0%', surplusGoods: '0', storehouse: '3052', store: '49284', qtyJx: '363', amountJx: '64442', qtyWz: '196', amountWz: '32378', sale: '13053', retail: '41348' },
        { yearSeason: '20秋', purchase: '27227', sellOut: '11.6%', surplusGoods: '13170', storehouse: '4437', store: '6456', qtyJx: '29', amountJx: '6921', qtyWz: '31', amountWz: '6002', sale: '1529', retail: '1635' }
      ]
      this.loading = false
    }, 3000)
  }
}
</script>

<style  lang="scss" scoped>
.kucunyuan {
  margin: 10px;
}
.kucunyuan-table {
  margin: 0 auto;
}
// 深度设定样式
// /deep/ .el-card__body {
//   padding: 0px;
// }
.crad {
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
