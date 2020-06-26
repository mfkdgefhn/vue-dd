<template>
  <div class="components-container">
    <splitpanes class="default-theme">
      <pane min-size="20" size="20" max-size="40">
        <el-tree class="tree" :props="props" :load="loadNode" lazy />
      </pane>
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
      if (node.level === 0) {
        return resolve([{ id: '176', name: '浙江戈美其有限公司' }])
      }
      if (node.level === 1) {
        this.$store.dispatch('baseApi/getQxszCustomer').then(() => {
          this.customer = this.$store.getters.qxszCustomer
          setTimeout(() => {
            const data = this.customer
            resolve(data)
          }, 500)
        })
      }
      if (node.level > 1) {
        console.log(node)
      }
    },
    onPaneAdd() {
      console.log(1)
    }
    // loadNode(node, resolve) {
    //     if (node.level === 0) {
    //       return resolve([{ name: 'region' }]);
    //     }
    //     if (node.level > 1) return resolve([]);

    //     setTimeout(() => {
    //       const data = [{
    //         name: 'leaf',
    //         leaf: true
    //       }, {
    //         name: 'zone'
    //       }];

    //       resolve(data);
    //     }, 500);
    //   }

  }
}
</script>

<style  scoped>
.components-container {
  position: relative;
  height: 100vh;
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
