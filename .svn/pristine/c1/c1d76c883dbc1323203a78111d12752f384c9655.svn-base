<template>
  <div class="components-container">
    <split-pane :min-percent="20" :default-percent="30" split="vertical" @resize="resize">
      <template slot="paneL" class="left-container">A</template>
      <template slot="paneR" class="right-container">B</template>
    </split-pane>
  </div>
</template>

<script>

import splitPane from 'vue-splitpane'

export default {
  name: 'SplitPane',
  components: {
    splitPane
  },
  data() {
    return {
      test: ''
    }
  },
  methods: {
    resize() {
      console.log('resize')
    }
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
.right-container {
  background-color: #fce38a;
  height: 100%;
}
</style>
