<template>
  <div class="app-container list">
    <el-card class="box-card">
      <div>
        <el-input
          v-model="keywords"
          style="width:200px;"
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
        />
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 80%"
      >
        <el-table-column
          prop="nickName"
          label="微信昵称"
        />
        <el-table-column
          prop="avatarUrl"
          label="头像"
        >
          <template slot-scope="prop">
            <img style="width:40px;height:40px;border-radius:50%;" :src="prop.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
        />
        <el-table-column
          prop="_openid"
          label="openId"
        />
        <!-- <el-table-column
          label="操作"
        >
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="check(props.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="check(props.row)">编辑</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="content"
          label="内容"
        /> -->
      </el-table>
      <Pagination
        :total="total"
        :limit="pageSize"
        :page="pageIndex"
        @pagination="handlePagination"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getRobotUserList } from '@/api/robot'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      userList: [],
      loading: false,
      keywords: '',
      pageIndex: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {
    keywords(val) {
      if (!val) {
        this.pageIndex = 1
        this.handleGetRobotUserList()
      }
    }
  },
  created() {
    this.handleGetRobotUserList()
  },
  methods: {
    handleGetRobotUserList() {
      this.loading = true
      getRobotUserList({
        keywords: this.keywords,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then((res) => {
        this.userList = res.data.data || []
        this.total = res.data.pager.Total
        this.loading = false
        console.log(res)
      })
    },
    search() {
      this.pageIndex = 1
      this.handleGetRobotUserList()
    },
    handlePagination(val) {
      this.pageIndex = val.page
      if (this.pageSize !== val.limit) {
        this.pageIndex = 1
      }
      this.pageSize = val.limit
      this.handleGetRobotUserList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
