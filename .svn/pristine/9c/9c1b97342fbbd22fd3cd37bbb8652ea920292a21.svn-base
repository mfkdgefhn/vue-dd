<!--
 * @Description: 地图
 * @Author: anan
 * @Date: 2019-09-28 15:18:15
 * @LastEditors: anan
 * @LastEditTime: 2019-11-26 13:36:21
 -->
<template>
  <div id="echarts" ref="echartsMap">
    <div ref="myChartMap" :style="vStyle" />
  </div>
</template>

<script>
import 'echarts/map/js/china.js' // 引入中国地图数据
// import { cityMap } from '@/assets/geoJson/china-main-city/china-main-city-map.js'// 引入区县地图
import cityMap from '@/assets/geoJson/china-main-city/china-main-city-map.js' // 引入区县地图
// import china from 'echarts/map/js/china.js' // 引入中国地图数据

// import { getProvinceData, getCityData } from '@/api/gmqApi'

import { getProvince } from '@/utils/map.js' // getCity
import echarts from 'echarts'

import dayjs from 'dayjs' // 时间格式

export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    bigData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      vStyle: 'width: auto;height: 100%',
      provinces: ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'],
      provincesText: ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏',
        '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东',
        '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海',
        '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
      genJson: {},
      directlyCity: ['北京', '上海', '重庆', '天津'],
      cityMap: {
        '北京市': '110100',
        '天津市': '120100',
        '上海市': '310100',
        '重庆市': '500100',
        '崇明县': '310200', // ??
        '湖北省直辖县市': '429000', // ??
        '铜仁市': '522200', // ??
        '毕节市': '522400', // ??
        '石家庄市': '130100',
        '唐山市': '130200',
        '秦皇岛市': '130300',
        '邯郸市': '130400',
        '邢台市': '130500',
        '保定市': '130600',
        '张家口市': '130700',
        '承德市': '130800',
        '沧州市': '130900',
        '廊坊市': '131000',
        '衡水市': '131100',
        '太原市': '140100',
        '大同市': '140200',
        '阳泉市': '140300',
        '长治市': '140400',
        '晋城市': '140500',
        '朔州市': '140600',
        '晋中市': '140700',
        '运城市': '140800',
        '忻州市': '140900',
        '临汾市': '141000',
        '吕梁市': '141100',
        '呼和浩特市': '150100',
        '包头市': '150200',
        '乌海市': '150300',
        '赤峰市': '150400',
        '通辽市': '150500',
        '鄂尔多斯市': '150600',
        '呼伦贝尔市': '150700',
        '巴彦淖尔市': '150800',
        '乌兰察布市': '150900',
        '兴安盟': '152200',
        '锡林郭勒盟': '152500',
        '阿拉善盟': '152900',
        '沈阳市': '210100',
        '大连市': '210200',
        '鞍山市': '210300',
        '抚顺市': '210400',
        '本溪市': '210500',
        '丹东市': '210600',
        '锦州市': '210700',
        '营口市': '210800',
        '阜新市': '210900',
        '辽阳市': '211000',
        '盘锦市': '211100',
        '铁岭市': '211200',
        '朝阳市': '211300',
        '葫芦岛市': '211400',
        '长春市': '220100',
        '吉林市': '220200',
        '四平市': '220300',
        '辽源市': '220400',
        '通化市': '220500',
        '白山市': '220600',
        '松原市': '220700',
        '白城市': '220800',
        '延边朝鲜族自治州': '222400',
        '哈尔滨市': '230100',
        '齐齐哈尔市': '230200',
        '鸡西市': '230300',
        '鹤岗市': '230400',
        '双鸭山市': '230500',
        '大庆市': '230600',
        '伊春市': '230700',
        '佳木斯市': '230800',
        '七台河市': '230900',
        '牡丹江市': '231000',
        '黑河市': '231100',
        '绥化市': '231200',
        '大兴安岭地区': '232700',
        '南京市': '320100',
        '无锡市': '320200',
        '徐州市': '320300',
        '常州市': '320400',
        '苏州市': '320500',
        '南通市': '320600',
        '连云港市': '320700',
        '淮安市': '320800',
        '盐城市': '320900',
        '扬州市': '321000',
        '镇江市': '321100',
        '泰州市': '321200',
        '宿迁市': '321300',
        '杭州市': '330100',
        '宁波市': '330200',
        '温州市': '330300',
        '嘉兴市': '330400',
        '湖州市': '330500',
        '绍兴市': '330600',
        '金华市': '330700',
        '衢州市': '330800',
        '舟山市': '330900',
        '台州市': '331000',
        '丽水市': '331100',
        '合肥市': '340100',
        '芜湖市': '340200',
        '蚌埠市': '340300',
        '淮南市': '340400',
        '马鞍山市': '340500',
        '淮北市': '340600',
        '铜陵市': '340700',
        '安庆市': '340800',
        '黄山市': '341000',
        '滁州市': '341100',
        '阜阳市': '341200',
        '宿州市': '341300',
        '六安市': '341500',
        '亳州市': '341600',
        '池州市': '341700',
        '宣城市': '341800',
        '福州市': '350100',
        '厦门市': '350200',
        '莆田市': '350300',
        '三明市': '350400',
        '泉州市': '350500',
        '漳州市': '350600',
        '南平市': '350700',
        '龙岩市': '350800',
        '宁德市': '350900',
        '南昌市': '360100',
        '景德镇市': '360200',
        '萍乡市': '360300',
        '九江市': '360400',
        '新余市': '360500',
        '鹰潭市': '360600',
        '赣州市': '360700',
        '吉安市': '360800',
        '宜春市': '360900',
        '抚州市': '361000',
        '上饶市': '361100',
        '济南市': '370100',
        '青岛市': '370200',
        '淄博市': '370300',
        '枣庄市': '370400',
        '东营市': '370500',
        '烟台市': '370600',
        '潍坊市': '370700',
        '济宁市': '370800',
        '泰安市': '370900',
        '威海市': '371000',
        '日照市': '371100',
        '莱芜市': '371200',
        '临沂市': '371300',
        '德州市': '371400',
        '聊城市': '371500',
        '滨州市': '371600',
        '菏泽市': '371700',
        '郑州市': '410100',
        '开封市': '410200',
        '洛阳市': '410300',
        '平顶山市': '410400',
        '安阳市': '410500',
        '鹤壁市': '410600',
        '新乡市': '410700',
        '焦作市': '410800',
        '濮阳市': '410900',
        '许昌市': '411000',
        '漯河市': '411100',
        '三门峡市': '411200',
        '南阳市': '411300',
        '商丘市': '411400',
        '信阳市': '411500',
        '周口市': '411600',
        '驻马店市': '411700',
        '省直辖县级行政区划': '469000',
        '武汉市': '420100',
        '黄石市': '420200',
        '十堰市': '420300',
        '宜昌市': '420500',
        '襄阳市': '420600',
        '鄂州市': '420700',
        '荆门市': '420800',
        '孝感市': '420900',
        '荆州市': '421000',
        '黄冈市': '421100',
        '咸宁市': '421200',
        '随州市': '421300',
        '恩施土家族苗族自治州': '422800',
        '长沙市': '430100',
        '株洲市': '430200',
        '湘潭市': '430300',
        '衡阳市': '430400',
        '邵阳市': '430500',
        '岳阳市': '430600',
        '常德市': '430700',
        '张家界市': '430800',
        '益阳市': '430900',
        '郴州市': '431000',
        '永州市': '431100',
        '怀化市': '431200',
        '娄底市': '431300',
        '湘西土家族苗族自治州': '433100',
        '广州市': '440100',
        '韶关市': '440200',
        '深圳市': '440300',
        '珠海市': '440400',
        '汕头市': '440500',
        '佛山市': '440600',
        '江门市': '440700',
        '湛江市': '440800',
        '茂名市': '440900',
        '肇庆市': '441200',
        '惠州市': '441300',
        '梅州市': '441400',
        '汕尾市': '441500',
        '河源市': '441600',
        '阳江市': '441700',
        '清远市': '441800',
        '东莞市': '441900',
        '中山市': '442000',
        '潮州市': '445100',
        '揭阳市': '445200',
        '云浮市': '445300',
        '南宁市': '450100',
        '柳州市': '450200',
        '桂林市': '450300',
        '梧州市': '450400',
        '北海市': '450500',
        '防城港市': '450600',
        '钦州市': '450700',
        '贵港市': '450800',
        '玉林市': '450900',
        '百色市': '451000',
        '贺州市': '451100',
        '河池市': '451200',
        '来宾市': '451300',
        '崇左市': '451400',
        '海口市': '460100',
        '三亚市': '460200',
        '三沙市': '460300',
        '成都市': '510100',
        '自贡市': '510300',
        '攀枝花市': '510400',
        '泸州市': '510500',
        '德阳市': '510600',
        '绵阳市': '510700',
        '广元市': '510800',
        '遂宁市': '510900',
        '内江市': '511000',
        '乐山市': '511100',
        '南充市': '511300',
        '眉山市': '511400',
        '宜宾市': '511500',
        '广安市': '511600',
        '达州市': '511700',
        '雅安市': '511800',
        '巴中市': '511900',
        '资阳市': '512000',
        '阿坝藏族羌族自治州': '513200',
        '甘孜藏族自治州': '513300',
        '凉山彝族自治州': '513400',
        '贵阳市': '520100',
        '六盘水市': '520200',
        '遵义市': '520300',
        '安顺市': '520400',
        '黔西南布依族苗族自治州': '522300',
        '黔东南苗族侗族自治州': '522600',
        '黔南布依族苗族自治州': '522700',
        '昆明市': '530100',
        '曲靖市': '530300',
        '玉溪市': '530400',
        '保山市': '530500',
        '昭通市': '530600',
        '丽江市': '530700',
        '普洱市': '530800',
        '临沧市': '530900',
        '楚雄彝族自治州': '532300',
        '红河哈尼族彝族自治州': '532500',
        '文山壮族苗族自治州': '532600',
        '西双版纳傣族自治州': '532800',
        '大理白族自治州': '532900',
        '德宏傣族景颇族自治州': '533100',
        '怒江傈僳族自治州': '533300',
        '迪庆藏族自治州': '533400',
        '拉萨市': '540100',
        '昌都地区': '542100',
        '山南地区': '542200',
        '日喀则地区': '542300',
        '那曲地区': '542400',
        '阿里地区': '542500',
        '林芝地区': '542600',
        '西安市': '610100',
        '铜川市': '610200',
        '宝鸡市': '610300',
        '咸阳市': '610400',
        '渭南市': '610500',
        '延安市': '610600',
        '汉中市': '610700',
        '榆林市': '610800',
        '安康市': '610900',
        '商洛市': '611000',
        '兰州市': '620100',
        '嘉峪关市': '620200',
        '金昌市': '620300',
        '白银市': '620400',
        '天水市': '620500',
        '武威市': '620600',
        '张掖市': '620700',
        '平凉市': '620800',
        '酒泉市': '620900',
        '庆阳市': '621000',
        '定西市': '621100',
        '陇南市': '621200',
        '临夏回族自治州': '622900',
        '甘南藏族自治州': '623000',
        '西宁市': '630100',
        '海东地区': '632100',
        '海北藏族自治州': '632200',
        '黄南藏族自治州': '632300',
        '海南藏族自治州': '632500',
        '果洛藏族自治州': '632600',
        '玉树藏族自治州': '632700',
        '海西蒙古族藏族自治州': '632800',
        '银川市': '640100',
        '石嘴山市': '640200',
        '吴忠市': '640300',
        '固原市': '640400',
        '中卫市': '640500',
        '乌鲁木齐市': '650100',
        '克拉玛依市': '650200',
        '吐鲁番地区': '652100',
        '哈密地区': '652200',
        '昌吉回族自治州': '652300',
        '博尔塔拉蒙古自治州': '652700',
        '巴音郭楞蒙古自治州': '652800',
        '阿克苏地区': '652900',
        '克孜勒苏柯尔克孜自治州': '653000',
        '喀什地区': '653100',
        '和田地区': '653200',
        '伊犁哈萨克自治州': '654000',
        '塔城地区': '654200',
        '阿勒泰地区': '654300',
        '自治区直辖县级行政区划': '659000',
        '台湾省': '710000',
        '香港特别行政区': '810100',
        '澳门特别行政区': '820000'
      },
      opentionDate: [],
      min: 0,
      max: 100,
      countryData: [],
      cityData: []
    }
  },
  computed: {
    propsData() {
      return this.bigData
    },
    listQuery() {
      return this.$store.getters.listQuery
    }
  },
  watch: {
    // 根据父组件传进来的值，自动设置高度
    screenHeight(val) {
      this.vStyle = 'width: auto;height: ' + (val * 0.2) + 'px'
    },

    // 只有一个省份的话，则下钻到省份地图
    // 进行判断 地图分为全国->省份数据、省份->城市数据、城市->区县数据，
    // 当查询条件为只有日期，则显示全国,
    // 有省份，则显示城市，
    // 有城市，则显示区县
    propsData(new_value, old_value) {
      const myChart = this.$echarts.init(this.$refs.myChartMap)
      myChart.off('click')
      // 对数据最大值与最小值进行设置
      this.setMaxMin(new_value)

      if (this.listQuery.city) { // 全市
        this.rendering(new_value, 'district')
        var cityName = ''
        // this.listQuery.city从别的组件点击得到的是两个字的城市，在cityName中是找不到的，只能先把city找到先
        for (const key in cityMap) {
          if (key.substring(0, 2) === this.listQuery.city.substring(0, 2)) {
            cityName = key
          }
        }
        if (cityMap[cityName]) {
          // 获取高级json
          this.genJson = require('@/assets/geoJson/china-main-city/' + cityMap[cityName] + '.json')
          echarts.registerMap(cityName, this.genJson) //, s.data
          const option = this.getMapOpt(cityName)
          // 渲染地图数据
          if (option && typeof option === 'object') {
            myChart.setOption(option)
          }
        }
      } else if (this.listQuery.province) { // 全省
        this.rendering(new_value, 'city')
        const index = this.provincesText.findIndex(x => {
          return this.listQuery.province === x
        })
        var provinceCode = this.provinces[index] // 拼音
        var province = this.provincesText[index] // 中文
        // 渲染数据
        // 获取省json
        getProvince(provinceCode, this.genJson)
        // 切换到省地图
        echarts.registerMap(provinceCode, this.genJson)//, s.data
        // 配置地图
        const option = this.getMapOpt(province)
        // 渲染地图数据
        if (option && typeof option === 'object') {
          myChart.setOption(option)
        }
      } else { // 全国
        this.rendering(new_value, 'provinces')
        // 获取地图数据
        const option = this.getMapOpt()
        // 绘制图表
        if (option && typeof option === 'object') {
          myChart.setOption(option)
        }
      }
      this.drawLine()
    }
  },
  methods: {
    // 设置地图参数
    getMapOpt(place) {
      const option = {
        // backgroundColor: '#242640',
        // backgroundColor: 'transparent',
        // 鼠标移到图里面的浮动提示框
        tooltip: {
          // formatter: '{a} <br/>{b} <br/>{c} <br/>{d}' // {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
          formatter: (params) => {
            if (params.data) {
              return params.data.name + '(' + this.listQuery.months + ')<br /> 双数：' + params.data.value + '<br /> 金额：' + params.data.totAmtActual
            }
            return params.name + '(' + this.listQuery.months + ')<br /> 双数：' + 0 + '<br /> 金额：' + 0
          }
        },
        toolbox: {
          // orient: 'vertical',
          left: '3%',
          top: '3%',
          itemSize: 40,
          itemGap: 25,
          feature: {
            myTool1: {
              show: true,
              title: '上月',
              icon: 'image://data:image/png;base64,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',
              onclick: () => {
                const listQuery = this.$store.getters.listQuery
                let months = dayjs(listQuery.months, 'YYYYMM').add(-1, 'month').format('YYYYMM')
                if (months < '201801') months = '201801'
                this.$store.dispatch('baseApi/setMonths', months)
              }
            },
            myTool2: {
              show: true,
              title: '下月',
              icon: 'image://data:image/png;base64,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',
              onclick: () => {
                const mon = dayjs(this.listQuery.months, 'YYYYMM').format('YYYYMM')
                const daymon = dayjs(new Date(), 'YYYYMM').format('YYYYMM')
                if (mon !== daymon) {
                  const listQuery = this.$store.getters.listQuery
                  listQuery.months = dayjs(listQuery.months, 'YYYYMM').add(1, 'month').format('YYYYMM')
                  if (listQuery.months > dayjs().format('YYYYMM')) listQuery.months = dayjs().format('YYYYMM')
                  this.$store.dispatch('baseApi/setMonths', listQuery.months)
                } else {
                  this.$alert(`当月是${mon}，不能再往下了`, '警告', {
                    type: 'warning',
                    closeOnClickModal: true,
                    callback: action => {
                      // 这里不做操作，不写的话会报错
                    }
                  })
                }
              }
            }
          }
        },
        visualMap: [{ // 区域组件
          type: 'continuous', // 连续型 continuous 连续型  piecewise 分段型
          min: this.min,
          max: this.max,
          text: ['高', '低'], // 长条显示文字信息
          calculable: true, // 手柄选择区域
          // color: ['#3A7ECE', '#87D6FF'], // 长度从高到低的颜色 该方法已经老旧用inRange outOfRange代替
          textStyle: {
            color: '#ccc',
            // color: '#000',
            background: '#ccc'
          },
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
            // color: ['#e0ffff', '#006edd']
            // color: ['#CEB9B2', 'red']
          }
          // outOfRange: {
          //   color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          //   symbolSize: [30, 100]
          // }
        }],
        geo: { // 这个是重点配置区
          // 表示中国地图
          map: place || 'china',
          // 平移或者绽放
          roam: 'true',
          // 缩放比例
          scaleLimit: {
            min: 0.7,
            max: 2
          },
          // 选中模式
          selectedMode: 'single',
          label: {
            textStyle: {
              color: 'rgba(0,0,0,0.4)'
            },
            // 是否显示对应地名
            show: true
          },
          itemStyle: {
            // borderColor: 'rgba(0, 0, 0, 0.2)'
            borderColor: '#ccc', // 地图边框
            areaColor: '#242640' // 地图背景
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        toolBox: {
          feature: {
            saveAsImage: {},
            restore: {
              show: true
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
          {
            name: '双数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: this.opentionDate
          }
        ]
      }
      return option
    },
    // 初始化用到的方法
    drawLine() {
      // 右键事件取消
      const canvas = this.$refs.echartsMap
      canvas.oncontextmenu = () => { return false }
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.myChartMap)
      myChart.off('click')
      myChart.on('click', (params) => {
        if (this.listQuery.city) {
          console.log(params.name)
        } else if (this.listQuery.province) {
          this.$store.dispatch('baseApi/setCity', params.name)
        } else {
          let cout = 0
          this.directlyCity.forEach(element => {
            if (params.name.substring(0, 2) === element) {
              ++cout
            }
          })
          if (cout > 0) {
            this.$store.dispatch('baseApi/setProvinceCity', params.name)
          } else {
            this.$store.dispatch('baseApi/setProvince', params.name)
          }
        }
      })
      // 加入自定义右键事件
      myChart.on('contextmenu', (params) => {
        this.genJson = require('@/assets/geoJson/china.json')
        echarts.registerMap('china', this.genJson)
        // this.showChinaMap()
        this.$store.dispatch('baseApi/resetListQuery')
      })
      // echarts根据框架比例自动刷新
      window.addEventListener('resize', () => { myChart.resize() })
    },

    // 设置地图最大最小值
    setMaxMin(arr) {
      this.min = 0
      this.max = 0
      arr.forEach(data => {
        if (parseFloat(data.value) < this.min) this.min = parseFloat(data.value)
        if (parseFloat(data.value) > this.max) this.max = parseFloat(data.value)
      })
      if (this.max === 0) this.max = 100
    },
    rendering(val, type) {
      var arr = []
      if (type === 'provinces') {
        val.forEach(value => {
          var obj = {}
          this.provincesText.forEach(provinces => {
            if (value.province === provinces.substring(0, 2)) {
              obj.name = provinces
            }
          })
          obj.value = value.value
          obj.totAmtActual = value.totAmtActual
          arr.push(obj)
        })
        this.countryData = arr
        this.opentionDate = arr
      } else if (type === 'city' || type === 'district') {
        val.forEach(value => {
          var obj = {}
          obj.name = value[type]
          obj.value = value.value
          obj.totAmtActual = value.totAmtActual
          arr.push(obj)
        })
        this.opentionDate = arr
      }
    }
  }

}
</script>

<style scoped>
#echarts {
  height: 100%;
  background: #242640;
}
</style>
