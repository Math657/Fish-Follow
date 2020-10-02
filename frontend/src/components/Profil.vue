<template>
    <div class="profil-infos" v-if="userInfos.length > 0">
        <img :src="userInfos[0].profilPic" alt="Photo de profil" class="profilPic">
        <h4>{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
        <h4>{{ userInfos[0].email }}</h4>
        <h4>{{ userInfos[0].followers }} followers</h4>
        <h4>{{ userInfos[0].following }} following</h4>


    </div>
</template>

<script>
export default {
    name: 'Profil',
    data() {
        return {
            userID: localStorage.getItem('userID'),
            userInfos: [],
            userPosts: []
        }
    },
    mounted(){
        this.$http.get(`http://localhost:3000/api/auth/myprofil/${this.userID}`)
        .then(res => {
            this.userInfos.push(res.data.user)
        })
        .catch(error => console.log(error))
    }

}
</script>

<style>

.profilPic {
    display: block;
    max-width:15em;
    max-height:7em;
    width: auto;
    height: auto;
    margin: 1em;
    float: left;
}

.profil-infos {
    background-color: #FFFFFF;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    box-shadow: 3px 3px 3px #c2c0c0;
    margin: 1em;
}

</style>