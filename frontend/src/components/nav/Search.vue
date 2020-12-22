<template>
   <div class="container-search">
        <form v-if="showSearch">
            <input v-model="searchInput" @keyup="getUsers()" id="search" name="search" type="text" placeholder="Rechercher" autofocus>
        </form>
        <font-awesome-icon v-on:click="showSearchField()" icon="search" class="icons search-icon"></font-awesome-icon>

        <div v-if="reveleModale && searchInput !== ''" class="bloc-modale">
            <div v-on:click="toggleModaleSearch()" class="overlay"></div>
            <div class="modale">Résultats :</div>
        </div>
        
        <!-- <ModaleSearch v-if="reveleModale && searchInput !== ''"
                      :toggleModaleSearch="toggleModaleSearch"></ModaleSearch> -->
   </div>
</template>

<script>
// import ModaleSearch from './ModaleSearch'

export default {
    name: 'Search',
    data() {
        return {
            showSearch: false,
            reveleModale: false,
            searchInput: '',
            users: []
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
            this.$http.post('http://localhost:3000/api/auth/search', {
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
        // ModaleSearch
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
    opacity: 90%;
}

input[type="text"]:focus {
    outline: none;
}

// ModaleSearch 
.bloc-modale {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modale {
    background: #f1f1f1;
    color: #0A3046;
    padding: 10px;
    position: absolute;
    top: 100%;
    right: 6%;
    width: 20em;
    height: 10em;
    border: 1px solid #0A3046;
    border-radius: 3px;
}

</style>

