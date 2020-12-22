<template>
    <div> 
        <div class="menu" v-if="$store.state.isLogged === false">
            <div v-for="item in linksOffline" v-bind:item="item" :key="item.name">
                <ul>
                    <li><router-link :to="item.url">{{ item.name }}</router-link></li>
                </ul>
            </div>
        </div>
        
        <div class="menu" v-else>
           <!-- <div v-for="item in linksOnline" v-bind:item="item" :key="item.name">
                <ul>
                    <li><router-link :to="item.url">{{ item.name }}</router-link></li>
                </ul>
            </div> -->
            <!-- <router-link :to="'/'"><font-awesome-icon icon="home" class="icons"></font-awesome-icon></router-link> -->
            <!-- <font-awesome-icon icon="search" class="icons"></font-awesome-icon> -->
            <Search></Search>
            <router-link :to="'/post/'"><font-awesome-icon icon="camera-retro" class="icons"></font-awesome-icon></router-link>
            <router-link :to="`/myprofile/${this.$store.state.userId}`"><font-awesome-icon icon="user" class="icons"></font-awesome-icon></router-link>
            <button class="btn-danger" id="btn-loggout" @click.prevent="logOut()">Se déconnecter</button>
        </div>    
    </div>
</template>

<script>
import Search from './Search'

export default {
    name: 'Menu',
    props: [],
    data() {
        return {
            connect: 'Se connecter',
            about: 'A propos',

            linksOffline: [
                {name: 'Se connecter', url: '/login'},
                {name: 'Créer mon compte', url: '/signup'}
            ],

            linksOnline: [
                // {name: 'Mon profil', url: `/myprofil/${JSON.parse(localStorage.getItem('userID'))}`},
                // {name: 'Publier une prise', url: '/post'},
                // {name: 'Se déconnecter', url: '/'}
            ]
        }
    },
    methods: {
        logOut(){
            localStorage.clear()
            sessionStorage.clear()
            this.$store.dispatch('LogOut')
        }
    },
    components: {
        Search
    }
}
</script>

<style lang="scss" scoped>

.menu {
    display: flex;
    flex-direction: row;
}

.items {
    list-style: none;
}

a {
    color: white;
}

ul {
    margin: 0;
    padding: 0 1em 0 0;
    overflow: hidden;
}

li a:hover {
    // background-color: red;
    text-decoration: none;
    color: white;
    opacity: 80%;
}

.icons {
    color: #ffffff;
    margin: 0 25px 0 0;
    font-size: 26px;
}

.icons:hover {
    cursor: pointer;
    opacity: 90%;
}

@media only screen and (max-width: 759px) {
    .iconMenu {
        display: inline;
    }
    .menu {
        display: none;
    }
}

</style>