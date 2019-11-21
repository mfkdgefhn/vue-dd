<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 11:47:21
 * @LastEditors: anan
 * @LastEditTime: 2019-10-15 13:19:26
 -->
<template>
  <div class="echarts-word-cloud">
    <!-- <div class="panel-body" :style="vStyle">
      <div ref="worldCloud" style="width: 100%;height: 100%" />
    </div>-->
    <div ref="worldCloud" :style="vStyle" />
  </div>
</template>

<script>
// import '@/assets/js/echarts-wordcloud.min'

export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      JosnList: [],
      vStyle: 'width: auto;height:' + window.innerHeight + 'px;'
    }
  },
  watch: {
    screenHeight(val) {
      this.vStyle = 'width: auto;height: ' + (val * 0.3) + 'px'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {

    drawLine() {
      const myChart = this.$echarts.init(this.$refs.worldCloud)
      var maskImage = new Image()
      // 重点：云彩图片的base64码
      maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='

      var worldCloudoption = {
        backgroundColor: '#242640',
        // tooltip: {
        //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        // },
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          // Text size range which the value in data will be mapped to.
          // 数据中的值将映射到的文本大小范围。
          // Default to have minimum 12px and maximum 60px size.
          // 默认为最小12px和最大60px大小。
          sizeRange: [12, 24],
          // Text rotation range and step in degree. Text will be rotated randomly in range [-90,90] by rotationStep 45
          // 文本旋转范围和步进度。文本将在[-90,90]范围内随机旋转，旋转步骤45
          rotationRange: [-45, 0, 45, 90],
          // 超出也显示
          // drawOutOfBound: true,

          maskImage: maskImage,
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) + ')'
              }
            }
          },
          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // 下面的左/上/宽/高/右/下用于定位单词cloud
          // Default to be put in the center and has 75% x 80% size.
          // 默认设置为放在中间，大小为75%x 80%。

          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          data: [
            {
              name: 'Sam S Club',
              value: 9000
            }, {
              name: 'Macys',
              value: 6181
            }, {
              name: 'Amy Schumer',
              value: 4386
            }, {
              name: 'Jurassic World',
              value: 4055
            }, {
              name: 'Charter Communications',
              value: 2467
            }, {
              name: 'Chick Fil A',
              value: 2244
            }, {
              name: 'Planet Fitness',
              value: 1898
            }, {
              name: 'Pitch Perfect',
              value: 1484
            }, {
              name: 'Express',
              value: 1112
            }, {
              name: 'Home',
              value: 965
            }, {
              name: 'Johnny Depp',
              value: 847
            }, {
              name: 'Lena Dunham',
              value: 582
            }, {
              name: 'Lewis Hamilton',
              value: 555
            }, {
              name: 'KXAN',
              value: 550
            }, {
              name: 'Point Break',
              value: 265
            }]
        }]
      }

      myChart.setOption(worldCloudoption)

      window.addEventListener('resize', () => { myChart.resize() })
    }
  }
}
</script>

<style scoped>
.echarts-word-cloud {
  height: 100%;
}
</style>
