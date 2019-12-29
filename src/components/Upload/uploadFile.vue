<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      multiple
      v-bind="$attrs"
      action="//up-z2.qiniup.com/"
      :data="token"
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
    },
    bucketName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      token: {},
      tempUrl: ''
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
      this.$refs.upload.clearFiles()
    },
    beforeUpload(file) {
      const _self = this
      return new Promise((resolve, reject) => {
        getQiniuToken({ bucketName: this.bucketName || null })
          .then(response => {
            // const key = response.data.qiniu_key
            const tokenObj = response.data
            _self._data.token = tokenObj
            // _self._data.dataObj.key = key
            _self._data.token.key = file.name // 设置key就是文件名
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            reject(false)
          })
      })

      // const name = file.name.split('.')
      // const ext = name.splice(name.length - 1, 1)[0] // 取出扩展名
      // if (this.fileType.length > 0) {
      //   if (!this.fileType.includes(ext)) {
      //     this.$Message.error(`上传的文件类型必须为${this.fileType.join(',')}`)
      //     return false
      //   }
      // }
      // this.token.key = file.name

      // this.token.key = file.name + uuid()
      // name[0] + this.formatTime(new Date().getTime(), true) + '.' + ext
      // return true
    }
  }
}
</script>

<style lang="stylus" scoped></style>
