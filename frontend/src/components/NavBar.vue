<template>
    <div class="header">
        <h2>Fish & Follow</h2>
        <btn v-bind:btnName="connect"></btn>
        <btn btnName="btn 2"></btn>
    </div>
</template>

<script>
import Btn from './Btn.vue'
export default {
    name: 'NavBar',
    data() {
        return {
            connect: "Se connecter"
        }
    },
    components: {
        Btn
    }
    
}
</script>

<style lang="scss" scoped>

.header {
    height: 10%; 
    background-color: #3A7226;
    // background-color: #13AA52;
    // display: flex;
}

h2 {
    color: white;
    text-align: center;
    padding: 20px;
    margin: 0;
}

</style>