<template>
  <div class="home">
        <NavBar></NavBar>
        <!-- <Top></Top> -->
        <!-- <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid img-banner"> -->
        <!-- <HelloWorld msg="Bienvenue sur  Fish & Follow!"/> -->
        <div v-if="$store.state.isLogged === false">
            <Login></Login>
        </div>
            
        <div v-else>
            <!-- <Feed></Feed> -->
            <FeedTEST></FeedTEST>
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Login from '../components/Login.vue'
// import Feed from '../components/Feed.vue'
import FeedTEST from '../components/FeedTEST.vue'
// import Top from '../components/Top.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    Login,
    // Feed,
    FeedTEST
    // Top
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

@media only screen and (max-width: 759px) {
    img {
        display: none;
    }
}

</style>