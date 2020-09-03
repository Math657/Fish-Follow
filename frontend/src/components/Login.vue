<template>
    <div>
        <h2>Connectez-vous</h2>
        <form>
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required>
            <p>Mot de passe oublié ?</p>

            <button class="btn-login" v-on:click.prevent="login()" id="btn_submit">Connexion</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            if (this.email != "" && this.password != "") {
                this.$http.post('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password
                    })
                .then((response) => {
                    // localStorage.setItem('userID', JSON.stringify(response.data.userId))
                    // this.$store.dispatch('checkIfLogged')
                    console.log(response)
                    this.$store.dispatch('LOGGED')
                    this.router.push('/Logged')
                })
                .catch((error) => {
                    console.log(error)
                }) 
            }
            else {
                console.log('Vous devez entrer un nom d\'utilisateur et/ou mot de passe correct!')
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

.btn-login {
    background-color: #144c6d;
    color: white;
    border-radius: 4px;
    padding: 7px 10px 7px 10px;
}

.btn-login:hover {
    filter: brightness(0.8);
}

</style>