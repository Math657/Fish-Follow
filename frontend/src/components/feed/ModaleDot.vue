<template>
    <div class="three-dot-modale" v-if="reveleModaleDot">
        DELETE
    </div>
</template>

<script>
export default {
    name: 'ModaleDot',
    props: ['reveleModaleDot'],
    data() {
        return {

        }
    }
}
</script>

<style>

.three-dot-modale {
    background: #cccbcb;
    color: #0A3046;
    padding: 10px;
    border-radius: 3px;
    position: absolute;
    width: 200px;
}

</style>