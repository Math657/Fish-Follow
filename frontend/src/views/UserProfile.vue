<template>
  <div>
      <NavBar></NavBar>
      <UserProfileComp></UserProfileComp>
  </div>
</template>

<script>
import NavBar from '../components/nav/NavBar.vue'
import UserProfileComp from '../components/profile/UserProfileComp.vue'

export default {
    name: 'UserProfile',
    components: {
        NavBar,
        UserProfileComp
    }

}
</script>

<style>

</style>