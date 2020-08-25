<template>
  <div class="home">
    <NavBar></NavBar>
    <img alt="homme qui pêche" src="../assets/fishingbg.png" class="img-fluid">
    <HelloWorld msg="Bienvenue sur  Fish & Follow!"/>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavBar
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