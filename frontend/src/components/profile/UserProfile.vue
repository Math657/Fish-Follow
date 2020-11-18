<template>
  <div>
        <div class="profile-infos" v-if="userInfos.length > 0">
            <img :src="userInfos[0].profilPic" alt="Photo de profil" class="profile-pic">
            <div class="user-infos">
                <div class="username-follow">
                    <h4 id="username">{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
                <div :click="follow()" class="btn-main btn-follow"><font-awesome-icon icon="plus" class="icons-plus"/>Suivre</div>
                </div>
                

                <div class="followers">
                    <h4 id="followers">{{ userInfos[0].followers.length }} followers</h4>
                    <h4 id="following">{{ userInfos[0].following.length }} following</h4>
                </div>

                <!-- v-if admin -->
                <!-- <p v-on:click="toggleModale" class="delete-profile mt-3">Supprimer mon compte</p> -->

                <!-- <modaleDelete :revele="revele" :toggleModale="toggleModale"></modaleDelete> -->

                
            </div>
    
        </div>

        <div v-if="userPosts.length > 0" class="user-posts">
            <h3 class="user-posts-title mb-5">Prises de {{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h3>
            <ul class="user-posts-list">
                <li :key="i" v-for="(fishes, i) in userPosts">
                    <h5>{{ fishes.postTitle }}</h5>
                </li>
            </ul>
        </div>

        <div v-else>
            <h3 class="user-posts-title">Aucune prise publiée</h3>
        </div>
            

        
    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            userId: this.$route.params.id,
            userInfos: [],
            userPosts: []
        }
    },
    methods: {
        follow() {

        }
    },
    mounted(){
        this.$http.get(`http://localhost:3000/api/auth/myprofile/${this.userId}`) //get User Infos
        .then(res => {
            this.userInfos.push(res.data.user)
            console.log(this.userInfos[0].following)
            // if (userInfos[0].following.includes) {

            // }
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
    padding-bottom: 5em;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.profile-pic {
    display: block;
    max-width:17em;
    max-height:12em;
    width: auto;
    height: auto;
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
    display: flex;
    flex-direction: row;
    margin-left: 20em;
}

.btn-follow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 5em;
    height: 2em;
    background-color: #02a0fc;
    margin-left: 2em;
}

.btn-follow:hover {
    cursor: pointer;
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

.user-posts-list li {
    
}


@media only screen and (max-width: 759px) {

    .username-follow{
        display: flex;
        flex-wrap: wrap;
        margin-left: 17em;
        margin-right: 2em;
    }

    .profile-infos {
        padding-bottom: 2.5em;
    }

    .profile-pic {
        display: block;
        max-width:12em;
        max-height:10em;
        width: auto;
        height: auto;
        margin-left: 1em;
        margin-bottom: 1em;
        float: left;
    }
}

</style>