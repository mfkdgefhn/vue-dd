<template>
  <div>
    <dnd-list :list1-title="list1Title" :list2-title="list2Title" :list1="list1" :list2="list2" />
    <el-button @click="getList1">提交</el-button>
    <el-button @click="getList2">取消</el-button>
  </div>
</template>

<script>
import dndList from '@/components/DndList'

export default {
  name: 'PermissionConfig',
  components: {
    dndList
  },
  data() {
    return {
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

    }
  },
  methods: {
    getList1() {
      console.log(this.list1)
    },

    getList2() {
      console.log(this.list2)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
