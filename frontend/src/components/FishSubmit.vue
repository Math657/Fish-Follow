<template>
  <div class="fishSubmit">
      <h2>Postez un catch!</h2>
        <form>
            <label for="location">Lieu</label>
            <input type="location" id="location" v-model="location" required>

            <label for="date">Date et heure</label>
            <input type="date" id="date" v-model="date" required>

            <label for="fishName">Nom du poisson</label>
            <input type="fishName" id="fishName" v-model="fishName" required>

            <label for="fishSize">Taille</label>
            <input type="fishSize" id="fishSize" v-model="fishSize" required>

            <label for="bait">Leurre utilisé</label>
            <input type="bait" id="bait" v-model="bait" required>

            <label for="fishingSettup">Montage utilisé (optionnel)</label>
            <input type="fishingSettup" id="fishingSettup" v-model="bait" required>

            <label for="img">Photo de la prise</label>
            <input type="file" id="img" accept="image/*">
            <input type="submit">

            <label for="description">Description (optionnel)</label>
            <input type="description" id="description" v-model="description">
        </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>