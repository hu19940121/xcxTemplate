<template>
  <div style="background:red;">
    用户详情用户详情用户详情用户详情用户详情
    <button @click="t" />
  </div>
</template>

<script>
export default {
  methods: {
    t() {
      this.$router.push({
        path: '/system/user/userDetail/test'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
