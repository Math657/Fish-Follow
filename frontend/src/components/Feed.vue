<template>
  <div class="container feed mt-4">
        <h2 v-if="allFishes.length > 0"></h2>
        <h2 v-else>Aucune prise récente</h2>
        <button class="mb-4 btn-main" id="btn-submit" @click="$router.push('/post')">Publier une prise</button>

        <ul class="feed-list">
           <li class="fullPost" :key="i" v-for="(fishes, i) in allFishes">
               <div class="fish_list">
               <!-- <router-link :to="`/home/${fishes.title}`"> -->
                    <div class="pic-preview text-dark px-3 pt-2"> 
                        <h4>{{ fishes.postTitle }}</h4>
                        <img :src="fishes.fishPic" alt="photo de la prise" class="fishPic mb-3">
                        <p class="infos_fish">Pêché le {{moment(fishes.date).format("Do MMMM YYYY")}}</p>

                        <div id="user-post">
                             <!-- <img :src="fishes.profilPic" alt="Photo de profil" class="img-circle profil-pic"> -->
                             <p class="infos_fish">{{ fishes.userFirstname }} {{ fishes.userLastname }}</p>
                        </div>
                    </div>

                    <div class="infos_settup">
                        <ul class="details-list">
                            <li><font-awesome-icon icon="fish" class="logos" data-toggle="tooltip" title="Espèce"/> {{ fishes.fishName }}</li>
                            <li><font-awesome-icon icon="arrows-alt-h" class="logos" data-toggle="tooltip" title="Taille"/> {{ fishes.fishSize }} cm</li>
                            <li><font-awesome-icon icon="map-marker-alt" class="logos" data-toggle="tooltip" title="Lieu"/> {{ fishes.location }}</li>
                            <li><font-awesome-icon icon="water" class="logos" data-toggle="tooltip" title="Court d'eau"/> {{ fishes.water }}</li>
                            <li><img alt="logo d'un leurre" src="../assets/bait-logo.png" class="logos bait-logo" data-toggle="tooltip" title="Leurre/appât utilisé"> {{ fishes.bait }}</li>
                        </ul>             
                    </div>
                </div>

                <div id="bottom-post">
                    <div class="btn-main" id="btn-comment">Commenter</div>
                    <p id="post-date">Publié le {{ moment(fishes.createdAt).subtract(10, 'days').calendar() }}</p>
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

.feed-list {
    padding: 0;
    /* margin-left: auto;
    margin-right: auto;
    vertical-align: center; */
}

.fullPost {
    list-style-type: none;
    background-color: #FFFFFF;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 15px;
    box-shadow: 3px 3px 3px #c2c0c0;
    margin-bottom: 2em;
}

.fish_list {
    display: flex;
    flex-direction: row;
    text-align: left;
}

.pic-preview {
    margin: 1em 0 0 1em;
}

.infos_fish {
    /* text-align: right; */
    margin-right: 0.5em;
    color: #0A3046;
    max-width: 20em;
}

.infos_settup {
    color: #0A3046;
    text-align: left;
    font-size: 18px;
}

.infos_art:active {
    text-decoration: none !important;
}

.fishPic {
    width:100%;
    max-width:20em;
    max-height: 15em;
    /* border: 1px solid #0A3046; */
    box-shadow: 3px 3px 3px #c2c0c0;
    border-radius: 1px;
}

.details-list {
    list-style-type: none;
    padding: 0;
}

.details-list>li {
    margin: 1em 1em 1em 0;
}

.logos {
    margin: 0em 1em 0em 1em;
    max-width: 1.5em;
    font-size: 22px;
    color: #0A3046;
}

.bait-logo {
    /* max-width: 1.5em; */
    filter: invert(16%) sepia(10%) saturate(5324%) hue-rotate(166deg) brightness(86%) contrast(95%);
}

#user-post {
    display: flex;
}

.btn-main {
    background-color:#0A3046;
    color:#FFFFFF;
    border-radius: 5px;
    border: none;
    padding: 0.5em 1em 0.5em 1em;
}

.btn-main:hover {
    opacity: 90%;
}

#bottom-post {
    display: flex;
}

#post-date {
    margin: 1em;
    padding: 0;
    color:#0A3046;
    font-size: 12px;
}

#btn-comment {
    /* margin-right: 500px; */
    width: 8em;
    margin: 0 auto 1em 2em;
    padding: 3px 8px 3px 8px;
}

#btn-comment:hover {
    cursor: pointer;
}

#btn-submit {
    padding: 0.5em 1em 0.5em 1em;
}

</style>