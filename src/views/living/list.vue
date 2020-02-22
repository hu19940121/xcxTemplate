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
  computed: {
    ...mapGetters(['roomList'])
  },
  created() {
    this.getRoomList()
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
