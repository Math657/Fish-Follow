<template>
  <div class="home">
        <NavBar></NavBar>
        <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid">
        <!-- <HelloWorld msg="Bienvenue sur  Fish & Follow!"/> -->
        <div v-if="$store.state.isLogged === false">
            <Login></Login>
        </div>
            
        <div v-else>
            <Feed></Feed>
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Login from '../components/Login.vue'
import Feed from '../components/Feed.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    Login,
    Feed
  }
}
</script>

<style lang="scss" scoped>

img {
//   max-width:230px;
//   max-height:250px;
//   width: auto;
//   height: auto;
//   opacity: 80%;
}

</style>