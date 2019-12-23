
<template>
  <div class="upload-file">
    <el-upload
      action="//up-z2.qiniup.com/"
      :data="token"
      :before-upload="beforeAvatarUpload"
      :on-success="uploadSuccess"
    >
      <el-button size="small" type="primary">{{ btnText }}</el-button>
    </el-upload>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  props: {
    btnText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.qiniu.token
    })
  },
  created() {
    this.getQiniuToken()
  },
  methods: {
    ...mapActions({
      getQiniuToken: 'qiniu/getQiniuToken'
    }),
    uploadSuccess(res, fileInfo) {
      const url = `${this.token.url}/${res.key}`
      this.$emit('success', { name: fileInfo.name, url })
    },
    beforeAvatarUpload(file) {
      const name = file.name.split('.')
      const ext = name.splice(name.length - 1, 1)[0]
      this.token.key = name[0] + moment(new Date().getTime()).format('YYYY-MM-DD HH:mm') + '.' + ext
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
