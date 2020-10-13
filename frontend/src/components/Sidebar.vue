<template>
    <nav class="sidebar">
        <div @click="show = !show" class="iconMenu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
        </div>
        <transition-group name="fade" tag="ul">
            <li key="close" v-show="show" @click="show = !show"><font-awesome-icon icon="times" id="cross" /></li>
            <li key="1" v-show="show" @click="show = !show"><router-link to="/home"><font-awesome-icon icon="home" class="icon-menu" />Accueil</router-link></li>
            <li key="2" v-show="show" @click="show = !show"><router-link to="/post"><font-awesome-icon icon="camera-retro" class="icon-menu" />Publier</router-link></li>
            <li key="3" v-show="show" @click="show = !show"><router-link :to="`/myprofil/${userID}`"><font-awesome-icon icon="user" class="icon-menu" />Mon profil</router-link></li>
            <li key="4" v-show="show" @click="show = !show"><router-link to="/myprofil"><font-awesome-icon icon="cog" class="icon-menu" />Paramètres</router-link></li>
            <li key="5" v-show="show" @click="show = !show"><button class="btn" id="btn-logout"  @click.prevent="logOut()"><font-awesome-icon icon="sign-out-alt" class="icon-menu" />Se déconnecter</button></li>
            <!-- <li key="sidebar" v-show="show"></li> -->
        </transition-group>
    </nav>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            userID: JSON.parse(localStorage.getItem('userID')),
            show: false
        }
    },
    methods: {
        logOut(){
            localStorage.clear()
            sessionStorage.clear()
            this.$store.dispatch('LogOut')
        }
    },

}
</script>



<style lang="scss">

.sidebar {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .iconMenu {
        display: none;
        margin-right: 60px;
    }

    .iconMenu:hover {
         opacity: 80%;
         cursor: pointer;
    }

    .bar {
        width: 23px;
        height: 3px;
        border: white 1px solid;
        margin: 6px;
        background-color: white;
    }

    ul {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        margin: 0;
        height: 100vh;
        list-style-type: none;
        /* text-align: right; */

        #cross {
            color: #ffffff;
            font-size: 2em;
        }

        #cross:hover {
            cursor: pointer;
            opacity: 80%;
        }

        li {
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #555;
            width: 200px;
            height: 86px;
            background-color: #0a3046;
            font-size: 18px;

            // a {
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     width: 60px;
            //     height: 86px;
            // }
        }

        li:last-child {
            border-bottom: none;
            height: 100%;
            // height:  100vh;
            // min-height: 100vh;
        }

        #btn-logout {
            color: #ffffff;
        }

        .icon-menu {
            color:#ffffff;
            margin-left: -10px;
            margin-right: 10px;
        }

        #btn-logout {
            font-size: 18px;
        }

        #btn-logout:hover {
            opacity: 80%;
        }

        a {
            color: #ffffff !important;
        }

         li a:hover {
            text-decoration: none;
            color: white;
            opacity: 80%;
        }
    }   
}

// .fade-enter-active {
//     transition: all .3s ease;
// }

// .fade-leave-active {
//     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }

// .slide-fade-enter, .slide-fade-leave-to {
//     transform: translateX(80px);
//     opacity: 0;
// }

@mixin ul-childs($values...) {
    @each $var in $values {
        &:nth-child(#{$var}) {
            transition: transform linear 0.2s, display 0.7s;
        }
    }
}  

.fade-enter-active, .fade-leave-active {
    @include ul-childs(1,2,3,4,5,6)
}

.fade-enter, .fade-leave-to {
    transform: rotateY(-90deg);
}

//////////////////////////////////////////////////

// .fade-enter-active, .fade-leave-active {
//     transition: opacity 0.3s;
// }

// .fade-enter, .fade-leave-to {
//     opacity: 0;
// }

@media only screen and (max-width: 759px) {
    .sidebar {
        .iconMenu {
            display: inline;
        }
    }
}

</style>>



