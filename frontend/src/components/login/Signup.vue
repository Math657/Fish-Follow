<template>
  <div>
      <h2 class="title">Créer un compte</h2>
      <router-link to="/login">ou connectez-vous</router-link>
        <form enctype="multipart/form-data" method="post" autocomplete="on">
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" class="form-control" v-model="email" required>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="password" required>

            <label for="nom">Nom</label>
            <input type="text" id="lastname" class="form-control" v-model="lastname" required>

            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" class="form-control" v-model="firstname" required>

            <label for="birthday">Date de naissance</label>
            <input type="date" id="birthday" class="form-control" v-model="birthday" required>
            
    
            <label for="profilPic">Photo de profil</label>
            <input type="file" id="file" name="file" accept="image/*" @change="onFileAdded" required>
            <img :src="previewImage" class="img-preview" />
            

            <button @click.prevent="checkForm(); signup()" id="btn_submit">S'inscrire</button>
      </form>
  </div>
</template>

<script>
import FormData from 'form-data'

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
            previewImage: null
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
            if (this.password.length < 7) {
                console.log('Votre mot de passe doit contenir au moins 8 caractères!')
                return false            
            }
            if (this.email && this.lastname && this.firstname && this.password && this.birthday) {
                return true
            }
            e.preventDefault()   
        },
        onFileAdded(e) {
            const image = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = e =>{
                this.previewImage = e.target.result
            }
        },
        signup() {  
            if (this.checkForm()) {
                let data = new FormData()

                data.append('email', this.email)
                data.append('password', this.password)
                data.append('lastname', this.lastname)
                data.append('firstname', this.firstname)
                data.append('birthday', this.birthday)
                data.append('image', document.getElementById('file').files[0])
               
            this.$http.post('http://localhost:3000/api/auth/signup', data, 
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }
            })
            .then((res) => {
                localStorage.setItem('userID', JSON.stringify(res.data.userId))
                console.log(res)
                this.$store.dispatch('Logged')
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
    padding: 7px 20px 7px 20px;
    margin-bottom: 1em;
    margin-top: 1em;
}

/* #btn_submit {
    filter: brightness(0.8);
} */

.file {
    margin-bottom: 1em;
}

.img-preview {
    width: 150px;
    background-color: white;
    /* border: 1px solid #DDD; */
    padding: 5px;
    margin: 1em;
}

</style>