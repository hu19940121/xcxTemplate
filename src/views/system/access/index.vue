<template>
  <div class="access app-container">
    <el-card class="box-card">
      <div class="operation-btns">
        <el-button type="primary" @click="openForm('add')">新增权限</el-button>
      </div>
      <el-table
        :data="accessList"
        style="width: 100%;margin-bottom: 20px;"
        border
        row-key="id"
      >
        <el-table-column
          prop="name"
          label="权限名称"
        />
        <el-table-column
          prop="path"
          label="path"
        />
        <el-table-column
          prop="sort"
          label="排序"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openForm('addChild',scope.row)"
            >新增子权限</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openForm('update',scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)"
            >删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="50%" @close="closeRoleForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="path" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限描述" prop="desc">
          <el-input v-model="form.desc" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" />
        </el-form-item>
        <el-form-item v-if="!operateRoot" label="父级权限">
          <el-input :value="currentRow.name" :disabled="!operateRoot" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ]
      },
      formTitle: '新增权限',
      form: {
        name: '',
        path: '',
        desc: '',
        status: 1,
        sort: 0
      },
      formVisible: false,
      isUpdate: false,
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 200
        },
        {
          text: 'path',
          value: 'path'
        },
        {
          text: '排序',
          value: 'sort'
        }
      ],
      currentRow: {},
      operateRoot: true
    }
  },
  computed: {
    ...mapGetters(['accessList'])
  },
  created() {
    this.getAccessList()
    console.log('accessList', this.accessList)
  },
  methods: {
    ...mapActions({
      getAccessList: 'access/getAccessList',
      addAccess: 'access/addAccess',
      delAccess: 'access/delAccess',
      updateAccess: 'access/updateAccess'
    }),
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            this.updateAccess(this.form).then(res => {
              this.$message.success(res.msg)
              this.formVisible = false
              this.getAccessList()
            })
          } else {
            let params = {}
            params = {
              ...this.form
            }
            if (this.currentRow.id) {
              params.pid = this.currentRow.id
            }
            delete params.icon
            this.addAccess(params).then(res => {
              this.$message.success(res.msg)
              this.getAccessList()
              this.formVisible = false
            })
          }
        }
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAccess({ id }).then(res => {
          this.getAccessList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // timeFormatter(row, column) {
    //   return this.$dateformat(row.create_time)
    // },
    openForm(action, row) {
      this.formVisible = true
      if (action === 'addChild') {
        this.operateRoot = false
        this.currentRow = row
        this.isUpdate = false
        this.formTitle = '新增子权限'
      } else if (action === 'add') {
        this.isUpdate = false
        this.formTitle = '新增权限'
      } else {
        this.formTitle = '更新权限'
        this.isUpdate = true
        this.$nextTick(() => {
          this.form = {
            ...row
          }
        })
      }
    },
    closeRoleForm() {
      this.operateRoot = true
      this.resetForm('form')

      this.currentRow = {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.access{
  .box-card{
    width:80%;
    .operation-btns{
      padding:20px 0;
    }
  }
}
</style>
