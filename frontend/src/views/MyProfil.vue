<template>
    <div>
        <NavBar></NavBar>
        <Profil></Profil>
    </div>
</template>

<script>
import NavBar from '../components/nav/NavBar'
import Profil from '../components/profil/Profil'
export default {
    name: 'MyProfil',
    components: {
        NavBar,
        Profil
    }

}
</script>

<style>

</style>