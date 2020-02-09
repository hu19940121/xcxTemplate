<template>
  <div class="role app-container">
    <el-card class="box-card">
      <div class="operation-btns">
        <el-button type="primary" @click="openRoleForm('add')">新增角色</el-button>
      </div>
      <el-table
        :data="roleList"
        style="width: 80%"
      >
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="desc"
          label="描述"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          :formatter="timeFormatter"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.row.id,scope.$index)">删除</el-button>
            <el-button size="mini" @click="openRoleForm('update',scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isUpdate ? '编辑角色': '新增角色'" :visible.sync="roleFormVisible" width="30%" @close="closeRoleForm">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.desc" />
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="accessList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="checkedKeys"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
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
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        desc: ' '
      },
      formLabelWidth: '120px',
      roleFormVisible: false,
      isUpdate: false,
      chooesdAccess: [],
      checkedKeys: []
    }
  },
  computed: {
    ...mapGetters(['roleList', 'accessList'])
  },
  created() {
    this.getRoleList().then(res => {
      this.getAccessList()
    })
  },
  methods: {
    ...mapActions({
      getRoleList: 'role/getRoleList',
      addRole: 'role/addRole',
      delRole: 'role/delRole',
      updateRole: 'role/updateRole',
      getAccessList: 'access/getAccessList',
      getRoleAccess: 'role/getRoleAccess'
    }),
    getCheckedKeys() {
      // this.chooesdAccess = this.$refs.tree.getCheckedKeys()
      this.chooesdAccess = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    },
    confirmAdd(formName) {
      this.getCheckedKeys()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.access = this.chooesdAccess
          if (this.isUpdate) {
            this.updateRole(this.form).then(res => {
              this.$message.success(res.msg)
              this.roleFormVisible = false
            })
          } else {
            this.addRole(this.form).then(res => {
              this.$message.success(res.msg)
              this.roleFormVisible = false
            })
          }
        }
      })
    },
    del(id, index) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delRole({ params: { id }, index })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    timeFormatter(row, column) {
      return this.$dateformat(row.create_time)
    },
    openRoleForm(action, row) {
      this.roleFormVisible = true
      if (action === 'add') {
        this.form = {}
        this.isUpdate = false
      } else {
        this.checkStrictly = true
        this.getRoleAccess({ id: row.id }).then(res => {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(res.data.access_ids)
            this.checkedKeys = res.data.access_ids
            this.isUpdate = true
            this.form = JSON.parse(JSON.stringify(row))
            // set checked state of a node not affects its father and child nodes
            this.checkStrictly = false
          })
        })
      }
    },
    closeRoleForm() {
      this.resetForm('form')
      this.chooesdAccess = []
      this.clearTree()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    clearTree() {
      this.$refs.tree.setCheckedKeys([]) // 清空选中节点
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = this.isexpand
      } // 关闭已经打开的节点
    }
  }

}
</script>

<style lang="scss" scoped>
.role{
  .box-card{
    width:80%;
  }
}
</style>
