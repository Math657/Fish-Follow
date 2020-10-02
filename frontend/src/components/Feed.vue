<template>
  <div class="container feed mt-4">
        <h2 v-if="allFishes.length > 0">Dernières publications</h2>
        <h2 v-else>Aucune prise récente</h2>
        <button class="mb-4" @click="$router.push('/post')">Publier une prise</button>

        <ul>
           <li class="fish_list" :key="i" v-for="(fishes, i) in allFishes">
               <!-- <router-link :to="`/home/${fishes.title}`"> -->
               <!-- <hr class="line">  -->
                    <div class="text-dark m-3 px-3 pt-2"> 
                          
                            <h3>{{ fishes.fishName }}</h3>
                            <img :src="fishes.fishPic" alt="photo de la prise" class="fishPic mb-3">
                            <p class="infos_fish">Pêché le {{moment(fishes.date).format("Do MMMM YYYY")}} par {{ fishes.userFirstname }} {{ fishes.userLastname }}</p>
                    </div>
                    <div class="infos_settup">
                        <h5 class="mt-5">Taille : {{ fishes.fishSize }} cm</h5>
                        <h5 class="mt-3">Lieu : {{ fishes.location }}</h5>
                        <h5 class="mt-3">Eau : {{ fishes.water }}</h5>
                        <h5 class="mt-3">Leurre utilisé : {{ fishes.bait }}</h5>
                    </div>
               <!-- </router-link> -->
           </li>
        </ul>
      
  </div>
</template>

<script>


export default {
    name: 'Feed',
    data() {
        return {
            allFishes: []
        }
    },
    mounted() {
        this.$http.get('http://localhost:3000/api/auth/home')
        .then((res) => {
            for (let fish of res.data) {          
                    this.allFishes.push(fish)   
                }
        })
        .catch((error) => {
            console.log(error)
        })
    }

}
</script>

<style>

.fish_list {
    list-style-type: none;
    background-color: #FFFFFF;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    box-shadow: 3px 3px 3px #c2c0c0;
    margin-bottom: 2em;
    /* text-align: left; */
    display: flex;
    flex-direction: row;
}

.infos_fish {
    /* text-align: right; */
    margin-right: 0.5em;
    color: #0A3046;
}

.infos_settup {
    color: #0A3046;
    text-align: left;
}

.infos_art:active {
    text-decoration: none !important;
}

.fishPic {
    width:100%;
    max-width:300px;
    /* border: 1px solid #0A3046; */
    box-shadow: 3px 3px 3px #c2c0c0;
    border-radius: 1px;
}

</style>