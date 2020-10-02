<template>
  <div v-if="!published" class="fishSubmit">
      <h2 class="title">Publiez votre prise!</h2>
        <form class="">
            <label for="fishName">Nom du poisson</label>
            <input type="fishName" id="fishName" class="form-control mb-2 mr-sm-2" placeholder="Ex: Perche" v-model="fishName" required>

            <label for="fishSize">Taille approximative du poisson (en cm)</label>
            <input type="fishSize" id="fishSize" class="form-control mb-2 mr-sm-2" placeholder="Ex: 30" v-model="fishSize" required>

            <label for="location">Court d'eau</label>
            <select type="water" id="water" class="form-control mb-2 mr-sm-2" palceholder="Veuillez sélectionner un court d'eau" v-model="water" required>
                <option value ="" selected="selected">Sélectionner une option</option>
                <option>Rivière</option>
                <option>Fleuve</option>
                <option>Étang</option>
                <option>Lac</option>
                <option>Mer</option>
                <option>Autre</option>
            </select>

            <label for="location">Lieu</label>
            <input type="location" id="location" class="form-control mb-2 mr-sm-2" placeholder="Ex: Nom de ville" v-model="location" required>

            <label for="bait">Leurre/appât/bout de ligne utilisé (optionnel)</label>
            <input type="bait" id="bait" class="form-control mb-2 mr-sm-2" placeholder="Ex: Leurre souple" v-model="bait">

            <label for="fishingSettup">Montage utilisé (optionnel)</label>
            <input type="fishingSettup" id="fishingSettup" class="form-control mb-2 mr-sm-2" placeholder="Ex: Dropshot" v-model="fishingSettup">

            <label for="date">Date</label>
            <input type="date" id="date" class="form-control mb-2 mr-sm-2" v-model="date" required>

            <label for="img">Photo de la prise</label>
            <input type="file" id="file" name="file" accept="image/*" @change="onFileAdded" required>
            <img :src="previewImage" class="img-preview" />

            <label for="description">Description (optionnel)</label>
            <input type="description" id="description" class="form-control mb-2 mr-sm-2" v-model="description">
            
            <button @click.prevent="checkForm(); submit()" class="btn-login" id="btn_submit">Soumettre</button>
        </form>
  </div>
  <div v-else class="container">
        <h2 class="my-4">Post publié !</h2>
        <router-link class="home" to="/home"><button class="">Retourner à l'accueil</button></router-link>
    </div>
</template>

<script>
import FormData from 'form-data'

export default {
    name: 'FishSubmit',
    data() {
        return {
            fishName: "",
            fishSize: "",
            water: "",
            location: "",
            bait: "",
            fishingSettup: "",
            date: "",
            description: "",
            previewImage: null,
            published: false,
            userID: localStorage.getItem('userID')
        }
    },
    methods: {
        checkForm: function () {
        
            if (!this.fishName) {
                console.log('Entrez un nom de poisson!')
                return false
            }
            if (!this.fishSize) {
                console.log('Entrez une taille!')
                return false
            }
            if (!this.location) {
                console.log('Entrez un lieu!')
                return false
            }
            // if (!this.password) {
            //     console.log('Mot de passe requis!')
            //     return false
            // }
            if (this.fishName && this.fishSize && this.location) {
                return true
            }
            // e.preventDefault() 
              
        },
        onFileAdded(e) {
            const image = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = e =>{
                this.previewImage = e.target.result
            }
        },
        submit() {
            if(this.checkForm()) {
                let self = this
                let data = new FormData

                data.append('fishName', this.fishName)
                data.append('fishSize', this.fishSize),
                data.append('bait', this.bait),
                data.append('water', this.water),
                data.append('location', this.location),
                data.append('date', this.date),
                data.append('fishingSettup', this.fishingSettup),
                data.append('description', this.description),
                data.append('userID', this.userID)
                data.append('image', document.getElementById('file').files[0])
                
            

            this.$http.post('http://localhost:3000/api/auth/post', data, 
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }
            })
            .then((res) => {
                console.log(res)
                self.published = true
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

input, select {
    max-width: 20em;
}

.img-preview {
    background-color: #FAFAFA;
    /* height: 5em; */
}

.btn-login {
    background-color: #144c6d;
    color: white;
    border-radius: 4px;
    padding: 7px 10px 7px 10px;
    margin: 1em;
}

.btn-login:hover {
    filter: brightness(0.8);
}

</style>