<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :before-upload="beforeUpload"
      class="image-uploader"
      drag
      action="//up-z2.qiniup.com/"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img :src="imageUrl + '?imageView2/1/w/550/h/314'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQiniuToken as getToken } from '@/api/qiniu'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(fileUrl) {
      // console.log('this.tempUrl + val', this.tempUrl + '/' + file.response.key)
      console.log('fileUrl', fileUrl)

      this.$emit('input', fileUrl)
    },
    handleImageSuccess(res, file) {
      // console.log('res', res)
      // console.log('file', file)

      // console.log('fileList', fileList)

      this.emitInput(this.tempUrl + '/' + file.response.key)
    },
    beforeUpload(file) {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken()
          .then(response => {
            console.log('response.data.', response.data)

            // const key = response.data.qiniu_key
            const token = response.data.token
            _self._data.dataObj.token = token
            // _self._data.dataObj.key = key
            _self._data.dataObj.key = file.name // 设置key就是文件名

            this.tempUrl = response.data.url
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            reject(false)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 60%;
    float: left;
  }
  .image-preview {
    width: 200px;
    /* height: 200px; */
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
