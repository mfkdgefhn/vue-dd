<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-28 15:18:15
 * @LastEditors: anan
 * @LastEditTime: 2019-11-07 14:05:16
 -->
<template>
  <div id="echarts" ref="echartsMap">
    <!-- <el-button type="primary" class="left">主要按钮</el-button> -->
    <div ref="myChartMap" style="height:100%;" />
    <!-- :style="vStyle" -->
  </div>
</template>

<script>
import 'echarts/map/js/china.js' // 引入中国地图数据
// import { cityMap } from '@/assets/geoJson/china-main-city/china-main-city-map.js'// 引入区县地图
import cityMap from '@/assets/geoJson/china-main-city/china-main-city-map.js' // 引入区县地图
// import china from 'echarts/map/js/china.js' // 引入中国地图数据

import { getProvinceData, getCityData } from '@/api/gmqApi'

import { getProvince } from '@/utils/map.js' // getCity
import echarts from 'echarts'

export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    regionData: {
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
      return this.regionData
    }
  },

  watch: {
    // 根据父组件传进来的值，自动设置高度
    screenHeight(val) {
      this.vStyle = 'width: auto;height: ' + (val * 0.2) + 'px'
    },
    propsData(new_value, old_value) {
      var arr = []
      new_value.forEach(value => {
        var obj = {}
        this.provincesText.forEach(provinces => {
          if (value.name === provinces.substring(0, 2)) {
            obj.name = provinces
          }
        })
        if (parseFloat(value.qty) < this.min) {
          this.min = parseFloat(value.qty)
        }
        if (parseFloat(value.qty) > this.max) {
          this.max = parseFloat(value.qty)
        }
        obj.value = value.qty
        arr.push(obj)
      })
      this.countryData = arr
      this.opentionDate = arr
      this.drawLine()
    }
  },
  mounted() {
  },
  methods: {
    // 设置地图参数
    getMapOpt(place) {
      const option = {
        name: '员工地域分布',
        // backgroundColor: '#242640',
        // backgroundColor: 'transparent'
        tooltip: {
          // formatter: '{a} <br/>{b} <br/>{c} <br/>{d}' // {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
          // formatter: (params) => {
          //   return params
          // }

        },
        // toolbox: {
        //   // orient: 'vertical',
        //   right: '3%',
        //   top: '3%',
        //   itemSize: 40,
        //   itemGap: 25,
        //   feature: {
        //     myTool1: {
        //       show: true,
        //       left: 10,
        //       title: '上一月',
        //       // icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        //       onclick: () => {
        //         alert('myToolHandler1')
        //       }
        //     },
        //     myTool2: {
        //       show: true,
        //       title: '下一月',
        //       icon: 'image://http://echarts.baidu.com/images/favicon.png',
        //       onclick: () => {
        //         alert('myToolHandler2')
        //       }
        //     }
        //   }
        // },

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
            background: '#fff'
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
          map: place || 'china', // 表示中国地图
          roam: 'scale', // 平移或者绽放
          scaleLimit: {
            min: 0.7,
            max: 2
          },
          selectedMode: 'single', // 选中模式
          label: {
            textStyle: {
              color: 'rgba(0,0,0,0.4)'
              // color: '#ccc'
            },
            show: true // 是否显示对应地名
          },
          itemStyle: {
            // borderColor: 'rgba(0, 0, 0, 0.2)'
            borderColor: '#ccc', // 地图边框
            areaColor: '#fff' // 地图背景
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
            name: '启动次数', // 浮动框的标题
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
      var that = this
      // 基于准备好的dom，初始化echarts实例
      const myChart = that.$echarts.init(that.$refs.myChartMap)
      // 获取地图数据
      const option = that.getMapOpt()
      // 绘制图表
      if (option && typeof option === 'object') {
        myChart.setOption(option)
      }
      // // 点击事件
      // myChart.on('click', (param) => {
      //   const provinceIndex = that.provincesText.findIndex(x => {
      //     return param.name === x
      //   })
      //   var provinceAlphabet = '' // 省拼音
      //   var provinceTextsAlphabet = '' // 省中文

      //   if (provinceIndex !== -1) { // 省
      //     provinceAlphabet = that.provinces[provinceIndex]
      //     provinceTextsAlphabet = that.provincesText[provinceIndex]
      //     // 重新渲染各省份地图
      //     that.getProvinceMapOpt(provinceAlphabet, provinceTextsAlphabet)
      //   } else { // 市
      //     that.getCityMapOpt(param.name)
      //   }
      // })
      // 右键事件取消
      const canvas = this.$refs.echartsMap
      canvas.oncontextmenu = () => { return false }

      // // 加入自定义右键事件
      // myChart.on('contextmenu', (params) => {
      //   that.genJson = require('@/assets/geoJson/china.json')
      //   echarts.registerMap('china', that.genJson)
      //   that.showChinaMap()
      // })

      // echarts根据框架比例自动刷新
      window.addEventListener('resize', () => { myChart.resize() })
    },

    // 显示中国地图
    showChinaMap() {
      this.opentionDate = this.countryData
      this.setMaxMin(this.countryData)
      const option = this.getMapOpt()
      const myChart = this.$echarts.init(this.$refs.myChartMap)
      myChart.setOption(option, true)
    },

    // 下钻到省地图
    getProvinceMapOpt(provinceAlphabet, provinceTextsAlphabet) {
      // axios.get('echarts/map/js/province/' + provinceAlphabet + '.js').then((s) => {  //如果要与后端互动的话，需要加入该句
      const myChart = this.$echarts.init(this.$refs.myChartMap)
      // 获取VIP数据
      var job = {}
      job.provinceName = provinceTextsAlphabet.substring(0, 2)
      getProvinceData(job).then(response => {
        // 获取接口数据
        var arrData = response.result
        this.opentionDate = arrData
        // 对数据最大值与最小值进行设置
        this.setMaxMin(arrData)

        // 获取省json
        getProvince(provinceAlphabet, this.genJson)
        // 切换到省地图
        echarts.registerMap(provinceAlphabet, this.genJson)//, s.data
        // 配置地图
        const option = this.getMapOpt(provinceTextsAlphabet)
        // 渲染地图数据
        myChart.setOption(option)
      })
    },

    // 下钻到市级地图
    getCityMapOpt(cityName) {
      // 拿到ref
      const myChart = this.$echarts.init(this.$refs.myChartMap)
      if (cityMap[cityName]) {
        // 获取高级json
        this.genJson = require('@/assets/geoJson/china-main-city/' + cityMap[cityName] + '.json')
        // 获取请求参数
        var job = {}
        job.cityName = cityName.substring(0, 2)
        // 获取市级数据
        getCityData(job).then(response => {
          var arrData = response.result
          this.opentionDate = arrData
          // 对数据最大值与最小值进行设置
          this.setMaxMin(arrData)
          echarts.registerMap(cityName, this.genJson) //, s.data
          const option = this.getMapOpt(cityName)
          myChart.setOption(option)
        })
      }
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
    }

  }

}
</script>

<style scoped>
#echarts {
  height: 100%;
  /* background: #242640; */
}
</style>
