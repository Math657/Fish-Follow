<template>
    <div>
        <div v-if="showBoxComments" class="comment-box">
            <div v-if="showInputComment" class="sendbox-comment">
                <textarea-autosize v-model="comment" :min-height="20" :max-height="350" rows="1" type="text" autofocus class="input-comment" maxlength="200" placeholder="Votre commentaire..."></textarea-autosize>
                <button class="mb-1 btn-main" id="send-comment" @click="submitComment()">Publier</button>
            </div>
            <div v-if="emptyComment">
                <p class="comment-empty">Votre commentaire ne doit pas être vide ou dépasser 500 charactères! !</p>
            </div>
            <div v-if="commentPublished">
                <p class="comment-published">Commentaire publié!</p>
            </div>
            
            <div class="all-comments">
                <ul class="comments-list">
                    <p v-if="allComments.length > 0" >Les plus récents</p>
                    <li :key="i" v-for="(com, i) in allComments" class="one-comment">

                        <div class="author-info">

                            <router-link class="username-pic" :to="`/user/${allComments[i].comment.authorID}`" 
                                         data-toggle="tooltip" title="Voir le profil" >
                                <div v-if="allComments.length > 0" id="comment-profil-pic">
                                    <img :src="allComments[i].user.profilPic" alt="Photo de profil">
                                </div>
                                <p class="comment-author">{{ allComments[i].comment.author }}</p>
                            </router-link>

                            <p class="comment-date">{{ moment(allComments[i].comment.createdAt).fromNow() }}</p>

                            <div @click="showModaleDot()" class="three-dot-comment">
                                <div class="one-dot-comment"></div>
                                <div class="one-dot-comment"></div>
                                <div class="one-dot-comment"></div>
                            </div>
                            <!-- <ModaleDot :reveleModaleDot="reveleModaleDot"></ModaleDot> -->
                            
                        </div>
                        <h6>{{ allComments[i].comment.comment }}</h6>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// import ModaleDot from './ModaleDot'
export default {
    name:'Comment',
    data() {
        return {
            showInputComment: true,
            commentPublished: false,
            emptyComment: false,
            reveleModaleDot: false,
            comment: '',
            allComments: []
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
                .then(() => {
                    this.showInputComment = false
                    this.commentPublished = true
                    // this.allComments.push(this.comment) // fonctionne mal
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
        showModaleDot() {
                this.reveleModaleDot = !this.reveleModaleDot
        }
    },
    mounted() {
        this.$http.get(`${this.$store.state.url}/api/auth/getcomments/${this.postID}`)
        .then((res) => {
            for (let com of res.data) {
                this.allComments.push(com)  
                this.$emit('toPost', this.allComments)  
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
        userLastname: String,
    },
    components: {
        // ModaleDot
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

.username-pic:hover {
    opacity: 80%;
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
}

.three-dot-comment:hover {
    cursor: pointer;
    background-color: #cccbcb;
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


</style>