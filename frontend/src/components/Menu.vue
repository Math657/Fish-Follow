<template>
  <div class="menu">
      <div class="items" v-for="item in links" v-bind:item="item" :key="item.name">
            <ul>
                <li><router-link :to="item.url">{{ item.name }}</router-link></li>
            </ul>
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


</style>