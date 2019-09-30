<template>
  <div class="xcxPush app-container">
    <el-row>
      <!--eslint-disable-next-line no-irregular-whitespace -->
      <el-col :xs="24" :md="20" :lg="20">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1" />
          <el-step title="步骤 2" />
        </el-steps>
        <div class="step-wrapper">
          <div v-if="active === 0" class="step1">
            <el-button style="margin-bottom:10px;" type="primary">选择模版</el-button>
            <el-card :body-style="{ padding: '10px'}">
              <div class="step1-w">
                <div class="left">
                  <div class="choosed-moban">
                    <p>电影开场提醒</p>
                    <div class="choosed-item">
                      <span class="choosed-item-l">影片</span>
                      <el-input v-model="pushData.data.keyword1.value" class="choosed-item-r" type="textarea" :rows="2" placeholder="请输入内容" />
                    </div>
                    <div class="choosed-item">
                      <span class="choosed-item-l">推荐理由</span>
                      <el-input v-model="pushData.data.keyword2.value" class="choosed-item-r" type="textarea" :rows="2" placeholder="请输入内容" />
                    </div>
                    <div class="choosed-item">
                      <span class="choosed-item-l">推荐指数</span>
                      <el-input v-model="pushData.data.keyword3.value" class="choosed-item-r" type="textarea" :rows="2" placeholder="请输入内容" />
                    </div>
                    <div class="choosed-item">
                      <span class="choosed-item-l">备注</span>
                      <el-input v-model="pushData.data.keyword4.value" class="choosed-item-r" type="textarea" :rows="2" placeholder="请输入内容" />
                    </div>
                  </div>
                </div>
                <div class="right">
                  <p>模版预览</p>
                  <div class="moban">
                    <div class="title">
                      <p>
                        <span>
                          梦如南笙
                        </span>
                      </p>
                      <span>…</span>
                    </div>
                    <div class="content">
                      <p class="c-title">电影开场提醒</p>
                      <p class="c-item">
                        <span class="c-item-l">
                          影片
                        </span>
                        <span class="c-item-r">
                          {{ pushData.data.keyword1.value }}
                        </span>
                      </p>
                      <p class="c-item">
                        <span class="c-item-l">
                          推荐理由
                        </span>
                        <span class="c-item-r">
                          {{ pushData.data.keyword2.value }}
                        </span>
                      </p>
                      <p class="c-item">
                        <span class="c-item-l">
                          推荐指数
                        </span>
                        <span class="c-item-r">
                          {{ pushData.data.keyword3.value }}
                        </span>
                      </p>
                      <p class="c-item">
                        <span class="c-item-l">
                          备注
                        </span>
                        <span class="c-item-r">
                          {{ pushData.data.keyword4.value }}
                        </span>
                      </p>
                    </div>
                    <div class="footer">
                      <div class="f-item">
                        <span>进入小程序查看</span>
                        <span>></span>
                      </div>
                      <div class="f-item">
                        <span>拒收通知</span>
                        <span>></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <div v-if="active === 1" class="step2">
            <el-card :body-style="{ padding: '10px' }">
              <div slot="header">
                <span>选择推送目标</span>
              </div>
              <div class="table-wrapper">
                <el-table
                  :data="formIds"
                  style="width: 100%"
                >
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="formIds">
                          <div v-if="props.row.userFormIds.length > 0">
                            <div>
                              <p v-for="(item,index) in props.row.userFormIds" :key="index">
                                {{ item.form_id }} 到期时间 {{ item.expire_time | dateformat }}
                              </p>
                            </div>
                          </div>
                          <div v-else>
                            用户无formid
                          </div>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="avatarUrl"
                    width="180"
                  >
                    <template slot-scope="props">
                      <img style="width:50px;height:50px;border-radius:50%;" :src="props.row.avatarUrl" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="nickName"
                    label="昵称"
                    width="180"
                  />
                  <el-table-column
                    prop="open_id"
                    label="openid"
                    width="180"
                  />
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.userFormIds.length > 0"
                        size="mini"
                        type="primary"
                        :loading="pushLoading && scope.$index === currentBtnLoadingIndex"
                        @click="push(scope.$index, scope.row)"
                      >
                        {{ pushLoading && scope.$index === currentBtnLoadingIndex ? '推送中' :'推送' }}
                      </el-button>
                      <el-button
                        v-else
                        size="mini"
                        type="danger"
                        :disabled="true"
                      >
                        无有效formId
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </div>
        <div class="next-btn">
          <el-button v-if="active >0 " @click="prev">上一步</el-button>
          <el-button v-if=" active !== 1 " type="primary" @click="next">下一步</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentBtnLoadingIndex: 0,
      pushLoading: false,
      active: 0,
      pushData: {
        touser: '',
        template_id: 'MSFDWI_HOjo_BORGMOoZkNS2wFKZArx6OoFbbKYcOvA', // 电影模版
        form_id: '',
        data: {
          keyword1: { value: '' },
          keyword2: { value: '' },
          keyword3: { value: '' },
          keyword4: { value: '' }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['formIds'])
  },
  created() {
    // this.getFormIds()
    this.getFormIds()
    console.log('formids', this.formIds)
  },
  methods: {
    ...mapActions({
      getFormIds: 'user/getFormIds' // 将 `this.add()` 映射为 `this.$store.dispatch
    }),
    ...mapActions({
      xcxPush: 'user/xcxPush'
    }),
    next() {
      if (this.active++ > 1) return
    },
    prev() {
      if (this.active-- <= 0) return
    },
    push(index, row) {
      this.pushLoading = true
      this.currentBtnLoadingIndex = index
      this.pushData.touser = row.open_id
      this.pushData.form_id = row.userFormIds[0].form_id
      this.xcxPush(this.pushData).then(res => {
        this.pushLoading = false
        if (res.code === 0) {
          this.getFormIds()
          this.$message({
            message: '推送成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xcxPush{
  .step-wrapper{
    padding:20px;
    .step1{
      .step1-w{
        display: flex;
        .left{
          flex: 5;
          font-size: 14px;
          .choosed-moban{
            padding:20px;
            .choosed-item{
              display: flex;
              align-items: center;
              margin:20px 0;
              .choosed-item-l{
                flex: 1
              }
              .choosed-item-r{
                flex: 4
              }
            }
          }
        }
        .right{
          flex:4;
          box-sizing: border-box;
          padding: 20px;
          background: #f8f8f9;
          .moban{
            background: #fff;
            .title{
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 50px;
              padding-left:20px;
              border-bottom:1px solid #eee;
            }
            .content{
              padding:10px 20px;
              .c-item{
                display: flex;
                font-size: 14px;
                &-l{
                  flex:2;
                  color:#8b8b8b;
                }
                &-r{
                  flex:6
                }
              }
            }
            .footer{
              font-size: 14px;
              .f-item{
                display: flex;
                justify-content: space-between;
                padding : 8px 18px;
                border-top: 1px solid #eee
              }
            }
          }
        }
      }
    }
  }
  .next-btn{
    display: flex;
    justify-content: center;
  }
}
</style>
