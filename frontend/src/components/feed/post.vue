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
                    <p v-if="description" class="fish-details"><font-awesome-icon icon="info-circle" class="logos" data-toggle="tooltip" title="Description"/> {{ description }}</p>
                </div>
            </div>

            <div v-if="fishPic != undefined" class="post-image">
                <img :src="fishPic" alt="photo de la prise" class="fish-pic mb-2">
            </div>
            <div v-else>
                <img src="../../assets/fish-bg.png" alt="dessin d'un poisson" class="fish-pic mb-2">
            </div>
            <div class="under-pic">
                <h6 class="nb-like">{{ nbLikes }} <img src="../../assets/fish-icon2.png" alt="Icône d'un poisson" class="fish-like-icon"></h6>
                <h6>Pêché le {{moment(date).format("Do MMMM YYYY")}}</h6>
            </div>
            
            
        </div>

        <div>
            <div class="bottom-post">
                <div id="btn-like" :class="{ liked: likePost, 'btn-main': !likePost }" @click="sendLike()" data-toggle="tooltip" title="Fishez, ou plutôt likez cette prise!" ><img src="../../assets/fish-icon2.png" alt="Icône d'un poisson" class="btn-fish-like-icon">{{ likeBtn }}</div>
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
                     :showBoxComments="this.showBoxComments" @toPost="handler">
            </Comment>

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
            showBoxComments: false,
            likePost: null,
            nbLikes: this.likes,
            likeBtn: 'J\'aime'
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
        sendLike() {
            this.$http.post(`http://localhost:3000/api/auth/like/${this.postID}`, {
                userID: JSON.parse(localStorage.getItem('userID'))
            })
            .then((res) => {
                console.log(res.data)
                this.likePost = res.data.like
                res.data.like ? this.nbLikes += 1 : this.nbLikes -=1
            })
            .catch((err) => {
                this.checkIfTokenIsValid(err)
            })
        }
    },
    // computed: {
    //     nbLikes()  {
    //         return this.likes
    //     }
    // },
    mounted() {
        this.$http.get(`http://localhost:3000/api/auth/myprofile/${this.userId}`) // Get user data
        .then(res => {
            this.userInfos.push(res.data.user)
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        })


        // Get user likeStatut
        this.$http.get(`http://localhost:3000/api/auth/likeStatut/${this.postID}/${JSON.parse(localStorage.getItem('userID'))}`)
        .then(res => {
            this.likePost = res.data.like
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
/*///////////////  POST TOP  /////////////////////*/

.top-post {
    width: 95%;
    height: 2.5em;
    margin: 0.5em auto 0.5em auto;
    padding: 20px 10px 25px 10px;
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
    border: 1px solid #e2e2e2;
    height: 2em;
    width: 2em;
}

#profil-pic img {
    /* position: absolute; */
    height: 2.2em;
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

/*///////////////  POST BODY  /////////////////////*/

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

.under-pic {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.nb-like {
    color: #0A3046;
    font-weight: bold;
}

.fish-like-icon {
    filter: invert(16%) sepia(10%) saturate(5324%) hue-rotate(166deg) brightness(86%) contrast(95%);
    height: 1.2em;
}

/*///////////////  POST BOTTOM  /////////////////////*/

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

.btn-fish-like-icon {
    width: 20px;
    margin-right: 5px;
    filter: invert(92%) sepia(100%) saturate(30%) hue-rotate(201deg) brightness(109%) contrast(99%);
}

#btn-like:hover {
    cursor: pointer;
}

.btn-main {
    background-color:#0A3046;
    /* background-color:#0d7dbe; */
    color:#FFFFFF;
    border-radius: 5px;
    border: none;
    padding: 0.5em 1em 0.5em 1em;
}

.btn-main:hover, .liked:hover {
    opacity: 90%;
}

.liked {
    background-color:#02a0fc;
    /* background-color:#0A3046; */
    color:#FFFFFF;
    border-radius: 5px;
    border: none;
    padding: 0.5em 1em 0.5em 1em;
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