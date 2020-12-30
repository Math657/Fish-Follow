<template>
    <div class="bloc-modale" v-if="reveleFollowings">

        <div v-on:click="toggleModaleFollowings" class="overlay"></div>

            <div class="modale-followings card">
                <div class="top-modale">
                    <h5>Followings</h5>
                    <button v-on:click="toggleModaleFollowings"><font-awesome-icon icon="times" class="logos" /></button>
                </div>

                <div v-if="allFollowings.length > 0" class="content-modale">
                    <ul class="followings-list">
                        <li :key="i" v-for="(followings, i) in allFollowings">
                            <router-link class="username-pic" :to="`/user/${allFollowings[i]._id}`" data-toggle="tooltip" title="Voir le profil" >
                                <div v-if="allFollowings.length > 0" id="comment-profil-pic">
                                    <img :src="allFollowings[i].profilPic" alt="Photo de profil">
                                </div>
                                <p class="following-name">{{ allFollowings[i].firstname }} {{ allFollowings[i].lastname }}</p>
                            </router-link>

                            <Follow :targetUserId="allFollowings[i]._id"
                                    :userFollowers="userFollowers"
                                    :userFollowings="userFollowings">
                            </Follow>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p class="following-name mt-4">Aucun following</p>
                </div>
            </div>
    </div>
</template>

<script>
import Follow from './Follow'

export default {
    name: 'ModaleFollowings',
    props: ['reveleFollowings', 'toggleModaleFollowings', 'id', 'userFollowers', 'userFollowings'],
    data() {
        return  {
            allFollowings: []
        }
    },
    mounted() {
        this.$http.get(`http://localhost:3000/api/auth/profile/followings/${this.id}`)
        .then(res => {
            for (let followings of res.data.allFollowings) {
                this.allFollowings.push(followings)
            }
        })
        .catch(err => {
            this.checkIfTokenIsValid(err)
        })
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

.modale-followings {
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

.followings-list {
    list-style: none;
    margin: 1em;
    padding-left: 0;
}

.followings-list li {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
}

.following-name {
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