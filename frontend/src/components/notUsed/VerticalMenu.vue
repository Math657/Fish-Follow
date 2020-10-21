<template>
    <div v-if="VerticalMenu" class="verticalMenu">
        <div class="overlay">
            <Menu></Menu>
        </div>
    </div>
</template>

<script>
import Menu from './Menu'

export default {
    name: 'VerticalMenu',
    props: ['VerticalMenu'],
    data() {
        return {

        }
    },
    components: {
        Menu
    }
}
</script>

<style>

.verticalMenu {
    display: flex;
    flex-direction: column;
}

</style>