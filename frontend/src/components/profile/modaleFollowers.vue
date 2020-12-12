<template>
    <div class="bloc-modale" v-if="reveleFollowers">

        <div v-on:click="toggleModaleFollowers; getFollowers();" class="overlay"></div>

            <div class="modale card">
                <div class="top-modale">
                    <h5>Followers</h5>
                    <button v-on:click="toggleModaleFollowers"><font-awesome-icon icon="times" class="logos" /></button>
                </div>

                <div class="content-modale">
                    <ul class="followers-list">
                        <li :key="i" v-for="(followers, i) in allFollowers">
                             <router-link class="username-pic" :to="`/user/${allFollowers[i]._id}`" data-toggle="tooltip" title="Voir le profil" >
                                <div v-if="allFollowers.length > 0" id="comment-profil-pic">
                                    <img :src="allFollowers[i].profilPic" alt="Photo de profil">
                                </div>
                                <p class="follower-name">{{ allFollowers[i].firstname }} {{ allFollowers[i].lastname }}</p>
                            </router-link>

                            <!-- créer component follow -->

                            <div v-if="!isFollow" v-on:click="follow(allFollowers[i]._id)" class="btn-main btn-follow"><font-awesome-icon icon="plus" class="icons-plus"/>Suivre</div>
                            <div v-if="isFollow" v-on:click="follow()" class="btn-main btn-following"><font-awesome-icon icon="check" class="icons-plus"/>Suivis</div>
                        </li>
                    </ul>     
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'ModaleFollowers',
    props: ['reveleFollowers', 'toggleModaleFollowers'],
    data() {
        return  {
            allFollowers: [],
            isFollow: false
        }
    },
    mounted() {
         this.$http.get(`http://localhost:3000/api/auth/myprofile/followers/${this.$store.state.userId}`)
        .then(res => {
            for (let followers of res.data.allFollowers) {
                this.allFollowers.push(followers)
            }
        })
        .catch(err => {
             this.checkIfTokenIsValid(err)
        })
    },
    methods: {
        // follow(userId) {
        //     this.$http.post('http://localhost:3000/api/auth/follow', {
        //         targetUser:userId,
        //         authorID: this.$store.state.userId
        //     })
        //     .then(res => {
        //         console.log(res)
        //         this.isFollow = !this.isFollow
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // }
    }

}
</script>

<style lang="scss" scoped>

.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modale {
    background: #f1f1f1;
    color: #0A3046;
    padding: 10px;
    position: fixed;
    bottom: 60%;
    width: 25em;
}

.top-modale {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid rgb(189, 187, 187);  
}

.top-modale h5 {
    margin-right: auto;
}

.top-modale button {
    border: none;
    font-size: 24px;
    background: #f1f1f1;
    color: #0A3046;
}

.followers-list {
    list-style: none;
    margin: 1em;
    padding-left: 0;
}

.followers-list li {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
}


.follower-name {
    color: #0A3046;
    margin-left: 1em;
}

@media only screen and (max-width: 559px) { 
    .modale {
        position: fixed;
        bottom: 60%;
        width: 70vw;
    }
}

</style>

