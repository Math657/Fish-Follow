<template>
    <div>
        <NavBar></NavBar>
        <Profile></Profile>
    </div>
</template>

<script>
import NavBar from '../components/nav/NavBar'
import Profile from '../components/profile/ProfileComp'

export default {
    name: 'MyProfile',
    components: {
        NavBar,
        Profile
    }

}
</script>

<style>

</style>