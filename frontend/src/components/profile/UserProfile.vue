<template>
    <div>
        <div class="profile-infos" v-if="userInfos.length > 0">
            <img :src="userInfos[0].profilPic" alt="Photo de profil" class="profile-pic">
            <div class="user-infos">
                <div class="username-follow">
                    <h4 id="username">{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
                    <h6 id="user-fishLike">{{ userInfos[0].fishLike }} Fish Like <font-awesome-icon icon="exclamation-circle" class="icons" data-toggle="tooltip" title="Les Fish Like sont le nombre total de J'aime sur vos prises que vous avez reçu" /></h6>
                <div v-if="!doFollow" v-on:click="follow()" class="btn-main btn-follow btn-center"><font-awesome-icon icon="plus" class="icons-plus"/>Suivre</div>
                <div v-if="doFollow" v-on:click="follow()" class="btn-main btn-following btn-center"><font-awesome-icon icon="check" class="icons-plus"/>Suivis</div>
                </div>
                

                <div class="followers">
                    <h4 v-on:click="toggleModaleFollowers()" id="followers">{{ userInfos[0].followers.length }} followers</h4>
                    <h4 v-on:click="toggleModaleFollowings()" id="following">{{ userInfos[0].following.length }} following</h4>
                </div>

                <!-- v-if admin -->
                <!-- <p v-on:click="toggleModale" class="delete-profile mt-3">Supprimer mon compte</p> -->

                <!-- <modaleDelete :revele="revele" :toggleModale="toggleModale"></modaleDelete> -->

                <modaleFollowers :reveleFollowers="reveleFollowers"
                                 :toggleModaleFollowers="toggleModaleFollowers"
                                 :id="this.$route.params.id"
                                 :userFollowers="userInfos[0].followers"
                                 :userFollowings="userInfos[0].following">
                </modaleFollowers>

                <modaleFollowings :reveleFollowings="reveleFollowings"
                                  :toggleModaleFollowings="toggleModaleFollowings"
                                  :id="this.$route.params.id"
                                  :userFollowers="userInfos[0].followers"
                                  :userFollowings="userInfos[0].following">
                </modaleFollowings>
   
            </div>
        </div>

        <div v-if="userPosts.length > 0" class="user-posts">
            <h3 class="user-posts-title mb-2">Prises de {{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h3>
            <ul class="user-posts-list">
                <li :key="i" v-for="(fishes, i) in userPosts">
                    <h5>{{ fishes.postTitle }}</h5>
                    <img :src="fishes.fishPic" alt="photo de la prise" class="post-thumb">
                </li>
            </ul>
        </div>

        <div v-else>
            <h3 class="user-posts-title">Aucune prise publiée</h3>
        </div>
        
    </div>
</template>

<script>
import ModaleFollowers from './ModaleFollowers'
import ModaleFollowings from './ModaleFollowings'

export default {
    name: 'UserProfile',
    data() {
        return {
            userId: this.$route.params.id,
            userInfos: [],
            userPosts: [],
            doFollow: false,
            revele: false,
            reveleFollowers: false,
            reveleFollowings: false
        }
    },
    methods: {
        follow() {
            this.$http.post(`${this.$store.state.url}/api/auth/follow`, {
                targetUser: this.userId,
                authorID: this.$store.state.userId
            })
            .then(() => {
                this.doFollow ? this.userInfos[0].followers.length -= 1 : this.userInfos[0].followers.length += 1
                this.doFollow = !this.doFollow
            })
            .catch(err => {
                console.log(err)
            })
        },
        toggleModale: function() {
            this.revele = !this.revele
        },
        toggleModaleFollowers() {
            this.reveleFollowers = !this.reveleFollowers
        },
        toggleModaleFollowings() {
            this.reveleFollowings = !this.reveleFollowings
        }
    },
    mounted(){
        this.$http.get(`http://localhost:3000/api/auth/profile/${this.userId}`) //get User Infos
        .then(res => {
            this.userInfos.push(res.data.user)
            console.log(this.userInfos[0].followers.length)
            if (this.userInfos[0].followers.includes(this.$store.state.userId)) {
                this.doFollow = !this.doFollow
            }
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        })

        // Get User Posts
        this.$http.get(`http://localhost:3000/api/auth/profile/posts/${this.userId}`)
        .then(res => {
            if (res.data.fishes) {
                for (let fish of res.data.fishes) {
                    this.userPosts.push(fish)
                }    
            }
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        }) 
    },
    components: {
        ModaleFollowers,
        ModaleFollowings
    }

}
</script>

<style>

.profile-infos {
    /* background-color: #FFFFFF; */
    /* border: 1px solid rgb(219, 219, 219); */
    /* border-radius: 15px; */
    /* box-shadow: 3px 3px 3px #c2c0c0; */
    max-width: 40em;
    margin: 1em auto 1em auto; 
    padding-bottom: 4em;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.profile-pic {
    display: block;
    width: 150px;
    height: 200px;
    object-fit: cover;
    /* margin: 1em; */
    float: left;
}

.user-infos {
    /* margin-top: 1em; */
}

#username {
    font-weight: bold;
}

.username-follow{
    /* display: flex;
    flex-direction: row; */
    /* margin-left: 20em; */
}

.btn-follow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #02a0fc;
    width: 5em;
    height: 2em;
}

.btn-follow:hover {
    cursor: pointer;
}

.btn-following {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #064d79;
    width: 5em;
    height: 2em;
}

.btn-following:hover {
    cursor: pointer;
}

.btn-center {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
}

.icons-plus {
    margin-right: 5px;
}

.followers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 2em
}

.delete-profile {
    color: rgb(121, 10, 10);
    margin-left: auto;
}

.delete-profile:hover {
    cursor: pointer;
    color: red;
}


.user-posts-title {
    margin-top: 1em;
}

.user-posts-list {
    list-style: none;
    padding: 0;
}


@media only screen and (max-width: 759px) {

    .username-follow{
        /* display: flex;
        flex-wrap: wrap;
        margin-left: 17em;
        margin-right: 2em; */
    }

    .profile-infos {
        padding-bottom: 2em;
    }

    .profile-pic {
        display: block;
        width: 130px;
        height: 173px;
        object-fit: cover;
        margin-left: 1em;
        margin-bottom: 1em;
        float: left;
    }
}

@media only screen and (max-width: 399px) { 
    .followers {
        display: flex;
        flex-direction: column;
    }

    .followers h4 {
        font-size: 18px;
    }
}

</style>