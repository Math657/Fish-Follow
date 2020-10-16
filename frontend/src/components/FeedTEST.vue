<template>
    <div class="container mt-4">
        <h2 v-if="allFishes.length > 0"></h2>
        <h2 v-else>Aucune prise récente</h2>
        <button class="mb-4 btn-main" id="btn-submit" @click="$router.push('/post')">Publier une prise</button>

        <ul class="feed">
            <li class="full-post" :key="i" v-for="(fishes, i) in allFishes">
                <div class="top-post">
                    <!-- <img :src="fishes.profilPic" alt="Photo de profil" class="img-circle profil-pic"> -->
                    <h6 class="username">{{ fishes.userFirstname }} {{ fishes.userLastname }}</h6>
                    <p class="post-date">{{ moment(fishes.createdAt).subtract('days').calendar() }}</p>
                </div>
                    
                <div class="content-post">
                    
                    <div class="fish-infos">
                        <h4 class="post-title">{{ fishes.postTitle }}</h4>
                        <p class="fish-details"><font-awesome-icon icon="fish" class="logos" data-toggle="tooltip" title="Espèce"/> {{ fishes.fishName }}</p>
                        <p class="fish-details"><font-awesome-icon icon="arrows-alt-h" class="logos" data-toggle="tooltip" title="Taille"/> {{ fishes.fishSize }} cm</p>
                        <div @click="seeMore()" class="fish-details btn-seemore">Voir plus</div>
                    </div>

                    <div v-if="fishes.fishPic != undefined" class="post-image">
                        <img :src="fishes.fishPic" alt="photo de la prise" class="fish-pic mb-2">
                    </div>
                    <div v-else>
                        <img src="../assets/fish-bg.png" alt="dessin d'un poisson" class="fish-pic mb-2">
                    </div>
                    <h6>Pêché le {{moment(fishes.date).format("Do MMMM YYYY")}}</h6>
                    
                </div>

                <div class="bottom-post">
                    <div class="btn-main" id="btn-like"><img src="../assets/fish-like.png" alt="Icône poisson" class="fish-like-icon" @click="sendLike(fishes._id)" data-toggle="tooltip" title="Fishez cette prise!" />J'aime</div>
                    <div class="btn-main" id="btn-comment" @click="comment()"><font-awesome-icon icon="comment" class="comment-icon"/>Commenter</div>
                    <div v-if="fishes.comments.length > 0">
                        <!-- calculer et afficher le nombre de commentaire -->
                        {{ fishes.comments.length + 1 }} commentaire(s)
                    </div>
                    <div v-else>
                        Aucun commentaire
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
     name: 'FeedTEST',
    data() {
        return {
            allFishes: [],
            seeMore: false,
            userID: JSON.parse(localStorage.getItem('userID'))
        }
    },
    methods: {
        // seeMore() {
            
        // },
        comment() {
            // this.$http.post(``)
        },
        sendLike(id) {
            this.$http.post(`http://localhost:3000/api/auth/like/${id}`, {
                like: 1,
                userID: this.userID
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    },
    mounted() {
        this.$http.get('http://localhost:3000/api/auth/home')
        .then((res) => {
            console.log(res)
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

<style lang="scss" scoped>

#btn-submit {
    padding: 0.5em 1em 0.5em 1em;
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

.feed {
    padding: 0;
}

.full-post {
    list-style-type: none;
    background-color: #FFFFFF;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 15px;
    box-shadow: 3px 3px 3px #c2c0c0;
    margin: 0 auto 2em auto;
    max-width: 50em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.top-post {
    width: 95%;
    height: 2.5em;
    margin: 0 auto 0 auto;
    padding: 10px;
    border-bottom: 1px solid rgb(189, 187, 187);
    display: flex;
    justify-content: flex-start;
}

.username {
    font-size: 14px;
    margin-right: auto;
}

.post-date {
    color:#818385;
    font-size: 12px;
}

.content-post {
    // height: 10em;
    // width: 20em;
}

.post-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    margin: 10px 0 10px 10px;
}

.fish-pic {
    max-width: 100%; 
    height: auto;
    /* border: 1px solid #0A3046; */
    // box-shadow: 3px 3px 3px #c2c0c0;
    // border-radius: 1px;
}

.fish-infos {
    display: flex;
    justify-content: space-around;
}

.fish-details {
    color: #0A3046;
    margin: 10px 0 10px 10px;
}

.btn-seemore:hover {
    cursor: pointer;
    opacity: 80%;
}

.bottom-post {
    width: 95%;
    height: 3em;
    margin: 0 auto 0 auto;
    padding: 10px;
    border-top: 1px solid rgb(189, 187, 187);
    display: flex;
    justify-content: flex-start;
}

#btn-like {
    width: 7em;
    padding: 3px 8px 3px 8px;
    font-size: 14px;
    margin-right: 2em;
}

.fish-like-icon {
    width: 25px;
    margin-right: 5px;
    filter: invert(92%) sepia(100%) saturate(30%) hue-rotate(201deg) brightness(109%) contrast(99%);
}

#btn-like:hover {
    cursor: pointer;
}

#btn-comment {
    width: 8em;
    padding: 3px 8px 3px 8px;
    font-size: 14px;
    margin-right: auto;
}

.comment-icon {
    margin-right: 5px;
}

#btn-comment:hover {
    cursor: pointer;
}

</style>
