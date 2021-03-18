<template>
    <div class="bloc-modale" v-if="reveleFollowers">

        <div v-on:click="toggleModaleFollowers" class="overlay"></div>

            <div class="modale-followers card">
                <div class="top-modale">
                    <h5>Followers</h5>
                    <button v-on:click="toggleModaleFollowers"><font-awesome-icon icon="times" class="logos" /></button>
                </div>

                <div v-if="allFollowers.length > 0" class="content-modale">
                    <ul class="followers-list">
                        <li :key="i" v-for="(followers, i) in allFollowers">
                            <router-link class="username-pic" :to="`/user/${allFollowers[i]._id}`" data-toggle="tooltip" title="Voir le profil" >
                                <div v-if="allFollowers.length > 0" id="comment-profil-pic">
                                    <img :src="allFollowers[i].profilPic" alt="Photo de profil">
                                </div>
                                <p class="follower-name">{{ allFollowers[i].firstname }} {{ allFollowers[i].lastname }}</p>
                            </router-link>

                            <Follow :targetUserId="allFollowers[i]._id"
                                    :userFollowers="userFollowers"
                                    :userFollowings="userFollowings">
                            </Follow>
                        </li>
                    </ul>     
                </div>
                <div v-if="someFollowersDeleted">
                    <p class="follower-name mt-4">Certains utilisateurs ont supprimé leur compte.</p>
                </div>
                <div v-else>
                    <p class="follower-name mt-4">Aucun follower</p>
                </div>
            </div>
    </div>
</template>

<script>
import Follow from './Follow'
// import router from '../../router/index'

export default {
    name: 'ModaleFollowers',
    props: ['reveleFollowers', 'toggleModaleFollowers', 'id', 'userFollowers', 'userFollowings', 'nbFollowers'],
    data() {
        return  {
            allFollowers: [],
            doFollow: false,
            someFollowersDeleted: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.$http.get(`${this.$store.state.url}/api/auth/profile/followers/${this.id}`)
            .then(res => {
                for (let followers of res.data.allFollowers) {
                    this.allFollowers.push(followers)
                }
                if (this.nbFollowers !== res.data.allFollowers.length) {
                    this.someFollowersDeleted = true
                }
            })
            .catch(err => {
                this.checkIfTokenIsValid(err)
            })
        }
    },
    components: {
        Follow
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

.modale-followers {
    background: #f1f1f1;
    color: #0A3046;
    padding: 10px;
    position: fixed;
    top: 20%;
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

ul:last-child {
    margin-bottom: 0;
}

@media only screen and (max-width: 559px) { 
    .modale {
        position: fixed;
        top: 20%;
        width: 70vw;
    }
}

</style>

