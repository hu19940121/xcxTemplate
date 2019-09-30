<template>
  <div class="app-container list">
    <el-card class="box-card">
      <el-table
        :data="poetryList"
        style="width: 80%"
      >
        <el-table-column
          prop="author"
          label="作者"
        />
        <el-table-column
          prop="title"
          label="题目"
        />
        <el-table-column
          prop="dynasty"
          label="朝代"
        />
        <el-table-column
          prop="content"
          label="内容"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      // poetryList: []
      pageIndex: 1,
      pageSize: 20
    }
  },
  computed: {
    ...mapState({
      poetryList: (state) => state.poetry.poetryList
    })
  },
  created() {
    this.getPoetryList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  },

  methods: {
    ...mapActions({
      getPoetryList: 'poetry/getPoetryList'
    })
  }

}
</script>

<style lang="scss" scoped>

</style>
