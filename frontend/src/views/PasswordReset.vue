<template>
    <div>
        <NavBar></NavBar>
        <ForgotPassword v-if="!this.$route.params.token"></ForgotPassword>
        <ChangePassword v-else></ChangePassword>
    </div>
</template>

<script>
import NavBar from '../components/nav/NavBar'
import ForgotPassword from '../components/login/ForgotPassword'
import ChangePassword from '../components/login/ChangePassword'

export default {
    name: 'PasswordReset',
    title: 'Se créer un compte',
    components: {
        NavBar,
        ForgotPassword,
        ChangePassword
    }  
}
</script>

<style>

</style>