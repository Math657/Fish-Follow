<template>
    <div> 
        <div class="menu" v-if="$store.state.isLogged === false">
            <div v-for="item in links" v-bind:item="item" :key="item.name">
                <ul>
                    <li><router-link :to="item.url">{{ item.name }}</router-link></li>
                </ul>
            </div>
        </div>
        
        <div class="menu" v-else>

        </div>
    </div>
</template>

<script>

export default {
    name: 'Menu',
    props: [],
    data() {
        return {
            connect: "Se connecter",
            about: "A propos",

            links: [
                {name: 'Se connecter', url: '/login'},
                {name: 'Créer mon compte', url: '/signup'},
                // {name: 'Se déconnecter', url: '/'}
            ]
        }
    },
    components: {

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

@media only screen and (max-width: 900px) {
    .iconMenu {
        display: inline;
    }
    .menu {
        display: none;
    }
}


</style>