<template>
    <div v-if="reveleModaleDot">
        <div class="three-dot-modale">
            <p v-if="commentAuthorID === this.$store.state.userId" @click="deleteComment()"><font-awesome-icon icon="trash-alt" class="icons dot-comment-icon" /> Supprimer mon commentaire</p>
            <p v-else-if="this.$store.state.isAdmin" @click="deleteCommentAdmin()"><font-awesome-icon icon="trash-alt" class="icons dot-comment-icon" /> Supprimer le commentaire</p>
            <p><font-awesome-icon icon="exclamation-circle" class="icons dot-comment-icon" data-toggle="tooltip" title="Ce commentaire est innaproprié ou offensant" /> Signaler le commentaire</p>
        </div>

        <div class="modale-overlay">    
        </div>
    </div> 
</template>

<script>
export default {
    name: 'ModaleDot',
    props: ['reveleModaleDot', 'hideModale', 'commentID', 'commentDeleted', 'commentAuthorID'],
    data() {
        return {

        }
    },
    methods: {
        deleteComment() {
            this.$http.delete(`${this.$store.state.url}/api/auth/deleteComment/${this.commentID}`)
            .then(() => {
                this.$emit('delete-comment', this.commentID)
            })
            .catch(err => {
                this.checkIfTokenIsValid(err)
            })
        },
        deleteCommentAdmin() {
            this.$http.delete(`${this.$store.state.url}/api/auth/deleteCommentAdmin/${this.commentID}/${this.$store.state.userId}`)
            .then(() => {
                this.$emit('delete-comment', this.commentID)
            })
            .catch(err => {
                this.checkIfTokenIsValid(err)
            })
        }
    }
}
</script>

<style>

.modale-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.three-dot-modale {
    position: absolute;
    right: 0%;
    bottom: 130%;
    background: #f1f1f1;
    color: #0A3046;
    padding: 10px;
    border-radius: 3px;
    width: 250px;
    box-shadow: 0px 0px 2px 1px #cccbcb;
    -webkit-box-shadow: 0px 0px 2px 1px #cccbcb;
    -moz-box-shadow: 0px 0px 2px 1px #cccbcb;
    z-index: 1;
}

.three-dot-modale p {
    color: #0A3046 !important;
    font-size: 14px !important;
    margin-top: 5px !important;
}



.three-dot-modale p:hover {
    cursor: pointer;
    background-color: #dfdede;
}

.dot-comment-icon {
    margin-right: 5px;
}

</style>