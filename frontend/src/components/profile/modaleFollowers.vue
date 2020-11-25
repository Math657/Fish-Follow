<template>
    <div class="bloc-modale" v-if="reveleFollowers">

        <div v-on:click="toggleModaleFollowers" class="overlay"></div>

            <div class="modale card">
                <div class="top-modale">
                    <h5>Followers</h5>
                    <button v-on:click="toggleModaleFollowers"><font-awesome-icon icon="times" class="logos" /></button>
                </div>
                <div>

                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'ModaleFollowers',
    props: ['reveleFollowers', 'toggleModaleFollowers'],
    date() {
        return  {

        }
    },
    mounted() {
        // this.$http.get()
    }

}
</script>

<style lang="scss" scoped>

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
    background: rgba(0,0,0,0.5);
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
    bottom: 60%;
    width: 50vw;
}

.top-modale {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid rgb(189, 187, 187);  
}

.top-modale h5 {
    margin-right: auto;
}

.top-modale button {
    border: none;
    font-size: 24px;
    background: #f1f1f1;
    color: #0A3046;
}

</style>

