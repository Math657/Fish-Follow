<template>
  <div class="home">
    <NavBar></NavBar>
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

</style>