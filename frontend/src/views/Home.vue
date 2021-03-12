<template>
  <div class="home">
        <NavBar></NavBar>
        <div v-if="this.checkIfLogged() === false">
        <!-- <div v-if="!$store.state.isLogged"> -->
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

// img {
    
//   max-width:230px;
//   max-height:250px;
//   width: auto;
//   height: auto;
//   opacity: 80%;

// }

@media only screen and (max-width: 759px) {
    img {
        display: none;
    }
}

</style>