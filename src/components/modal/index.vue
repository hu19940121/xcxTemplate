<template>
  <div v-if="visible" class="modal">
    <div class="inner-modal">
      <el-button @click="close">关闭</el-button>
      {{ value }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    }
  },
  watch: {
    value(val) {
      console.log('val', val)
      this.visible = val
    }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal{
	position: fixed;
	top: 0;
	left: 0;
	right:0;
	bottom: 0;
	background-color: rgba(0,0,0,0.3);
	.inner-modal{
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 500px;
		height: 300px;
		background-color:red;
	}
}

</style>
