<template>
    <div class="profile-infos" v-if="userInfos.length > 0">
        <img :src="userInfos[0].profilPic" alt="Photo de profil" class="profile-pic">
        <h4>{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
        <h4>{{ userInfos[0].email }}</h4>
        <h4>{{ userInfos[0].followers }} followers</h4>
        <h4>{{ userInfos[0].following }} following</h4>


    </div>
</template>

<script>
export default {
    name: 'MyProfile',
    data() {
        return {
            userID: JSON.parse(localStorage.getItem('userID')),
            userInfos: [],
            userPosts: []
        }
    },
    mounted(){
        this.$http.get(`http://localhost:3000/api/auth/myprofile/${this.userID}`)
        .then(res => {
            this.userInfos.push(res.data.user)
        })
        .catch((err) => {
           this.checkIfTokenIsValid(err)
        })
        
    }

}
</script>

<style>

.profile-pic {
    display: block;
    max-width:17em;
    max-height:7em;
    width: auto;
    height: auto;
    margin: 1em;
    float: left;
}

.profile-infos {
    /* background-color: #FFFFFF; */
    /* border: 1px solid rgb(219, 219, 219); */
    /* border-radius: 15px; */
    /* box-shadow: 3px 3px 3px #c2c0c0; */
    max-width: 40em;
    margin: 1em auto 1em auto;
    
}

</style>