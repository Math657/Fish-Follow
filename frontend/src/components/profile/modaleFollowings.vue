<template>
    <div class="bloc-modale" v-if="reveleFollowings">

        <div v-on:click="toggleModaleFollowings" class="overlay"></div>

            <div class="modale card">
                
            </div>
    </div>
</template>

<script>
export default {
    name: 'ModaleFollowings',
    props: ['reveleFollowings', 'toggleModaleFollowings'],
    date() {
        return  {

        }
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
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    bottom: 40%;
}

.btn {
    width: 6em;
}

.both-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.btn-main:hover {
    cursor: pointer;
}

</style>