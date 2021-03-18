<template>
  <div class="home">
        <NavBar></NavBar>
        <div v-if="this.checkIfLogged() === false">
            <Login></Login>
        </div>
            
        <div v-else>
            <DynamicFeed></DynamicFeed>
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/nav/NavBar.vue'
import Login from '../components/login/Login.vue'
import DynamicFeed from '../components/feed/DynamicFeed.vue'

export default {
  name: 'Home',
  title: 'Fish & Follow',
  created() {
      this.$root.$refs.A = this
  },
  methods: {
      forceRerender() {
          this.$forceUpdate()
      }
  },
  components: {
    NavBar,
    Login,
    DynamicFeed
  }
}
</script>

<style lang="scss" scoped>

</style>