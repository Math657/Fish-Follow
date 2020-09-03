<template>
    <div>
        <NavBar></NavBar>
        <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid">
        <Signup></Signup>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Signup from '../components/Signup.vue'

export default {
    name: 'SignupPage',
    components: {
        NavBar,
        Signup
    }
    
}
</script>

<style>

</style>