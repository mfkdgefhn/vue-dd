<template>
  <div class="vip">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-vip :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>
  </div>
</template>

<script>
import searchVip from '@/components/public/searchVip'

export default {
  name: 'Vip',
  components: {
    searchVip
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getAnalysis(data) {
      console.log(data)
    }
  }
}
</script>

<style>
</style>
