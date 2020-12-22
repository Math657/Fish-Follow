<template>
    <div class="bloc-modale">
        <div v-on:click="toggleModaleSearch" class="overlay"></div>
        <div class="modale">Résultats :</div>
    </div>
</template>

<script>
export default {
    name: 'ModaleSearch',
    props: ['toggleModaleSearch'],
    data() {
        return {
            
        }
    },
    mounted() {
        
    }

}
</script>

<style>

.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modale {
    background: #f1f1f1;
    color: #0A3046;
    padding: 10px;
    position: fixed;
    top: 10%;
    width: 20em;
    height: 10em;
    border: 1px solid #0A3046;
}
</style>

