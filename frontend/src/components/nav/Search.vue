<template>
   <div class="container-search">
        <form v-if="showSearch">
            <input v-model="searchInput" @keyup="getUsers()" id="search" name="search" type="text" placeholder="Rechercher" autofocus>
        </form>
        <font-awesome-icon v-on:click="showSearchField()" icon="search" class="icons search-icon"></font-awesome-icon>
        
        <ModaleSearch v-if="reveleModale && searchInput !== ''"
                      :toggleModaleSearch="toggleModaleSearch"
                      :usersFound="usersFound"></ModaleSearch>
   </div>
</template>

<script>
import ModaleSearch from './ModaleSearch'

export default {
    name: 'Search',
    data() {
        return {
            showSearch: false,
            reveleModale: false,
            searchInput: '',
            usersFound: []
        }
    },
    methods: {
        showSearchField() {
            this.showSearch = !this.showSearch 
        },
        toggleModaleSearch() {
            this.reveleModale = !this.reveleModale
        },
        getUsers() {
            this.reveleModale = true
            this.$http.post(`${this.$store.state.url}/api/auth/search`, {
                searchInput: this.searchInput
            })
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                this.checkIfTokenIsValid(err)
            })
        }
    },
    computed: {

    },
    components: {
        ModaleSearch
    }

}
</script>

<style lang="scss" scoped>

.container-search {
    display: flex;
    flex-direction: row;
    position: relative;
}

.icons {
    color: #ffffff;
    margin: 0 25px 0 0;
    font-size: 26px;
    margin-left: 1em;
}

.icons:hover {
    cursor: pointer;
    color: #bebcbc;
}

input[type="text"]:focus {
    outline: none;
}

</style>

