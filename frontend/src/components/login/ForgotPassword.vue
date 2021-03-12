<template>
    <div>
        <div v-if="!emailSent">
            <h2>Mot de passe oublié</h2>
            <form>
                <!-- <label for="email">Adresse e-mail</label> -->
                <input type="email" id="email" class="form-control" v-model="email" placeholder="Adresse e-mail" required>
                <p v-if="!emailIsCompleted" class="error">Veuillez saisir une adresse email valide</p>

                <button v-on:click.prevent="forgotPassword()" id="btn_submit" class="btn-main">Réinitialiser le mot de passe</button>
                
            </form>
        </div>

        <div v-else class="mail-success">
            <p class="mail-sent">Un email pour réinitialiser votre mot de passe vient de vous être envoyé!</p>
        </div>
          
    </div>
</template>

<script>
export default {
    name: 'ForgotPassword',
    title: 'Mot de passe oublié',
    data() {
        return {
            email: '',
            reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            emailIsCompleted: true,
            emailSent: false
        }
    },
    methods: {
        forgotPassword() {
            if (!this.reg.test(this.email)) {
                this.emailIsCompleted = false
            } 
            else {
                this.$http.post(`${this.$store.state.url}/api/auth/forgot`, {
                    email: this.email
                })
                .then(() => {
                    this.emailIsCompleted = true
                    this.emailSent = true
                    this.email = ''
                })
                .catch(err => {
                    console.log(err)
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

</style>