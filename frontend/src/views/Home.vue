<template>
  <div class="home">
    <NavBar></NavBar>
    <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid">
    <!-- <HelloWorld msg="Bienvenue sur  Fish & Follow!"/> -->
    <Login></Login>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    Login
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