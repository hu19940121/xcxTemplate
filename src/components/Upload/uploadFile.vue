<template>
  <div class="upload-file">
    <el-upload
      action="//up-z2.qiniup.com/"
      :data="token"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
    >
      <el-button type="primary" size="small">
        <slot />
      </el-button>
      <div slot="tip">
        {{ fileUrl || '' }}
      </div>
    </el-upload>
  </div>
</template>
<script>
import { getQiniuToken } from '@/api/qiniu'
// import { uuid } from '@/utils'
export default {
  props: {
    btnText: {
      type: String,
      default: ''
    },
    fileType: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      token: {}
    }
  },
  computed: {
    fileUrl() {
      return this.value
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    getToken() {
      getQiniuToken().then(res => {
        this.token = res.data || {}
      })
    },
    emitInput(fileUrl) {
      this.$emit('input', fileUrl)
    },
    uploadSuccess(res, fileInfo) {
      const url = `${this.token.url}/${res.key}`
      // this.$emit('success', { name: fileInfo.name, url })
      this.emitInput(url)
    },
    beforeUpload(file) {
      const name = file.name.split('.')
      const ext = name.splice(name.length - 1, 1)[0] // 取出扩展名
      if (this.fileType.length > 0) {
        if (!this.fileType.includes(ext)) {
          this.$Message.error(`上传的文件类型必须为${this.fileType.join(',')}`)
          return false
        }
      }
      this.token.key = file.name

      // this.token.key = file.name + uuid()
      // name[0] + this.formatTime(new Date().getTime(), true) + '.' + ext
      return true
    }
  }
}
</script>

<style lang="stylus" scoped></style>
