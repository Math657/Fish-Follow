<template>
    <div>
        <div class="my-profile-infos" v-if="userInfos.length > 0">
            <img :src="userInfos[0].profilPic" alt="Photo de profil" class="profile-pic">
            <div class="user-infos">
                <h4 id="username">{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
                <h4 id="user-email">{{ userInfos[0].email }}</h4>
                <h6 id="user-fishLike">{{ userInfos[0].fishLike }} Fish Like <font-awesome-icon icon="exclamation-circle" class="icons" data-toggle="tooltip" title="Les Fish Like représentent le nombre total de J'aime que vous avez reçu sur vos publications." /></h6>

                <div class="followers">
                    <h4 v-on:click="toggleModaleFollowers()" id="followers">{{ userInfos[0].followers.length }} followers</h4>
                    <h4 v-on:click="toggleModaleFollowings()" id="following">{{ userInfos[0].following.length }} following</h4>
                </div>

                <p v-on:click="toggleModale" class="delete-profile mt-3">Supprimer mon compte</p>

                <ModaleDelete :revele="revele" :toggleModale="toggleModale"></ModaleDelete>
                
                <ModaleFollowers :reveleFollowers="reveleFollowers"
                                 :toggleModaleFollowers="toggleModaleFollowers"
                                 :id="this.checkUserId()"
                                 :userFollowers="userInfos[0].followers"
                                 :userFollowings="userInfos[0].following">
                </ModaleFollowers>

                <ModaleFollowings :reveleFollowings="reveleFollowings"
                                  :toggleModaleFollowings="toggleModaleFollowings"
                                  :id="this.checkUserId()"
                                  :userFollowers="userInfos[0].followers"
                                  :userFollowings="userInfos[0].following">
                </ModaleFollowings>
                
            </div>
    
        </div>

        <div v-if="userPosts.length > 0" class="user-posts">
            <h3 class="user-posts-title mb-2">Mes prises</h3>
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
            
            <button class="my-3 btn-main" id="btn-submit" @click="$router.push('/post')">Publier une prise</button>
        
    </div>
</template>

<script>
import ModaleDelete from './ModaleDelete'
import ModaleFollowers from './ModaleFollowers'
import ModaleFollowings from './ModaleFollowings'

export default {
    name: 'MyProfile',
    data() {
        return {
            userInfos: [],
            userPosts: [],
            revele: false,
            reveleFollowers: false,
            reveleFollowings: false
        }
    },
    methods: {
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
        this.$http.get(`${this.$store.state.url}/api/auth/profile/${this.checkUserId()}`) //get User Infos
        .then(res => {
            this.userInfos.push(res.data.user)
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        })

        // Get User Posts
        this.$http.get(`${this.$store.state.url}/api/auth/profile/posts/${this.checkUserId()}`)
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
        ModaleDelete,
        ModaleFollowers,
        ModaleFollowings
    }

}
</script>

<style>

.my-profile-infos {
    max-width: 40em;
    margin: 1em auto 1em auto; 
    padding-bottom: 1em;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.profile-pic {
    display: block;
    width: 150px;
    height: 190px;
    object-fit: cover;
    float: left;
}

.user-infos h4:hover {
    cursor: pointer;
}

#username {
    font-weight: bold;
}

#user-email {
    font-size: 18px;
}

.followers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 2em
}

.delete-profile {
    color: rgb(121, 10, 10);
    margin-right: 2em;
    font-size: 14px;
    width: 11em;
    text-align: right;
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

.user-posts-list li {
    padding: 1em;
    margin-right: auto;
    margin-left: auto;
}

.post-thumb {
    max-width: 180px;
}


@media only screen and (max-width: 759px) {

    .my-profile-infos {
        padding-bottom: 0em;
    }

    .profile-pic {
        display: block;
        width: 150px;
        height: 200px;
        object-fit: cover;
        margin-left: 1em;
        margin-bottom: 1em;
        float: left;
    }
}

</style>