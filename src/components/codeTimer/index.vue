<template>
  <div>
    <el-button style="width:100px;" type="primary" :disabled="!show">{{ show ? '发送验证码' :count + 's' }}</el-button>
  </div>
</template>

<script>
const TIME_COUNT = 60 // 倒计时的时间

export default {
  props: {
    start: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: !this.start,
      count: '',
      timer: null
    }
  },
  watch: {
    start(val) {
      this.show = !val
      val && this.getCode()
    }
  },
  methods: {
    getCode() {
      // 验证码倒计时
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.$emit('start')
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.$emit('end')
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
