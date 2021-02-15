<template>
    <div>
        <div v-if="showBoxComments" class="comment-box">
            <div v-if="showInputComment" class="sendbox-comment">
                <textarea-autosize v-model="comment" :min-height="20" :max-height="350" rows="1" type="text" autofocus class="input-comment" maxlength="200" placeholder="Votre commentaire..."></textarea-autosize>
                <button class="mb-1 btn-main" id="send-comment" @click="submitComment()">Publier</button>
            </div>
            <div v-if="emptyComment">
                <p class="comment-empty">Votre commentaire ne doit pas être vide ou dépasser 500 charactères!</p>
            </div>
            <div v-if="commentPublished">
                <p class="comment-published">Commentaire publié!</p>
            </div>
            <div v-if="commentDeleted">
                <p class="comment-published">Commentaire supprimé.</p>
            </div>
            
            <div class="all-comments">
                <ul class="comments-list">
                    <p v-if="allComments.length > 0" >Les plus récents</p>
                    <li :key="i" v-for="(com, i) in allComments" class="one-comment">

                        <OneComment 
                            :commentAuthor="allComments[i].comment.author"
                            :commentAuthorID="allComments[i].comment.authorID"
                            :commentContent="allComments[i].comment.comment"
                            :commentCreatedAt="allComments[i].comment.createdAt"
                            :commentUserProfilePic="allComments[i].user.profilPic"
                            :commentID="allComments[i].comment._id"
                            @delete-comment="deleteComment">   
                        </OneComment>

                    </li>
                </ul>
                
            </div>
        </div>
    </div>
</template>

<script>
import OneComment from './OneComment.vue'

export default {
    name:'AllComments',
    data() {
        return {
            showInputComment: true,
            commentPublished: false,
            commentDeleted: false,
            emptyComment: false,
            comment: '',
            allComments: [],
            dataComment: { // Structure d'un commentaire pour la réactivité
                comment: null,
                user: {
                    profilPic: this.$store.state.userProfilPic
                }
            }
        }
    },
    methods: {
        checkComment() {
            if (this.comment != '' && this.comment.length < 500) {
                return true
            }
            else {
                return false
            }
        },
        submitComment() {
            if (this.checkComment()) {
                this.$http.post(`${this.$store.state.url}/api/auth/comment`, {
                    postID: this.postID,
                    comment: this.comment,
                    authorID: this.$store.state.userId
                })
                .then((res) => {
                    this.showInputComment = false
                    this.commentPublished = true
                    this.commentDeleted = false   
                    this.dataComment.comment = res.data
                    this.allComments.unshift(this.dataComment)
                    this.comment = ''
                    this.emptyComment = false
                })
                .catch((err) => {
                    this.checkIfTokenIsValid(err)
                })
            }
            else {
                this.emptyComment = true
            }  
        },
        deleteComment(commentID) {
            for (let i = 0; i < this.allComments.length; i++) {
                if (this.allComments[i].comment._id === commentID) {
                    this.allComments.splice(i, 1)
                } 
            }  
            this.commentPublished = false
            this.commentDeleted = true
        }
    },
    mounted() {
        this.$http.get(`${this.$store.state.url}/api/auth/getcomments/${this.postID}`)
        .then((res) => {
            for (let com of res.data) {
                this.allComments.push(com)  
                this.$emit('toPost', this.allComments.length)  
            }
        })
        .catch((err) => {
            this.checkIfTokenIsValid(err)
        })
    },
    props: {
        postID: String,
        showBoxComments: Boolean,
        userFirstname: String,
        userLastname: String
    },
    components: {
        OneComment
    }
}

</script>

<style>

.comment-box {
    display: flex;
    flex-direction: column;
}

.sendbox-comment {
    display: flex;
    align-items: center;
    margin-right: 1em;
}

.input-comment {
    margin: 1em 1em 1em 1em;
    width: 30em;
    /* height: 60px; */
    padding: .5rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #242627;
    background-color: #f1f1f1;
    border: 1px solid #ced4da;
    border-radius: 2rem;
    resize: none;
    overflow: hidden;
}

.input-comment:focus {
    outline: none;
}

#send-comment {
    width: 7em;
    padding: 3px 8px 3px 8px;
    font-size: 16px;
}

.show-comments:hover {
    cursor: pointer;
}

.comment-published {
    color: #0A3046;
    margin-top: 1em;
}

.comment-empty {
    color: #0A3046;
    font-size: 90%;
}

.comments-list {
    list-style: none;
    padding: 0;
}

.comments-list p {
    text-align: left;
    margin-left: 0.7em;
    margin-bottom: 0.5em;
    color: #02080a;
    font-size: 14px;
}

</style>