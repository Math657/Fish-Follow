<template>
  <div>
      <h2 class="title">Créer un compte</h2>
        <form>
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required>

            <label for="nom">Nom</label>
            <input type="text" id="name" v-model="name" required>

            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" v-model="firstname" required>

            <label for="birthday">Date de naissance</label>
            <input type="date" id="birthday" v-model="birthday" required>
            
            <form>
                <label for="profilPic">Choisir une photo de profil</label>
                <input class="file" type="file" id="profilPic" name="profilPic" accept="image/*" required>
            </form>

            <button @click.prevent="checkForm(); signup()" id="btn_submit">S'inscrire</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            lastname: null,
            firstname: null,
            password: null,
            birthday: null,
            profilPic: null
        }
    },
    methods: {
        checkForm: function (e) {
        
        if (!this.reg.test(this.email)) {
            console.log('Entrez un email valide!')
            return false
        }
        if (!this.lastname) {
            console.log('Nom requis!')
            return false
        }
        if (!this.firstname) {
            console.log('Prénom requis!')
            return false
        }
        if (!this.password) {
            console.log('Mot de passe requis!')
            return false
        }
        if (this.email && this.lastname && this.firstname && this.password && this.birthday) {
            return true
        }
        e.preventDefault()   
        },
        signup() {  
            if (this.checkForm()) {
            this.$http.post('http://localhost:3000/api/auth/signup', {
                email: this.email,
                name: this.name,
                lastname: this.lastname,
                firstname: this.firstname,
                password: this.password,
                birthday: this.birthday,
                profilPic: this.profilPic
            })
            .then((response) => {
                // localStorage.setItem('userID', JSON.stringify(response.data.userId))
                console.log(response)
                this.$store.dispatch('LOGGED')
                this.router.push('/Logged')
            })
            .catch((error) => {
                console.log(error)
            })}
        }
    }
}
</script>

<style>

.title {
    margin-top: 1em;
}

form {
    display: flex;
    flex-direction: column;
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

#btn_submit {
    background-color: #144c6d;
    color: white;
    border-radius: 4px;
    padding: 7px 10px 7px 10px;
}

#btn_submit {
    filter: brightness(0.8);
}

.file {
    margin-bottom: 1em;
}

</style>