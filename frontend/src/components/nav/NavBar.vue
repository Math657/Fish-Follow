<template>
    <div class="header">
        <div class="content">
            <!-- <img src="../../assets/logo_fishfollow.png" alt="logo" class="logo" width="45px"> -->
            <router-link to="/" class="main-title"><h2>Fish & Follow</h2></router-link>
            <Menu></Menu>
            <Burger></Burger>
            <Sidebar2>
                <ul v-if="this.checkIfLogged() === true" class="sidebar-panel-nav">
                    <li @click="closeSidebarPanel" class="brand"><router-link to="/">Fish & Follow</router-link></li>
                    <!-- <li @click="closeSidebarPanel"><router-link to="/home"><font-awesome-icon icon="home" class="icon-menu" />Accueil</router-link></li> -->
                    <li @click="closeSidebarPanel"><router-link to="/post"><font-awesome-icon icon="camera-retro" class="icon-menu" />Publier</router-link></li>
                    <li @click="closeSidebarPanel"><router-link :to="`/myprofile/${this.checkUserId()}`"><font-awesome-icon icon="user" class="icon-menu" />Mon profil</router-link></li>
                    <li @click="closeSidebarPanel"><router-link to="/myprofile"><font-awesome-icon icon="cog" class="icon-menu" />Paramètres</router-link></li>
                    <li @click="closeSidebarPanel"><button class="btn" id="btn-logout"  @click.prevent="logOut()"><font-awesome-icon icon="sign-out-alt" class="icon-menu" />Se déconnecter</button></li>
                </ul>

                <ul v-else class="sidebar-panel-nav">
                    <li @click="closeSidebarPanel" class="brand"><router-link to="/">Fish & Follow</router-link></li>
                    <li @click="closeSidebarPanel"><router-link to="/login">Se connecter</router-link></li>
                    <li @click="closeSidebarPanel"><router-link to="/signup">Créer un compte</router-link></li>
                </ul>
            </Sidebar2>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue'
// import Sidebar from './Sidebar.vue'
import Burger from './Burger.vue'
import Sidebar2 from './Sidebar2.vue'

export default {
    name: 'NavBar',
    props: [],
    data() {
        return {
            sidebar: false
        }
    },
    created() {
      this.$root.$refs.C = this
    },
    methods: {
        closeSidebarPanel() {
            this.$store.dispatch('NavOpen')
        },
        forceRerender() {
            this.$forceUpdate()
        },
        logOut(){
            this.loggout()
        }
    },
    components: {
        Menu,
        // Sidebar,
        Burger,
        Sidebar2,
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
    font-weight: bold;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.logo {
    margin-right: 1em;
}

.iconMenu {
    display: none;
    color: white;
    cursor: pointer;
}

.iconMenu:hover {
    opacity: 0.8;
}

/* ///////////////////////////////////////// */

ul.sidebar-panel-nav {
   list-style-type: none;
   padding-left: 0;
}

ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
//    font-size: 1.5rem;
   display: block;
//    padding-bottom: 0.5em;  
}

/*    TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST     */


li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #0c2636;
    // width: 200px;
    height: 86px;
    background-color: #0a3046;
    font-size: 20px;
}

.brand {
    font-size: 28px;
    color: #ffffff;
    font-weight: bolder;
}

li:last-child {
    border-bottom: none;
    // margin-top: 50vh;
}

#btn-logout {
    color: #ffffff;
}

.icon-menu {
    color:#ffffff;
    margin-left: -10px;
    margin-right: 10px;
}

#btn-logout {
    font-size: 20px;
}

#btn-logout:hover {
    opacity: 0.8;
}

a {
    color: #ffffff !important;
}

li a:hover {
    text-decoration: none;
    color: white;
    opacity: 0.8;
}
  



@media only screen and (max-width: 759px) {
    // .iconMenu {
    //     display: inline;
    // }
    .menu {
        display: none;
    }
    #burger {
        display: inline;
    }
}

</style>