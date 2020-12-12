<template>
    <div>
        <NavBar></NavBar>
        <!-- <img alt="homme qui pêche" src="../assets/fishingbg2.png" class="img-fluid"> -->
        <Signup></Signup>
    </div>
</template>

<script>
import NavBar from '../components/nav/NavBar'
import Signup from '../components/login/Signup.vue'

export default {
    name: 'SignupPage',
    title: 'Se créer un compte',
    components: {
        NavBar,
        Signup
    }
    
}
</script>

<style>

</style>