<template>
  <div>
    <gs:video-live id="videoComponent" ref="videoComponent" site="hzjcjy.gensee.com" ctx="training" ownerid="f4Zb3TYYZa" uid="" uname="" authcode="123456" bar="false" />
    detail
  </div>
</template>
<script type="text/javascript" src="http://static.gensee.com/webcast/static/sdk/js/gssdk.js"></script>

<script>

export default {
  mounted () {
    // var uid=$('#videoComponent').attr('uid');
    //根据组获得通讯通道
    var channel = GS.createChannel();

    //直播状态监听
    channel.bind("onStart", (event)=> {
      console.log(event);
      this.$message.success('播放中')
    });
  },
}
</script>

<style lang="scss" scoped>

</style>
