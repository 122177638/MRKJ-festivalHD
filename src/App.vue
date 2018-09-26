<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  mounted () {  
  }
}
</script>

<style lang="less">
.vux-confirm .vux-x-dialog .weui-dialog{width: 80% !important;}
</style>
