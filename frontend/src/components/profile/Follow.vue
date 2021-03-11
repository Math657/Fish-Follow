<template>
    <div class="btn-follow-comp">
        <div v-if="this.targetUserId === this.$store.state.userId" class="btn-main btn-following"><font-awesome-icon icon="check" class="icons-plus"/>Vous</div>
        <div v-else-if="!doFollow" v-on:click="follow()" class="btn-main btn-follow"><font-awesome-icon icon="plus" class="icons-plus"/>Suivre</div>
        <div v-else-if="doFollow" v-on:click="follow()" class="btn-main btn-following"><font-awesome-icon icon="check" class="icons-plus"/>Suivis</div>
    </div>
</template>

<script>
export default {
    name: 'Follow',
    props: {
        targetUserId: String,
        userFollowers: Array,
        userFollowings: Array
    },
    data() {
        return {
            doFollow: false
        }
    },
    mounted() {
        if (this.userFollowings.includes(this.targetUserId)) {
            this.doFollow = true
        }
    },
    methods: {
        follow() {
            this.$http.post(`${this.$store.state.url}/api/auth/follow`, {
                targetUser: this.targetUserId,
                authorID: this.$store.state.userId
            })
            .then(() => {
                this.doFollow = !this.doFollow
            })
            .catch((err) => {
                this.checkIfTokenIsValid(err)
            })
        }
    }
}
</script>

<style>

</style>