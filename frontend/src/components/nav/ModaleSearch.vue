<template>
    <div class="bloc-modale">
        <div v-on:click="toggleModaleSearch" class="overlay"></div>
        
        <div class="modale">    
            <div v-if="usersFound.length > 0">
                <h6>Résultat</h6>
                <ul class="results">
                    <li :key="i" v-for="(users, i) in usersFound">
                        <router-link class="username-pic" :to="`/user/${usersFound[i]._id}`" data-toggle="tooltip" title="Voir le profil" >
                            <div v-if="usersFound.length > 0" id="comment-profil-pic">
                                <img :src="usersFound[i].profilPic" alt="Photo de profil">
                            </div>
                            <p class="following-name">{{ usersFound[i].firstname }} {{ usersFound[i].lastname }}</p>
                        </router-link>
                    </li>
                </ul>        
            </div>

            <div v-else>
                <h6>Aucun résultat trouvé</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModaleSearch',
    props: ['toggleModaleSearch', 'usersFound'],
    data() {
        return {
            
        }
    },
    mounted() {
        
    }

}
</script>

<style>

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
    /* background: #f1f1f1; */
    background: #ffffff;
    color: #0A3046;
    padding: 10px;
    position: absolute;
    top: 99%;
    right: 6%;
    width: 20em;
    /* height: 10em; */
    border: 1px solid #0A3046;
    border-radius: 3px;
}
</style>

