<template>
    <div class="bloc-modale" v-if="revele">

        <div v-on:click="toggleModale" class="overlay"></div>

            <div class="modale-delete card">
                <h3 class="mb-2">Voulez-vous vraiment supprimer votre compte ?</h3>
                <h5 class="mb-4">Cette action est irréversible</h5>
                    <div class="both-btn">
                        <div v-on:click="deleteProfil()" class="btn-oui btn btn-danger">Oui</div>
                        <div v-on:click="toggleModale" class="btn-main">Retour</div>
                    </div>
            </div>
    </div>

</template>

<script>

export default {
    name:'ModaleDelete',
    props: ['revele', 'toggleModale'],
    data(){
        return {
        
        }
    },
    methods: {
        deleteProfil() {
            this.$http.delete(`${this.$store.state.url}/api/auth/myprofile/${this.checkUserId()}`)
            .then(() => {
                localStorage.clear()
                sessionStorage.clear()
                this.$store.dispatch('LogOut')
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
            })
        }
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

.modale-delete {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    bottom: 40%;
}

.btn {
    width: 6em;
}

.both-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.btn-main:hover {
    cursor: pointer;
}

</style>