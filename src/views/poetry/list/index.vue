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
        <el-button style="float:right;" type="primary" @click="poetryFormVisible = true; test()">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
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
          label="操作"
        >
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="check(props.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="check(props.row)">编辑</el-button>
          </template>
        </el-table-column>
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
    <el-dialog
      title="内容"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <poetry-card :title="checkPoetry.title" :content="checkPoetry.content" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="收货地址"
      :visible.sync="poetryFormVisible"
      @close="handleFormClose('poetryForm')"
    >
      <el-form ref="poetryForm" :model="poetryForm" :rules="rules">
        <el-form-item label="诗词题目" prop="title" :label-width="formLabelWidth">
          <el-input v-model="poetryForm.title" />
        </el-form-item>
        <el-form-item label="诗词作者" prop="author" :label-width="formLabelWidth">
          <el-input v-model="poetryForm.author" />
        </el-form-item>
        <el-form-item label="诗词内容" prop="content" :label-width="formLabelWidth">
          <el-input v-model="poetryForm.content" />
        </el-form-item>
        <el-form-item label="诗词朝代" prop="dynasty" :label-width="formLabelWidth">
          <el-input v-model="poetryForm.dynasty" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="poetryFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('poetryForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import poetryCard from '../components/poetryCard'
import Pagination from '@/components/Pagination'
export default {
  name: 'PoetryList',
  components: {
    poetryCard,
    Pagination
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogVisible: false,
      poetryFormVisible: false,
      pageIndex: 1,
      pageSize: 10,
      checkPoetry: {},
      keywords: '',
      poetryForm: {
        author: '',
        author_id: '',
        content: '',
        dynasty: '',
        id: '',
        title: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入诗词题目', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      poetryList: (state) => state.poetry.poetryList,
      total: (state) => state.poetry.total,
      loading: (state) => state.poetry.loading
    })
  },
  watch: {
    keywords(val) {
      if (!val) {
        this.initPageInfo()
        this.getList()
      }
    }
  },

  created() {
    this.getList()
  },
  methods: {
    ...mapActions({
      getPoetryList: 'poetry/getPoetryList',
      addPoetry: 'poetry/addPoetry'
    }),
    test() {
      console.log('test')
    },
    getList() {
      this.getPoetryList({ pageIndex: this.pageIndex, pageSize: this.pageSize, keywords: this.keywords })
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPoetry(this.poetryForm).then(res => {
            console.log('res', res)

            this.poetryFormVisible = false
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    check(row) {
      this.dialogVisible = true
      this.checkPoetry = {
        ...row
      }
    },
    search() {
      if (!this.keywords) {
        this.$message.info('请输入关键字')
        return false
      }
      this.getList()
    },
    handlePagination(val) {
      this.pageIndex = val.page
      this.pageSize = val.limit
      this.getList()
    },
    initPageInfo() {
      this.pageIndex = 1
      this.pageSize = 10
    },
    handleFormClose(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
