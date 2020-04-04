<template>
  <div class="app-container list">
    <el-card class="box-card">
      <p class="piaoyiti">啦啦啦啦啦</p>
      <div>
        <el-input
          v-model="keywords"
          style="width:200px;"
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
        />
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button style="float:right;" type="primary" @click="musicFormVisible = true;resetMusicFrom()">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="musicList"
      >
        <el-table-column
          label="歌曲名称"
        >
          <template slot-scope="prop">
            <span class="piaoyiti">
              {{ prop.row.title }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="artist"
          label="专辑"
        />
        <el-table-column
          prop="pic"
          label="封面"
        >
          <template slot-scope="prop">
            <div>
              <img style="width:100px;" :src="prop.row.pic" alt="">
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="src"
          label="src"
        />
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="listen(props.row)">试听</el-button>
            <el-button type="primary" size="mini" @click="edit(props.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(props.row.id)">删除</el-button>

          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="src"
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
      :title="`${ isUpdate ? '更新' :'新增' }`"
      :visible.sync="musicFormVisible"
      @close="handleFormClose('musicForm')"
    >
      <el-form ref="musicForm" :model="musicForm" :rules="rules">
        <el-form-item label="歌曲名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="musicForm.title" />
        </el-form-item>
        <el-form-item label="歌曲专辑" prop="artist" :label-width="formLabelWidth">
          <el-input v-model="musicForm.artist" />
        </el-form-item>
        <el-form-item label="歌曲url" prop="src" :label-width="formLabelWidth">
          <uploadFile v-model="musicForm.src" accept=".mp3" bucket-name="dyhmusic">上传mp3</uploadFile>
        </el-form-item>
        <el-form-item label="歌手" prop="singer" :label-width="formLabelWidth">
          <el-input v-model="musicForm.singer" />
        </el-form-item>
        <el-form-item label="歌曲封面" prop="pic" :label-width="formLabelWidth">
          <uploadImage v-model="musicForm.pic" accept=".jpg,.png" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="musicFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('musicForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import uploadImage from '@/components/Upload/SingleImage'
import uploadFile from '@/components/Upload/uploadFile'
import { delMusic } from '@/api/music'
import { createFont } from '@/api/font'

export default {
  name: 'MusicList',
  components: {
    Pagination,
    uploadImage,
    uploadFile
  },
  data() {
    return {
      isUpdate: false,
      formLabelWidth: '120px',
      dialogVisible: false,
      musicFormVisible: false,
      pageIndex: 1,
      pageSize: 10,
      checkPoetry: {},
      keywords: '',
      musicForm: {
        artist: '',
        singer: '',
        src: '',
        pic: '',
        title: ''
      },
      rules: {
        src: [
          { required: true, message: '歌曲url', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '输入歌曲名称', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      musicList: (state) => state.music.musicList,
      total: (state) => state.music.total,
      loading: (state) => state.music.loading
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
      getMusicList: 'music/getMusicList',
      addMusic: 'music/addMusic',
      updateMusic: 'music/updateMusic'
    }),
    listen(row) {
      window.open(row.src)
    },
    getList() {
      this.getMusicList({ pageIndex: this.pageIndex, pageSize: this.pageSize, keywords: this.keywords }).then((data) => {
        const text = data.list.map((item) => item.title).join('')
        this.handleCreateFont(text)
      })
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this.musicForm', this.musicForm)
          if (this.isUpdate) { // 更新
            this.updateMusic(this.musicForm).then(res => {
              this.musicFormVisible = false
              this.getList()
            })
          } else {
            this.addMusic(this.musicForm).then(res => {
              this.musicFormVisible = false
              this.getList()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMusic({ id }).then(() => {
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    edit(row) {
      this.musicFormVisible = true
      this.isUpdate = true
      this.$nextTick(() => {
        this.musicForm = {
          ...row
        }
      })
    },
    search() {
      if (!this.keywords) {
        this.$message.info('请输入关键字')
        return false
      }
      this.initPageInfo()
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
      this.isUpdate = false
      this.$refs[formName].resetFields()
    },
    resetMusicFrom() {
      this.musicForm = {
        id: null,
        artist: '',
        singer: '',
        src: '',
        pic: '',
        title: ''
      }
    },
    handleCreateFont(text) {
      createFont({ font: 'piaoyiti', text }).then((res) => {
        let linkTag = ''
        linkTag = document.createElement('link')
        // linkTag.setAttribute('id', id)
        linkTag.setAttribute('href', res.data.css)
        linkTag.setAttribute('rel', 'stylesheet')
        linkTag.setAttribute('type', 'text/css')
        document.head.appendChild(linkTag)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.piaoyiti{
  font-family: piaoyiti;
}
</style>
