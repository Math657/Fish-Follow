<template>
  <div>
      <h1>Créer un compte</h1>
      <form>
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>

            <label for="nom">Nom</label>
            <input type="name" id="name" v-model="name" required>

            <label for="firstname">Prénom</label>
            <input type="firstname" id="firstname" v-model="firstname" required>

            <button @click.prevent="checkForm(); signup()" id="btn_submit">S'inscrire</button>
      </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>