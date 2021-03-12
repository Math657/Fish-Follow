<template>
    <div>
        <div v-if="!passwordChanged">
            <h2 >Choisissez un nouveau mot de passe</h2>
            <form>
                <!-- <label for="password">Nouveau mot de passe</label> -->
                <input type="password" id="password" class="form-control" v-model="password" placeholder="Nouveau mot de passe" required >
                <p v-if="!pswIsCompleted" class="error">Veuillez saisir un mot de passe</p>
                <p v-if="!pswIsLength" class="error">Votre mot de passe doit contenir au moins 8 caractères!</p>

                <!-- <label for="password-confirm">Confirmer votre mot de passe</label> -->
                <input type="password" id="password-confirm" class="form-control" v-model="passwordConfirm" placeholder="Confirmer votre mot de passe" required>
                <p v-if="!pswIsConfirmed" class="error" placeholder="Répéter votre mot de passe">Veuillez confirmer votre mot de passe</p>
                <p v-if="!pswIsCorrect" class="error">Les mots de passe ne correspondent pas</p>
                <p v-if="wrongToken" class="error">La demande a expiré. Veuillez renouveler la réinitilisation de mot de passe</p>

                <button v-on:click.prevent="changePassword()" id="btn_submit" class="btn-main">Changer mon mot de passe</button>
            </form>
        </div>
        
        <div v-else class="mail-success">
            <p class="mail-sent">Changement de mot de passe réussi!</p>
            <router-link to="/" class="password-changed-login">Se connecter</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    title: 'Mot de passe oublié',
    data() {
        return {
            password: '',
            passwordConfirm: '',
            pswIsCompleted: true,
            pswIsConfirmed: true,
            pswIsCorrect: true,
            pswIsLength: true,
            wrongToken: false,
            passwordChanged: false,
        }
    },
    methods: {
        changePassword() {
            if (!this.password & !this.passwordConfirm) {
                this.pswIsCompleted = false
                this.pswIsConfirmed = false
            }
            else if (this.password.length < 7) {
                this.pswIsCompleted = true
                this.pswIsLength = false          
            }
            else if (this.password !== this.passwordConfirm) {
                this.pswIsLength = true
                this.pswIsConfirmed = true
                this.pswIsCorrect = false
            }
            else {
                 this.$http.post(`${this.$store.state.url}/api/auth/reset/${this.$route.params.token}`, {
                    password: this.password,
                    userId: this.$route.params.id
                })
                .then(() => {
                    this.pswIsLength = true
                    this.pswIsConfirmed = true
                    this.pswIsCorrect = true
                    this.pswIsCompleted = true
                    this.passwordChanged = true  
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        this.wrongToken = true
                    } else {
                        console.log(err)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

h2 {
    margin-top: 1em;
}

form {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
}

input {
    max-width: 20em;
    margin-top: 1.5em;
}

label {
    margin-top: 1em;
}

.mail-sent {
    color: #0b8b31;
    font-weight: 700;
    margin-top: 1em;
}

.mail-success {
    background-color: #baecc9;
    // border: 1px solid #0b8b31;
    border-radius: 3px;
    max-width: 400px;
    padding: 0.5em;
    margin-top: 2em;
    margin-right: auto;
    margin-left: auto;
}

.password-changed-login:hover {
    text-decoration: none;
}

</style>