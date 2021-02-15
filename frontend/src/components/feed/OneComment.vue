<template>
  <div>
      <div class="author-info">
            <router-link class="username-pic" :to="`/user/${commentAuthorID}`" 
                            data-toggle="tooltip" title="Voir le profil" >
                <div id="comment-profil-pic">
                    <img :src="commentUserProfilePic" alt="Photo de profil">
                </div>
                <p class="comment-author">{{ commentAuthor }}</p>
            </router-link>

            <p class="comment-date">{{ moment(commentCreatedAt).fromNow() }}</p>

            <div @click="showModaleDot()" class="three-dot-comment">
                <div class="one-dot-comment"></div>
                <div class="one-dot-comment"></div>
                <div class="one-dot-comment"></div>
                
                <ModaleDot 
                    :reveleModaleDot="reveleModaleDot"
                    :hideModale="hideModale"
                    :commentID="this.commentID"
                    :commentDeleted="this.commentDeleted"
                    :commentAuthorID="this.commentAuthorID"
                    v-on="$listeners">
                </ModaleDot>
            </div>
        </div>
        <h6>{{ commentContent }}</h6>

        
  </div>
</template>

<script>
import ModaleDot from './ModaleDot'

export default {
    name: 'OneComment',
    data() {
        return {
            reveleModaleDot: false
        }
    },
    methods: {
        showModaleDot() {
                this.reveleModaleDot = !this.reveleModaleDot
        },
        hideModale() {
            this.reveleModaleDot = false
        }
    },
    mounted() {
        
    },
    props: {
        // postID: String,
        // userFirstname: String,
        // userLastname: String,
        commentAuthor: String,
        commentAuthorID: String,
        commentCreatedAt: String,
        commentUserProfilePic: String,
        commentContent: String,
        commentID: String,
        commentDeleted: Boolean
    },
    components: {
        ModaleDot
    }
}
</script>

<style>

.author-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.author-info p {
    font-size: 12px;
    margin-top: 2px;
}

#comment-profil-pic {
    /* position:relative; */
    overflow:hidden;
    border-radius: 50%;
    border: 1px solid #bebdbd;
    height: 1.6em;
    width: 1.6em;
}

#comment-profil-pic img {
    /* position: absolute; */
    height: 1.7em;
    width: 1.6em;
    /* max-width: 100%; */
}

.username-pic {
    display: flex;
    flex-direction: row;
    margin-right: auto;
}



.one-comment {
    margin: 0.5px 1em 1em 1em;
    padding: 0.5em 1em 1em 1em;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 10px;
    background-color: #f1f1f1;
    color: rgb(46, 45, 45);
    text-align: left;
}

li h6 {
    margin-top: 8px;
}

.one-dot-comment {
    height: 3px;
    width: 3px;
    background-color: rgb(133, 131, 131);
    border-radius: 50%;
    margin-right: 3px;
}

.three-dot-comment {
    display: flex;
    flex-direction: row;
    height: 5px;
    align-items: center;
    border-radius: 5px;
    padding: 7px;
    margin-left: 1em;
    margin-bottom: 5px;
    position: relative;
}

.three-dot-comment:hover {
    cursor: pointer;
    background-color: #cccbcb;
}

</style>