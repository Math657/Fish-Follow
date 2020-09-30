<template>
  <div class="container feed mt-4">
        <h2 v-if="allFishes.length > 0">Dernières publications</h2>
        <h2 v-else>Aucune prise récente</h2>
        <button class="mb-4" @click="$router.push('/post')">Publier une prise</button>

        <ul>
           <li class="fish_list" :key="i" v-for="(fishes, i) in allfishes">
               <router-link :to="`/home/${fishes.title}`">
                    <div class="text-dark m-3 px-3 pt-2"> 
                        <hr class="line">   
                            <h3>{{ fishes.fishName }}</h3>
                            <h6 class="infos_fish">{{ fishes.author_name}}, <span>{{moment(fishes.createdAt).format("Do MMMM YYYY")}}</span></h6>
                            
                    </div>
               </router-link>
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
            for (let fish of res.data.fishes) {          
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
    margin-bottom: 2em;
    text-align: left;
}

.infos_fish {
    text-align: right;
    margin-right: 0.5em;
    color: #0069D9;
}

.infos_art:active {
    text-decoration: none !important;
}

</style>