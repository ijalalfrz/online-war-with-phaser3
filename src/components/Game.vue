<template>
    <div style="margin:auto" :id="containerId" v-if="downloaded" />
    <div class="placeholder" v-else>
      Downloading ...
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
        token: "",
        downloaded: false,
        gameInstance: null,
        containerId: 'game-container'
      }
    },
    async mounted() {
      const game = await import(/* webpackChunkName: "game" */ '@/game/game')
      this.downloaded = true
      this.$nextTick(() => {
        this.gameInstance = game.launch(this.containerId)
      })
    },
    destroyed() {
      this.gameInstance.destroy(false)
    }
  }
  </script>
  
  