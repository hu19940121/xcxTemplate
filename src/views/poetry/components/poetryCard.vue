<template>
  <div class="poertryCard">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>题目：{{ title }}</span>
      </div>
      <div class="poetry-content">
        {{ content }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '题目'
    },
    content: {
      type: String,
      default: '内容'
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
