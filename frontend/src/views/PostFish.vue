<template>
  <div>
      <!-- <NavBar></NavBar> -->
      <Top></Top>
      <!-- <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid"> -->
      <FishSubmit></FishSubmit>
  </div>
</template>

<script>
// import NavBar from '../components/NavBar.vue'
import Top from '../components/Top'
import FishSubmit from '../components/FishSubmit.vue'

export default {
    name: 'PostFish',
    components: {
        Top,
        // NavBar,
        FishSubmit,
    }
}
</script>

<style>

</style>