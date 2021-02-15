<template>
    <div>
        <h2>Connectez-vous</h2>
        <router-link to="/signup">Pas encore de compte ? Créez-en un, c'est gratuit!</router-link>
        <form method="post" autocomplete="on">
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" class="form-control" v-model="email" required>
            <p v-if="!emailIsCompleted" class="error">Veuillez saisir une adresse email valide</p>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
            <p v-if="!pswIsCompleted" class="error">Veuillez saisir un mot de passe</p>
            <router-link to="" class="mdp_lost">Mot de passe oublié ?</router-link>

            <button v-on:click.prevent="login()" id="btn_submit" class="btn-main">Connexion</button>
            <p v-if="incorrect" class="error">Adresse email ou mot de passe incorrect</p>

        </form>   
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            incorrect: false,
            emailIsCompleted: true,
            pswIsCompleted: true
        }
    },
    methods: {
        login() {
            if (this.email != '' && this.password != '') {
                this.$http.post(`${this.$store.state.url}/api/auth/login`, {
                    email: this.email,
                    password: this.password
                    })
                .then((res) => {
                    localStorage.setItem('userID', JSON.stringify(res.data.userId))
                    localStorage.setItem('userProfilPic', JSON.stringify(res.data.userProfilPic))
                    this.$store.dispatch('StoreId')
                    this.$store.dispatch('StoreProfilPic')
                    this.$store.dispatch('Logged')
                    if (res.data.userStatus === 'admin') {
                        this.$store.dispatch('IsAdmin')
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        this.incorrect = true
                        this.emailIsCompleted = true
                        this.pswIsCompleted = true
                    }
                    else {
                        console.log(error)
                    }
                }) 
            }
            else if (this.email === '') {
                this.emailIsCompleted = false
            } else if (this.password === '') {
                this.pswIsCompleted = false
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
}

label {
    margin-top: 1em;
}

p {
    color: blue;
}

.mdp_lost {
    font-size: 14px;
}

.error {
    color: red;
    font-size: 14px;
}

</style>