<template>
  <div>
      <NavBar></NavBar>
      <UserProfile></UserProfile>
  </div>
</template>

<script>
import NavBar from '../components/nav/NavBar.vue'
import UserProfile from '../components/profile/UserProfile.vue'

export default {
    name: 'UserProfilePage',
    title: 'Profil utilisateur',
    components: {
        NavBar,
        UserProfile
    }

}
</script>

<style>

</style>