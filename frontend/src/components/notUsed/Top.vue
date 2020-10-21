<template>
    <div class="header">
        <div class="content">
            <div class="circle">
                <img :src="userInfos[0].profilPic" alt="Photo de profil" class="img-circle profil-pic">
            </div>
            
            <h4 class="username">{{ userInfos[0].firstname }} {{ userInfos[0].lastname }}</h4>
        </div>
        <div class="separator"></div>
        <div class="nav">
            <router-link to="/post" class="main-link"><h4>Publier</h4></router-link>
            <router-link to="/home" class="main-link"><h4>Feed</h4></router-link>
            <router-link to="/populaire" class="main-link"><h4>Populaire</h4></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Top',
    data(){
        return {
            userID: localStorage.getItem('userID'),
            userInfos: []
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

.header {
    height: 10%; 
    padding-top: 1em;
    padding-bottom: 1em;
    /* background-color: #3A7226;
    background-color: #13AA52; */
    background-color: #0a3046;
    /* display: flex; */
}


.content {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.circle {
    border-radius: 50%;
    height: 70px;
    width: 70px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1em;
}

.profil-pic {
    max-height: 70px;
}

.username {
    color: white;
    font-size: 18px;
    margin-left: 1em;
}

.separator {
    widows: 100%;
    height: 1px;
    margin-top: 1em;
    margin-bottom: 1em;
    background-color: white;
}

.nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.main-link {
    color: white;
}

.main-link:hover {
    text-decoration: none;
}

</style>