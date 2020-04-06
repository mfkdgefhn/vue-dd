import Mock from 'mockjs'

const top30 = Mock.mock({
  'data|100': [{
    'dayTop': '@integer(1, 30)',
    'storeName': '@cname(2,5)',
    'dayTotAmtActual': '@integer(1000, 20000)',
    'dayQty': '@integer(10, 1000)',
    'dayAvgPrice': '@integer(70, 300)',
    'monTotAmtActual': '@integer(1000, 20000)',
    'monQty': '@integer(10, 1000)',
    'monAvgPrice': '@integer(70, 300)',
    'yearStorage': '@integer(1000, 5000)',
    'yearStorage1': '@integer(1000, 5000)',
    'yearStorage2': '@integer(1000, 5000)'
  }]
})

const storeDayAvg = Mock.mock({
  'data|50': [{
    'dayTop': '@integer(1, 30)',
    'customer': '@cname(2,5)',
    'dayAvgSale': '@integer(1000, 20000)',
    'dayAvgSum': '@integer(10, 1000)',
    'dayAvgPrice': '@integer(70, 300)',
    'monStoreSum1': '@integer(1000, 20000)',
    'monStoreSum2': '@integer(10, 1000)',
    'increase': '@integer(10, 100)',
    'oldYearDayAvg1': '@integer(1000, 5000)',
    'olgYearDayAvg2': '@integer(1000, 5000)',
    'oldDayAvgIncrease1': '@integer(1000, 5000)',
    'oldDayAvg1': '@integer(1000, 5000)',
    'oldDayAvg2': '@integer(1000, 5000)',
    'oldDayAvgIncrease2': '@integer(1000, 5000)'
  }]
})

const retailShare = Mock.mock({
  'data|50': [{
    'area': '@region',
    'customer': '@cname(2,5)',
    'newSalesShare': '@float(60, 100, 2, 2)',
    'newAvgPrice': '@integer(80, 200)',
    'newInventoryRatio': '@float(60, 100, 2, 2)',
    'newStoreVolume': '@integer(1000, 2000)',
    'oldSalesShare': '@float(60, 100, 2, 2)',
    'oldAvgPrice': '@integer(80, 200)',
    'oldInventoryRatio': '@float(60, 100, 2, 2)',
    'oldStoreVolume': '@integer(1000, 2000)'
  }]
})

const inSaleStorage = Mock.mock({
  'data|50': [{
    'area': '@region',
    'customer': '@cname(2,5)',
    'outGoodsCount': '@integer(80, 200)',
    'surplusGoodsCount': '@integer(80, 200)',
    'wholesaleCount': '@integer(80, 200)',
    'retailCount': '@integer(1000, 2000)',
    'unitPrice': '@integer(80, 200)',
    'wholeSaleRate': '@float(60, 100, 2, 2)',
    'grossMarginRate': '@float(60, 100, 2, 2)',
    'storage': '@integer(100, 200)',
    'allStorage': '@integer(200, 400)',
    'storeNum': '@integer(100, 200)',
    'storeStorage': '@integer(100, 200)'
  }]
})

export default [
  {
    url: '/table/getTop30',
    type: 'get',
    response: config => {
      const items = top30.data
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/getStoreDayAvg',
    type: 'get',
    response: config => {
      const items = storeDayAvg.data
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/getRetailShare',
    type: 'get',
    response: config => {
      const items = retailShare.data
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/getInSaleStorage',
    type: 'get',
    response: config => {
      const items = inSaleStorage.data
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }

]

