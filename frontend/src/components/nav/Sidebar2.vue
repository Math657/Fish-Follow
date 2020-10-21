<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
      export default {
        methods: {
            closeSidebarPanel() {
                this.$store.dispatch('NavOpen')
            } 
        },
        computed: {
            isPanelOpen() {
                return this.$store.state.isNavOpen   
            }
        }
    }
</script>

<style>

.slide-enter-active, .slide-leave-active {
    transition: transform 0.2s ease;
}

.slide-enter, .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.sidebar-panel {
    overflow-y: auto;
    background-color: #0a3046;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 18em;
    padding-top: 0;
    padding-bottom: 0;
}

</style>