<template>
    <div>
        <div class="top-post">
                <!-- <img :src="profilPic" alt="Photo de profil" class="img-circle profil-pic"> -->
                <h6 class="username">{{ userFirstname }} {{ userLastname }}</h6>
                <p class="post-date">{{ moment(createdAt).subtract('days').calendar() }}</p>
            </div>
                
            <div class="content-post">
                
                <div class="fish-infos">
                    <div class="base-details">
                        <h4 class="post-title">{{ postTitle }}</h4>
                        <p class="fish-details"><font-awesome-icon icon="fish" class="logos" data-toggle="tooltip" title="Espèce"/> {{ fishName }}</p>
                        <p class="fish-details"><font-awesome-icon icon="arrows-alt-h" class="logos" data-toggle="tooltip" title="Taille"/> {{ fishSize }} cm</p>
                        <div @click="seeMore()" v-if="!seeMoreDetails" class="fish-details btn-seemore">Voir plus</div>
                    </div>

                    <div v-if="seeMoreDetails" class="more-fish-details">
                        <p class="fish-details"><font-awesome-icon icon="water" class="logos" data-toggle="tooltip" title="Zone d'eau"/> {{ water }}</p>
                        <div class="bait-div"><img alt="logo d'un leurre" src="../../assets/bait-logo.png" class="logos bait-logo" data-toggle="tooltip" title="Leurre/appât utilisé"> {{ bait }}</div>
                        <p class="fish-details"><font-awesome-icon icon="map-marker-alt" class="logos" data-toggle="tooltip" title="Lieu"/> {{ location }}</p>
                    </div>
                    <div v-if="seeMoreDetails" class="more-fish-details">
                        <p class="fish-details"><font-awesome-icon icon="wrench" class="logos" data-toggle="tooltip" title="Montage utilisé"/> {{ fishingSettup }}</p>
                        <p class="fish-details"><font-awesome-icon icon="info-circle" class="logos" data-toggle="tooltip" title="Description"/> {{ description }}</p>
                    </div>
                </div>

                <div v-if="fishPic != undefined" class="post-image">
                    <img :src="fishPic" alt="photo de la prise" class="fish-pic mb-2">
                </div>
                <div v-else>
                    <img src="../../assets/fish-bg.png" alt="dessin d'un poisson" class="fish-pic mb-2">
                </div>
                <h6>Pêché le {{moment(date).format("Do MMMM YYYY")}}</h6>
                
            </div>

            <div>
                <div class="bottom-post">
                    <div class="btn-main" id="btn-like"><img src="../../assets/fish-like.png" alt="Icône poisson" class="fish-like-icon" @click="sendLike(id)" data-toggle="tooltip" title="Fishez cette prise!" />J'aime</div>
                    <div class="btn-main" id="btn-comment" @click="showBoxToComment = !showBoxToComment"><font-awesome-icon icon="comment" class="comment-icon"/>Commenter</div>
                    <div v-if="comments.length > 0">
                        {{ comments.length + 1 }} commentaire(s)
                    </div>
                    <div v-else>
                        Aucun commentaire
                    </div>
                </div>
                
                <div v-if="showBoxToComment">
                    <textarea rows="2" type="text" class="form-control box-comment" maxlength="200" placeholder="Votre commentaire..." v-model="comment"></textarea>
                    <button class="mb-3 btn-main" id="send-comment" @click="submitComment()">Envoyer</button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            seeMoreDetails: false,
            showBoxToComment: false,
            comment: []
        }
    },
    methods: {
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
        },
        seeMore() {
            this.seeMoreDetails = true
        },
        checkComment() {
            if (this.comment === []) {
                return false
            }
            else {
                return true
            }
        },
        submitComment() {
            if (this.checkComment()) {
                this.$http.post(``)
            }
            else {
                console.log('Votre commentaire ne peut pas être vide!')
            }  
        }
    },
    props: {
        id: String,
        postTitle: String,
        userFirstname: String,
        userLastname: String,
        date: Object,
        createdAt: Object,
        fishPic: String,
        fishName: String,
        fishSize: String,
        water: String,
        location: String,
        bait: String,
        fishingSettup: String,
        description: String,
        usersLiked: Array,
        likes: Number,
        comments: Array
    },
}
</script>

<style>

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

.post-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    margin: 10px 0 10px 10px;
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

.fish-pic {
    max-width: 100%; 
    height: auto;
    border: 1px solid #e2e2e2;
}

.fish-details {
    color: #0A3046;
    margin: 10px 0 10px 10px;
}

.base-details {
    display: flex;
    justify-content: space-evenly;
}

.more-fish-details {
    display: flex;
    justify-content: space-evenly;
}

.bait-div {
    margin-top: auto;
    margin-bottom: auto;
}

.bait-logo {
    width: 1.7em;
    height: 1em;
    filter: invert(16%) sepia(10%) saturate(5324%) hue-rotate(166deg) brightness(86%) contrast(95%);
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

.box-comment {
    margin: 1em 1em 1em 1em;
    max-width: 25em;
}

#send-comment {
    width: 8em;
    padding: 3px 8px 3px 8px;
    font-size: 16px;
    margin-right: auto;
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

/* .background-overlay {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
} */

</style>