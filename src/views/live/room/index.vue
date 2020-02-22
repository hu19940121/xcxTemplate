<template>
  <div class="room app-container">
    <el-card class="box-card">
      <div class="operation-btns">
        <!-- <el-button v-permission="'/live/room/add'" type="primary" @click="openForm('add')">新增权限</el-button> -->
        <el-button type="primary" @click="openForm('add')">新建小班课</el-button>
        <el-button type="primary" @click="openForm('add')">新建大班课</el-button>

      </div>
      <el-table
        :data="roomList"
        style="width: 100%;margin-bottom: 20px;"
        border
        row-key="id"
      >
        <el-table-column
          prop="subject"
          label="课堂名称"
        />
        <el-table-column
          prop="createUser"
          label="创建者"
        />
        <el-table-column
          prop="startDate"
          label="上课时间"
        />
        <el-table-column
          prop="invalidDate"
          label="失效时间"
        />
        <el-table-column label="操作" width="300px;">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openForm('update',scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="50%" @close="closeRoleForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="课堂名称" prop="subject">
          <el-input v-model="form.subject" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择开始时间"
          />
        </el-form-item>
        <el-form-item label="失效时间" prop="invalidDate">
          <el-date-picker
            v-model="form.invalidDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择失效时间"
          />
        </el-form-item>
        <!-- <el-form-item label="是否要求用户登录" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="老师加入口令" prop="teacherToken">
          <el-input v-model="form.teacherToken" placeholder="6-15位数字" />
        </el-form-item>
        <el-form-item label="web端学生加入口令" prop="studentToken">
          <el-input v-model="form.studentToken" placeholder="6-15位数字" />
        </el-form-item>
        <el-form-item label="客户端学生加入口令" prop="studentClientToken">
          <el-input v-model="form.studentClientToken" placeholder="6-15位数字" />
        </el-form-item>
        <el-form-item label="助教加入口令" prop="assistantToken">
          <el-input v-model="form.assistantToken" placeholder="6-15位数字" />
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
        subject: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请输入开始日期', trigger: 'blur' }
        ],
        invalidDate: [
          { required: true, message: '请输入失效日期', trigger: 'blur' }
        ],
        teacherToken: [
          { required: true, message: '请输入老师端加入口令', trigger: 'blur' }
        ],
        studentToken: [
          { required: true, message: '请输入学生web端加入口令', trigger: 'blur' }
        ],
        studentClientToken: [
          { required: true, message: '请输入学生客户端加入口令', trigger: 'blur' }
        ],
        assistantToken: [
          { required: true, message: '请输入助手口令', trigger: 'blur' }
        ]
      },
      formTitle: '新增权限',
      form: {
        subject: '',
        startDate: '',
        invalidDate: '',
        teacherToken: '',
        studentToken: '',
        studentClientToken: '',
        assistantToken: '',
        webJoin: true,
        clientJoin: true,
        scene: 1

      },
      formVisible: false,
      isUpdate: false,
      currentRow: {},
      operateRoot: true
    }
  },
  computed: {
    ...mapGetters(['roomList'])
  },
  created() {
    this.getRoomList()
    // console.log('roomList', this.roomList)
  },
  methods: {
    ...mapActions({
      getRoomList: 'room/getRoomList',
      addRoom: 'room/addRoom',
      delRoom: 'room/delRoom',
      updateRoom: 'room/updateRoom'
    }),
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            this.updateRoom(this.form).then(res => {
              this.$message.success(res.msg)
              this.formVisible = false
              this.getRoomList()
            })
          } else {
            let params = {}
            params = {
              ...this.form
            }
            console.log(this.form)
            // return
            this.addRoom(params).then(res => {
              this.$message.success(res.msg)
              // this.getRoomList()
              // this.formVisible = false
            })
          }
        }
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该课堂, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delRoom({ id }).then(res => {
          this.getRoomList()
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
        this.form.path = `${row.path}/`
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
.room{
  .box-card{
    .operation-btns{
      padding:20px 0;
    }
  }
}
</style>
