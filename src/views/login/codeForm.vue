<template>
  <div>
    <el-form ref="form" :model="form" :rules="loginRules" auto-complete="on" label-position="left">
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="form.phone"
          placeholder="请输入手机号"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="flex align-center">
          <el-input
            ref="code"
            v-model="form.code"
            placeholder="请输入验证码"
            type="text"
          />
          <code-timer :start="codeStart" @end="handleCodeEnd" @click.native.prevent="sendCode" />
        </div>

      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import codeTimer from '@/components/codeTimer'
import { sendLoginCode } from '@/api/code'
export default {
  components: {
    codeTimer
  },
  data() {
    return {
      codeStart: false,
      loading: false,
      form: {
        phone: '',
        code: ''
      },
      loginRules: {
        phone: [{ required: true, message: '手机号不能为空', trigger: 'change' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleCodeStart() {
      console.log('发送')
    },
    handleCodeEnd() {
      this.codeStart = false
    },
    sendCode() {
      if (!this.form.phone) {
        this.$message.warning('请输入手机号')
        return false
      }
      if (!this.checkPhone(this.form.phone)) {
        this.$message.warning('请输入正确手机号')
        return false
      }
      sendLoginCode({ phone: this.form.phone }).then(() => {
        this.codeStart = true
      })
    },
    checkPhone(phone) {
      const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
      return reg.test(phone)
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/codeLogin', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/admin' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>
