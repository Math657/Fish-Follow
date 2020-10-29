<template>
    <div>
        <div class="top-post">
            <router-link class="username-pic" :to="`/user/${userId}`" data-toggle="tooltip" title="Voir le profil" >
                <div v-if="userInfos.length > 0" id="profil-pic">
                    <img :src="userInfos[0].profilPic" alt="Photo de profil">
                </div>
                    
                <h6 class="username">{{ userFirstname }} {{ userLastname }}</h6>
            </router-link>
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
                <div class="btn-main" id="btn-comment" @click="showBoxToComment()"><font-awesome-icon icon="comment" class="comment-icon"/>Commenter</div>
                
                <div v-if="nbComments.length > 0" @click="showBoxToComment()" class="show-comments">
                    <div class="nb-comments">{{ nbComments.length }} 
                        <p v-if="nbComments.length > 1"> commentaires</p>
                        <p v-else> commentaire</p>
                    </div>
                </div>
                <div v-else>
                    Aucun commentaire
                </div>
            </div>
            
            <Comment :postID="this.postID"
                     :userLastname="this.userLastname"
                     :userFirstname="this.userFirstname" 
                     :showBoxComments="this.showBoxComments" @toPost="handler"></Comment>

        </div>
    </div>
</template>

<script>
import Comment from './Comment'

export default {
    name: 'Post',
    data() {
        return {
            seeMoreDetails: false,
            comment: '',
            nbComments: [],
            userInfos: [],
            showBoxComments: false
        }
    },
    methods: {  
        handler(value) {
            this.nbComments.push(value)
        } ,
        seeMore() {
            this.seeMoreDetails = true
        },
        showBoxToComment() {
            this.showBoxComments = true
        },
    },
    // sendLike(id) {
    //         this.$http.post(`http://localhost:3000/api/auth/like/${id}`, {
    //             like: 1,
    //             userID: this.userID
    //         })
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     },
    mounted() {
        this.$http.get(`http://localhost:3000/api/auth/myprofile/${this.userId}`)
        .then(res => {
            this.userInfos.push(res.data.user)
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        })
    },
     props: {
        postID: String,
        postTitle: String,
        userId: String,
        userFirstname: String,
        userLastname: String,
        date: String,
        createdAt: String,
        fishPic: String,
        fishName: String,
        fishSize: Number,
        water: String,
        location: String,
        bait: String,
        fishingSettup: String,
        description: String,
        usersLiked: Array,
        likes: Number
    },
    components: {
        Comment
    }
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
    align-items: center;
}

.username-pic {
    display: flex;
    flex-direction: row;
    margin-right: auto;
    color: #000000;
}

.username-pic:hover {
    text-decoration: none;
}

#profil-pic {
    /* position:relative; */
    overflow:hidden;
    border-radius: 50%;
    height: 2em;
    width: 2em;
}

#profil-pic img {
    /* position: absolute; */
    height: 2em;
    width: 2em;
    /* max-width: 100%; */
}




.username {
    font-size: 14px;
    margin-right: auto;
    margin-left: 0.5em;
    margin-bottom: 0.3em;
}

.post-date {
    color:#818385;
    font-size: 12px;
    margin-bottom: 0;
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

.nb-comments {
    display: flex;
}

.nb-comments p {
    color: #2c3e50;
    margin-left: 4px;
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