<template>
    <div class="container mt-4">
        <h2 v-if="allFishes.length > 0"></h2>
        <h2 v-else>Aucune prise récente</h2>
        <button class="mb-4 btn-main" id="btn-submit" @click="$router.push('/post')">
            Publier une prise
        </button>

        <ul class="feed">
            <li class="full-post" :key="i" v-for="(fishes, i) in allFishes">
                <Post
                v-bind:postTitle="fishes.postTitle"
                v-bind:userFirstname="fishes.userFirstname"
                v-bind:userLastname="fishes.userLastname"
                v-bind:date="fishes.date"
                v-bind:createdAt="fishes.createdAt"
                v-bind:fishPic="fishes.fishPic"
                v-bind:fishName="fishes.fishName"
                v-bind:fishSize="fishes.fishSize"
                v-bind:water="fishes.water"
                v-bind:location="fishes.location"
                v-bind:bait="fishes.bait"
                v-bind:fishingSettup="fishes.fishingSettup"
                v-bind:description="fishes.description"
                v-bind:usersLiked="fishes.usersLiked"
                v-bind:likes="fishes.likes"
                v-bind:postID="fishes._id"
                v-bind:userId="fishes.userId">
                </Post>
            </li>
        </ul>
    </div>
</template>

<script>
import Post from './Post'

export default {
    name: 'DynamicFeed',
    data() {
        return {
            allFishes: []
        }
    },
    mounted() {
        const getData = async () => {
            try {
                const res = await this.$http.get(`${this.$store.state.url}/api/auth/home/${this.$store.state.userId}`)
                for (let fish of res.data) {          
                    this.allFishes.push(fish)   
                }
            }
            catch (err) {
                this.checkIfTokenIsValid(err)
            }
        }
        getData()
    },
    components: {
        Post
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
    opacity: 0.9;
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
    max-width: 40em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

</style>
