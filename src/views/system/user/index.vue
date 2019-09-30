<template>
  <div class="user app-container">
    <el-card class="box-card">
      <el-table
        :data="userList"
        style="width: 80%"
      >
        <el-table-column
          prop="avatarUrl"
          label="头像"
        >
          <template slot-scope="props">
            <img style="width:50px;height:50px;border-radius:50%;" :src="props.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
        />
        <el-table-column
          prop="province"
          label="省份"
        >
          <template slot-scope="props">
            <span>{{ props.row.province || '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          :formatter="rolesFormatter"
        />
        <el-table-column
          prop="is_super"
          label="是否拥有最大权限"
          :formatter="isSuperFormatter"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="props">
            <!-- <el-button size="mini" type="danger" @click="del(scope.row.id,scope.$index)">删除</el-button> -->
            <el-button size="mini" type="primary" @click="openUserDialog('update',props.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isUpdate ? '编辑用户': '新增用户'" :visible.sync="UserDialogVisible" width="30%" @close="closeUserDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="choosedRoles" multiple placeholder="请选择角色">
            <el-option
              v-for="(role,index) in roleList"
              :key="index"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('form')">确 定</el-button>
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
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ]
      },
      form: {},
      UserDialogVisible: false,
      currentUserRow: {},
      isUpdate: false,
      choosedRoles: [] // 选中的角色
    }
  },
  computed: {
    ...mapGetters(['userList', 'roleList'])
  },
  created() {
    this.getUserList().then(res => {
      this.getRoleList()
    })
  },
  methods: {
    ...mapActions({
      getUserList: 'user/getUserList',
      updateUser: 'user/updateUser',
      getRoleList: 'role/getRoleList'
    }),
    openUserDialog(action, row) {
      this.UserDialogVisible = true
      if (action === 'update') {
        this.isUpdate = true
        this.currentUserRow = row
        this.choosedRoles = this.buildRoleOptionsData(row.roles)
        this.form.nickName = row.nickName
      }
    },
    buildRoleOptionsData(roles) {
      const tempArr = []
      if (roles.length > 0) {
        roles.map(role => {
          tempArr.push(role.id)
        })
      }
      return tempArr
    },
    closeUserDialog() {
      this.resetForm('form')
      this.choosedRoles = []
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            const params = {
              userId: this.currentUserRow.userId,
              nickName: this.form.nickName,
              roles: this.choosedRoles
            }
            this.updateUser(params).then(res => {
              this.getUserList()
              this.$message.success('更新成功')
              this.UserDialogVisible = false
            })
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    isSuperFormatter(row, column) {
      return row.is_super === 1 ? '是' : '否'
    },
    rolesFormatter(row, column) {
      if (row.roles.length > 0) {
        let roleStr = ''
        row.roles.map(res => {
          roleStr += res.name + ' '
        })
        return roleStr
      } else {
        return '暂无任何角色'
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
