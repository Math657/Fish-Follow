<template>
    <div class="header">
        <div class="content">
            <h2>Fish & Follow</h2>

            <div class="menu">
                <btn v-bind:btnName="connect"></btn>
                <btn btnName="btn 2"></btn>
            </div>

            <div :click="showMenu" class="iconMenu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </div>
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
    methods: {
        showMenu() {
            console.log("hello")
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
    padding: 20px;
    // background-color: #3A7226;
    // background-color: #13AA52;
    background-color: #0a3046;
    // display: flex;
}

h2 {
    color: white;
    text-align: center;
    margin-right: auto;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.iconMenu {
    display: none;
    color: white;
}

.bar {
    width: 20px;
    height: 3px;
    border: white 1px solid;
    margin: 5px;
    background-color: white;
}

@media only screen and (max-width: 900px) {
    .iconMenu {
        display: inline;
    }
    .menu {
        display: hidden;
    }
}

</style>