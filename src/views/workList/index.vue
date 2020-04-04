<template>
  <div class="workList">
    <p class="piaoyiti">
      你好中国
    </p>
    <p class="UniTortred">
      abcdefg
    </p>
    <vue-waterfall-easy :imgs-arr="imgsArr" :height="clientHeight - 50" @scrollReachBottom="getData">
      <div slot-scope="props" class="img-info">
        <p class="some-info">第{{ props.index+1 }}张图片</p>
        <p class="some-info">{{ props.value.info }}</p>
      </div>
    </vue-waterfall-easy>
    <modal v-model="visible" />
    <div class="f">
      <!-- {{ visible }}
      <el-button @click="visible = true">打开</el-button> -->

    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import modal from '@/components/modal'
import { createFont } from '@/api/font'
export default {
  components: {
    vueWaterfallEasy,
    modal
  },
  data() {
    return {
      visible: false,
      clientHeight: 0,
      imgsArr: [
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        },
        {
          'src': 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg',
          'href': 'https://www.baidu.com',
          'info': '一些图片描述文字'
        }
      ]
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
    // this.handleCreateFont()
    // console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  methods: {
    handleCreateFont() {
      createFont({ font: 'piaoyiti', text: '你好中国' }).then((res) => {
        let linkTag = ''
        linkTag = document.createElement('link')
        // linkTag.setAttribute('id', id)
        linkTag.setAttribute('href', res.data.css)
        linkTag.setAttribute('rel', 'stylesheet')
        linkTag.setAttribute('type', 'text/css')
        document.head.appendChild(linkTag)
      })
    },
    getData() {
      console.log('daodile~~~')
    }
  }
}
</script>

<style lang="scss" scoped>
.workList{
  .piaoyiti{
    font-family: piaoyiti;
  }
  .UniTortred{
    font-family: UniTortred;
  }
  .f{
    position: fixed;
    top: 10px;
    left: 10px;
  }
}
</style>
