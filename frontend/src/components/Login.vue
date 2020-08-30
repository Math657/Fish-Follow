<template>
    <div>
        <h1>Connectez-vous</h1>
        <form>
            <label for="email">Adresse e-mail</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required>
            <p>Mot de passe oublié ?</p>

            <button v-on:click.prevent="login()" id="btn_submit">Connexion</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>