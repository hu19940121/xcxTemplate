<template>
  <div class="topNav">
    <div class="navInner">
      <div class="left">
        <img class="logo" src="./images/ll.jpg" alt="logo">
        <router-link to="/workList" active-class="active">
          <a class="nav-item">首页</a>
        </router-link>
        <a class="nav-item">发现2222</a>
        <a class="nav-item">最新</a>
      </div>
      <div class="right">
        <el-input v-model="input" placeholder="请输入内容" />
        <el-button type="primary" class="btn search" @click="notOpen">搜索</el-button>
        <el-button type="danger" class="btn register" @click="notOpen">注册</el-button>
        <el-button type="success" class="btn login" @click="notOpen">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    notOpen() {
      this.$message.info('暂未开放')
    }
  }
}
</script>

<style lang="scss" scoped>
.topNav{
  width: 100%;
  box-shadow: 0px 1px 1px rgba(0.1, 0.1, 0.1, 0.1);
  .navInner{
    display: flex;
    justify-content: space-between;
    max-width: 1496px;
    height: 48px;
    margin: 0 auto;
    padding:0 20px;
    box-sizing: border-box;
    .left{
      display: flex;
      align-items: center;
      .logo{
        width: 50px;
      }
      .nav-item{
        padding: 0 20px;
      }
    }
    .active{
      color:red
    }
    .right {
      display: flex;
      align-items: center;
      .btn{
        &.search{
          margin-right:30px;
        }
      }
    }
  }
}
</style>
