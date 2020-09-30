<template>
  <div>
      <NavBar></NavBar>
      <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid">
      <FishSubmit></FishSubmit>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import FishSubmit from '../components/FishSubmit.vue'

export default {
    name: 'PostFish',
    components: {
        NavBar,
        FishSubmit
    }
}
</script>

<style>

</style>