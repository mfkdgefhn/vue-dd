<template>
  <div class="components-container">
    <!-- 分割面板 -->
    <splitpanes class="default-theme">
      <!-- 左侧面板 -->
      <pane min-size="20" size="20" max-size="40">
        <el-tree
          accordion
          class="tree"
          :props="props"
          :load="loadNode"
          lazy
          @node-click="isSelect"
        />
      </pane>
      <!-- 右侧面板 -->
      <pane>
        <el-tabs type="border-card" class="right-container">
          <el-tab-pane v-for="(i,index) in select" :key="index" class="dndList">
            <span slot="label">
              <i class="el-icon-date" />
              {{ i.title }}
            </span>
            <dnd-list
              :list1-title="i.list1Title"
              :list2-title="i.list2Title"
              :list1="i.list1"
              :list2="i.list2"
            />
            <div class="submit">
              <el-button type="primary" @click="getList1">提交</el-button>
              <el-button @click="getList2">取消</el-button>
              <el-button @click="test">默认按钮</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import dndList from '@/components/DndList'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import * as dd from 'dingtalk-jsapi'
// import { getToken } from '@/api/dd'

export default {
  name: 'PermissionConfig',
  components: {
    dndList,
    Splitpanes,
    Pane
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      count: 1,
      customer: [],
      store: [],
      // 店仓选择
      select: [
        {
          title: '店仓选择',
          list1Title: '已选店仓',
          list2Title: '未选店仓',
          list1: [
            { id: 1, author: '安安1', title: '安安1' },
            { id: 2, author: '安安2', title: '安安2' },
            { id: 3, author: '安安3', title: '安安3' },
            { id: 4, author: '安安4', title: '安安4' }
          ],
          list2: [
            { id: 5, author: '安安5', title: '安安5' },
            { id: 6, author: '安安6', title: '安安6' },
            { id: 7, author: '安安7', title: '安安7' },
            { id: 8, author: '安安8', title: '安安8' }
          ]
        },
        // 区域选择
        {
          title: '区域选择',
          list1Title: '已选店仓',
          list2Title: '未选店仓',
          list1: [
            { id: 9, author: '安安9', title: '安安9' },
            { id: 10, author: '安安10', title: '安安10' },
            { id: 11, author: '安安11', title: '安安11' },
            { id: 12, author: '安安12', title: '安安12' }
          ],
          list2: [
            { id: 13, author: '安安13', title: '安安13' },
            { id: 14, author: '安安14', title: '安安14' },
            { id: 15, author: '安安15', title: '安安15' },
            { id: 16, author: '安安16', title: '安安16' }
          ]
        }
      ]

    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // https://oapi.dingtalk.com/department/list?access_token=89efa000504b387a9686cecb8a81d408&id=1

      this.$store.dispatch('baseApi/getQxszCustomer').then(() => {
        this.customer = this.$store.getters.qxszCustomer
      })
    },
    getList1() {
      console.log(this.list1)
    },

    getList2() {
      console.log(this.list2)
    },
    resize() {
      // console.log('resize')
    },
    loadNode(node, resolve) {
      // 一级树
      if (node.level === 0) {
        return resolve([{ id: '176', name: '浙江戈美其有限公司' }])
      } else if (node.level === 1) {
        this.$store.dispatch('baseApi/getQxszCustomer').then(() => {
          this.customer = this.$store.getters.qxszCustomer
          setTimeout(() => {
            resolve(this.customer)
          }, 500)
        })
      } else if (node.level === 2) {
        this.isSelect = true
        const params = {
          cCustomerId: node.data.id
        }
        this.$store.dispatch('baseApi/getQxszStore', params).then(() => {
          this.store = this.$store.getters.qxszStore
          setTimeout(() => {
            resolve(this.store)
          }, 500)
        })
      } else {
        resolve([])
      }
    },
    onPaneAdd() {
      console.log(1)
    },
    isSelect(data) {
      console.log(data)
    },
    async test() {
      debugger
      console.log('测试')
      // getToken().then(() => {
      //   console.log(this.$store.getters.getToken)
      // })
      await this.$store.dispatch('dd/getToken')
      await this.$store.dispatch('dd/getJsapiTicket').then(() => {
        const jsapiTicket = this.$store.getters.jsapiTicket
        console.log(jsapiTicket)
      })
      var timestamp = Date.parse(new Date())
      var url = 'http://localhost:9528'
      const signature = this.getJsApiSingnature(this.$store.getters.jsapiTicket, 'abc123', timestamp, url)
      dd.config({
        agentId: '758781302',
        corpId: 'dingbd3e013f5c902a15', // 必填，企业ID
        timeStamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: 'abc123', // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: [
          'biz.contact.choose',
          'biz.contact.chooseMobileContacts',
          'biz.contact.complexPicker',
          'biz.contact.departmentsPicker',
          'biz.contact.createGroup',
          'biz.contact.setRule'
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      })
      dd.biz.contact.departmentsPicker({
        title: '测试标题', // 标题
        corpId: 'xxx', // 企业的corpId
        multiple: true, // 是否多选
        limitTips: '超出了', // 超过限定人数返回提示
        maxDepartments: 100, // 最大选择部门数量
        pickedDepartments: [], // 已选部门
        disabledDepartments: [], // 不可选部门
        requiredDepartments: [], // 必选部门（不可取消选中状态）
        appId: 158, // 微应用的Id
        permissionType: 'xxx', // 选人权限，目前只有GLOBAL这个参数
        onSuccess: (result) => {
          console.log(result)
          /**
          {
              userCount:1,                              //选择人数
              departmentsCount:1，//选择的部门数量
              departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
          }
          */
        },
        onFail: (err) => {

        }
      })
    },
    getJsApiSingnature(ticket, nonce, timeStamp, url) {
      var CryptoJS = require('crypto-js')
      const plainTex = 'jsapi_ticket=' + ticket + '&noncestr=' + nonce + '&timestamp=' + timeStamp + '&url=' + url
      const signature = CryptoJS.SHA1(plainTex).toString()
      return signature
    }
  }
}
</script>

<style  scoped>
.components-container {
  position: relative;
}
.left-container {
  background-color: #f38181;
  height: 100%;
}
.tree {
  width: 100vh;
  padding: 10px;
}
.right-container {
  height: 100%;
  width: 100vh;
}
.submit {
  text-align: center;
}
.splitpanes__pane {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2) inset;
  position: relative;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
