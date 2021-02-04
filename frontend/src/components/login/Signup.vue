<template>
  <div>
      <h2 class="title">Créer un compte</h2>
      <router-link to="/login">ou connectez-vous</router-link>
        <form enctype="multipart/form-data" method="post" autocomplete="on">

            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" class="form-control" v-model="email" required>
            <p v-if="!emailIsCompleted" class="error">Veuillez saisir une adresse email valide</p>
            <p v-if="emailAlreadyUsed" class="error">Cette adresse email est déjà utilisé</p>


            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
            <p v-if="!pswIsCompleted" class="error">Veuillez saisir un mot de passe</p>
            <p v-if="!pswIsLength" class="error">Votre mot de passe doit contenir au moins 8 caractères!</p>

            <label for="password-confirm">Confirmer votre mot de passe</label>
            <input type="password" id="password-confirm" class="form-control" v-model="passwordConfirm" required>
            <p v-if="!pswIsConfirmed" class="error">Veuillez confirmer votre mot de passe</p>
            <p v-if="!pswIsCorrect" class="error">Les mots de passe ne correspondent pas</p>
            
            <label for="nom">Nom</label>
            <input type="text" id="lastname" class="form-control" v-model="lastname" required>
            <p v-if="!lastnameIsCompleted" class="error">Veuillez saisir un nom</p>

            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" class="form-control" v-model="firstname" required>
            <p v-if="!firstnameIsCompleted" class="error">Veuillez saisir un prénom</p>

            <label for="birthday">Date de naissance</label>
            <input type="date" id="birthday" class="form-control" v-model="birthday" required>
            <p v-if="!birthdayIsCompleted" class="error">Veuillez saisir une date de naissance</p>
            
    
            <label for="profilPic">Photo de profil*</label>
            <input type="file" id="file" name="file" accept="image/*" @change="onFileAdded">
            <img :src="previewImage" class="img-preview" />
            <!-- <p v-if="!previewImage" class="error">Veuillez choisir une photo de profil</p> -->
            

            <button @click.prevent="checkForm(); signup()" id="btn_submit" class="btn-main">S'inscrire</button>
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
            passwordConfirm: null,
            birthday: null,
            previewImage: null,
            emailIsCompleted: true,
            lastnameIsCompleted: true,
            firstnameIsCompleted: true,
            pswIsCompleted: true,
            pswIsConfirmed: true,
            pswIsCorrect: true,
            pswIsLength: true,
            birthdayIsCompleted: true,
            emailAlreadyUsed: false,
        }
    },
    methods: {
        checkForm: function (e) {
        
            if (!this.reg.test(this.email)) {
                this.emailIsCompleted = false
                return false
            }
            if (!this.password & !this.passwordConfirm) {
                this.emailIsCompleted = true
                this.pswIsCompleted = false
                this.pswIsConfirmed = false
                return false
            }
            if (this.password.length < 7) {
                this.pswIsCompleted = true
                this.emailIsCompleted = true
                this.pswIsLength = false
                return false            
            }
            if (this.password !== this.passwordConfirm) {
                this.pswIsLength = true
                this.pswIsConfirmed = true
                this.pswIsCorrect = false
                return false
            }
            if (!this.lastname) {
                this.pswIsCorrect = true
                this.pswIsLength = true
                this.pswIsCompleted = true
                this.emailIsCompleted = true
                this.lastnameIsCompleted = false
                return false
            }
            if (!this.firstname) {
                this.lastnameIsCompleted = true
                this.pswIsLength = true
                this.pswIsCompleted = true
                this.emailIsCompleted = true
                this.firstnameIsCompleted = false
                return false
            }
            
            if (!this.birthday) {
                this.firstnameIsCompleted = true
                this.lastnameIsCompleted = true
                this.pswIsLength = true
                this.pswIsCompleted = true
                this.emailIsCompleted = true
                this.birthdayIsCompleted = false
                return false
            }
            if (this.email && this.lastname && this.firstname && this.password && this.birthday) {
                this.birthdayIsCompleted = true
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
               
            this.$http.post(`${this.$store.state.url}/api/auth/signup`, data, 
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }
            })
            .then((res) => {
                localStorage.setItem('userID', JSON.stringify(res.data.userId))
                this.$store.dispatch('StoreId')
                this.$store.dispatch('Logged')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.emailAlreadyUsed = true
                } else {
                    console.log(error)
                }
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

.error {
    color: red;
    font-size: 14px;
}

</style>