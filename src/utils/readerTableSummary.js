/**
 *   // 合计行 方法计算方式
 */
export function tableSummary({ columns, data }) {
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '汇总'
      return
    }
    if (index === 1) {
      sums[index] = '全国'
      return
    }
    if (index === 2) { // 当日店均业绩
      const values = data.map(item => Number(item.dayAvgSale))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 3) { // 其中：店均销售
      const values = data.map(item => Number(item.dayRetailAvgSale))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 4) { // 其中：店均充值
      const values = data.map(item => Number(item.dayRechargeAvgSale))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value) && value !== 0) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 5) { // 当日店均销量
      const values = data.map(item => Number(item.dayAvgSum))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 6) { // 当日店均单价
      const values = data.map(item => Number(item.dayAvgPrice))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 7) { // 20年当月累计单店日均总业绩
      const values = data.map(item => Number(item.monStoreSum1))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 8) { // 其中：累计单店日均销售
      const values = data.map(item => Number(item.monStoreSum11))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 9) { // 其中：累计单店日均充值
      const values = data.map(item => Number(item.monStoreSum12))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value) && value !== 0) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 10) { // 19年当月累计单店日均业绩
      const values = data.map(item => Number(item.monStoreSum2))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 11) { // 增长
      const values = data.map(item => Number(item.increase))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 12) { // 20年当月累计老店日均总业绩
      const values = data.map(item => Number(item.oldYearDayAvg1))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 13) { // 其中：累计老店日均销售
      const values = data.map(item => Number(item.oldYearDayAvg11))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 14) { // 其中：累计老店日均充值
      const values = data.map(item => Number(item.oldYearDayAvg12))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value) && value !== 0) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 15) { // 19年老店日均总业绩
      const values = data.map(item => Number(item.oldYearDayAvg2))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 16) { // 日均增长
      const values = data.map(item => Number(item.oldDayAvgIncrease1))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 17) { // 20年当日店均总业绩
      const values = data.map(item => Number(item.oldDayAvg1))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 18) { // 其中：当日店均销售
      const values = data.map(item => Number(item.oldDayAvg11))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 19) { // 其中：当日店均充值
      const values = data.map(item => Number(item.oldDayAvg12))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value) && value !== 0) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 20) { // 19年当日店均总业绩
      const values = data.map(item => Number(item.oldDayAvg2))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    } else if (index === 21) { // 日均增长
      const values = data.map(item => Number(item.oldDayAvgIncrease2))
      let rn = 0
      const total = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          rn++
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = rn === 0 ? 0 : parseInt(total / rn)
    }
  })
  return sums
}
