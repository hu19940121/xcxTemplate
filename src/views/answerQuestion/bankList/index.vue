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
        <el-button style="float:right;" type="primary" @click="handleCreate">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="bankList"
      >
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="banner"
          label="封面"
        />
        <el-table-column
          prop="introduction"
          label="简介"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="handleUpdate(props.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(props.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        :limit="pageSize"
        :page="pageIndex"
        @pagination="handlePagination"
      />
    </el-card>
    <el-dialog
      :title="actionTitle"
      :visible.sync="formVisible"
      @close="handleCloseForm('form')"
    >
      <el-form ref="form" :model="form" :rules="rules" style="width: 400px;">
        <el-form-item label="题库名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="题库封面" prop="banner" :label-width="formLabelWidth">
          <upload-file :btn-text="uploadText" @success="handleUploadSuccess" />
          <img v-if="form.banner" style="width:200px;" :src="form.banner" alt="">
          <el-input v-show="false" v-model="form.banner" />
        </el-form-item>
        <el-form-item label="题库简介" prop="introduction" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="题库参与人数" prop="join_num" :label-width="formLabelWidth">
          <el-input v-model="form.join_num" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click=" actionType === 'create' ? createData('form') : updateData('form') ">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import uploadFile from '@/components/uploadFile'

export default {
  // name: 'BankList',
  components: {
    Pagination,
    uploadFile
  },
  data() {
    return {
      actionType: '',
      formLabelWidth: '120px',
      formVisible: false,
      pageIndex: 1,
      pageSize: 10,
      currentBank: {},
      keywords: '',
      form: {
        banner: '', // 封面
        introduction: '', // 介绍
        join_num: 0, // 参与人数
        name: '' // 题库名称
      },
      rules: {
        name: [
          { required: true, message: '请输入题库名称', trigger: 'blur' }
        ],
        banner: [
          { required: true, message: '请选择题库封面', trigger: 'blur' }
        ],
        join_num: [
          { required: true, message: '请输入参与人数', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入题库简介', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      bankList: (state) => state.answerQuestion.bankList,
      total: (state) => state.answerQuestion.total,
      loading: (state) => state.answerQuestion.loading
    }),
    uploadText() {
      return this.form.banner ? '重新上传' : '上传封面'
    },
    actionTitle() {
      return this.actionType === 'create' ? '添加' : '更新'
    }
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
  activated() {
    console.log('activated')
  },
  methods: {
    ...mapActions({
      getBankList: 'answerQuestion/getBankList',
      addBank: 'answerQuestion/addBank',
      updateBank: 'answerQuestion/updateBank',
      deleteBank: 'answerQuestion/deleteBank'
    }),
    getList() {
      this.getBankList({ pageIndex: this.pageIndex, pageSize: this.pageSize, keywords: this.keywords })
    },
    handleUploadSuccess(fileInfo) {
      this.form.banner = fileInfo.url
    },
    handleCreate() {
      this.resetForm()
      this.actionType = 'create'
      this.formVisible = true
    },
    handleUpdate(row) {
      this.actionType = 'update'
      this.formVisible = true
      this.$nextTick(() => {
        this.form = {
          ...row
        }
      })
      // this.form = Object.assign({}, row)
    },
    handleRemove(id) {
      //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
      // this.deleteBank()
    },
    resetForm() {
      this.form = {
        banner: '', // 封面
        introduction: '', // 介绍
        join_num: 0, // 参与人数
        name: '' // 题库名称
      }
    },
    createData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addBank(this.form).then(res => {
            console.log('res', res)
            this.formVisible = false
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateBank(this.form).then(res => {
            this.formVisible = false
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // check(row) {
    //   this.dialogVisible = true
    //   this.currentBank = {
    //     ...row
    //   }
    // },
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
    handleCloseForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
