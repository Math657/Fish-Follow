<template>
    <div>
        <NavBar></NavBar>
        <MyProfile></MyProfile>
    </div>
</template>

<script>
import NavBar from '../components/nav/NavBar'
import MyProfile from '../components/profile/MyProfile.vue'

export default {
    name: 'MyProfilePage',
    components: {
        NavBar,
        MyProfile
    }

}
</script>

<style>

</style>