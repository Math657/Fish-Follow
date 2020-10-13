<template>
    <div class="header">
        <div class="content">
            <router-link to="/home" class="main-title"><h2>Fish & Follow</h2></router-link>
            <Menu></Menu>
            <Sidebar></Sidebar>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue'
import Sidebar from './Sidebar.vue'

export default {
    name: 'NavBar',
    props: [],
    data() {
        return {
            sidebar: false
        }
    },
    methods: {
        showVerticalMenu: function() {
            this.sidebar = !this.sidebar
            console.log('menu!')
        }
    },
    components: {
        Menu,
        Sidebar
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

h2, .main-title {
    color: white;
    text-align: center;
    margin-right: auto;
    text-decoration:none;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.iconMenu {
    display: none;
    color: white;
    cursor: pointer;
}

.iconMenu:hover {
    opacity: 80%;
}

.bar {
    width: 20px;
    height: 3px;
    border: white 1px solid;
    margin: 5px;
    background-color: white;
}

@media only screen and (max-width: 759px) {
    // .iconMenu {
    //     display: inline;
    // }
    .menu {
        display: none;
    }
}

</style>