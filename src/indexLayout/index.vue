<template>
  <div class="indexLayout">
    <topNav />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import topNav from './components/topNav'
export default {
  components: {
    topNav
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.indexLayout{
  .main{
    width: 100%;
  }
}

</style>
