<template>
  <div v-if="!published" class="fishSubmit">
      <h2 class="title">Publiez votre prise !</h2>
        <form class="fish-form">
            <label for="postTitle">Titre de la publication (optionnel)</label>
            <input type="text" id="postTitle" class="form-control mb-2 mr-sm-2" placeholder="Ex: Session de ce matin" maxlength="50" v-model="postTitle">

            <label for="fishName">Espèce du poisson</label>
            <input type="text" id="fishName" class="form-control mb-2 mr-sm-2" placeholder="Ex: Perche, Sandre, non connu" maxlength="30" v-model="fishName" required>

            <label for="fishSize">Taille approximative (en cm)</label>
            <input type="number" id="fishSize" class="form-control mb-2 mr-sm-2" placeholder="Ex: 30" min="1" max="400" v-model="fishSize" required>

            <label for="location">Zone d'eau</label>
            <select id="water" class="form-control mb-2 mr-sm-2" placeholder="Veuillez sélectionner un court d'eau" v-model="water" required>
                <option value ="" selected="selected">Sélectionner une option</option>
                <option>Rivière</option>
                <option>Fleuve</option>
                <option>Étang</option>
                <option>Lac</option>
                <option>Mer</option>
                <option>Autre</option>
            </select>

            <label for="location">Lieu</label>
            <input type="text" id="location" class="form-control mb-2 mr-sm-2" placeholder="Ex: Nom de ville, région" maxlength="30" v-model="location" required>
            <!-- <div v-if="noLocation" class="test-err">
                <p>Entrez un lieu!</p>
            </div> -->

            <label for="bait">Leurre/appât/bout de ligne utilisé (optionnel)</label>
            <input type="text" id="bait" class="form-control mb-2 mr-sm-2" placeholder="Ex: Leurre souple" maxlength="30" v-model="bait">

            <label for="fishingSettup">Montage utilisé (optionnel)</label>
            <input type="text" id="fishingSettup" class="form-control mb-2 mr-sm-2" placeholder="Ex: Dropshot" maxlength="30" v-model="fishingSettup">

            <label for="date">Date</label>
            <input type="date" id="date" class="form-control mb-2 mr-sm-2" v-model="date" required>

            <label for="img">Photo de la prise</label>
            <input type="file" id="file" name="file" accept="image/*" @change="onFileAdded" required>
            <img :src="previewImage" class="img-preview" />

            <label for="description">Description (optionnel)</label>
            <textarea rows="3" type="text" id="description" class="form-control mb-2 mr-sm-2" maxlength="150" v-model="description"></textarea>
            
            <button @click.prevent="checkForm(); submit()" class="btn-main btn-publish">Publier</button>
        </form>
  </div>
  <div v-else class="container">
        <h2 class="my-4">Post publié !</h2>
        <router-link class="home" to="/"><button class="btn-main">Retourner à l'accueil</button></router-link>
    </div>
</template>

<script>
import FormData from 'form-data'

export default {
    name: 'FishSubmit',
    data() {
        return {
            postTitle: '',
            fishName: '',
            fishSize: '',
            water: '',
            location: '',
            bait: '',
            fishingSettup: '',
            date: '',
            description: '',
            previewImage: null,
            published: false
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

                // Uppercase fields //
                this.postTitle = this.capitalizeFirstLetter(this.postTitle)
                this.fishName = this.capitalizeFirstLetter(this.fishName)
                this.location = this.capitalizeFirstLetter(this.location)
                this.bait = this.capitalizeFirstLetter(this.bait)
                this.fishingSettup = this.capitalizeFirstLetter(this.fishingSettup)
                this.description = this.capitalizeFirstLetter(this.description)

                // Add fields to formdata //
                data.append('postTitle', this.postTitle)
                data.append('fishName', this.fishName)
                data.append('fishSize', this.fishSize)
                data.append('bait', this.bait)
                data.append('water', this.water)
                data.append('location', this.location)
                data.append('date', this.date)
                data.append('fishingSettup', this.fishingSettup)
                data.append('description', this.description)
                data.append('userID', this.checkUserId())
                data.append('image', document.getElementById('file').files[0])
                
            

                this.$http.post(`${this.$store.state.url}/api/auth/post`, data, 
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                    }
                })
                .then((res) => {
                    console.log(res)
                    self.published = true
                })
                .catch((err) => {
                    this.checkIfTokenIsValid(err)
                })}
            }
    }

}
</script>

<style>

.title {
    margin-top: 1em;
}

.fish-form input {
    margin-top: 0 !important;
}

input, select {
    max-width: 20em;
}

.img-preview {
    background-color: #FAFAFA;
    width: 130px;
    height: 173px;
    object-fit: cover;
    /* height: 5em; */
}

.btn-publish {
    margin: 1em;
}

#description {
   max-width: 20em;
}

</style>