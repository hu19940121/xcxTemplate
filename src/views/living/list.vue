<template>
  <div>
    <div v-for="item in roomList" :key="item.id">{{ item.subject }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  created() {
    this.getRoomList()
  },
  computed: {
    ...mapGetters(['roomList'])
  },
  methods: {
    ...mapActions({
      getRoomList: 'room/getRoomList'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
