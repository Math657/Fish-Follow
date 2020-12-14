<template>
    <div>
        <div v-if="showBoxComments" class="comment-box">
            <div v-if="showInputComment" class="sendbox-comment">
                <textarea-autosize v-model="comment" :min-height="20" :max-height="350" rows="1" type="text" autofocus class="input-comment" maxlength="200" placeholder="Votre commentaire..."></textarea-autosize>
                <button class="mb-1 btn-main" id="send-comment" @click="submitComment()">Publier</button>
            </div>
            <div v-if="commentPublished">
                <p class="comment-published">Commentaire publié!</p>
            </div>
            
            <div class="all-comments">
                <ul class="comments-list">
                    <p v-if="allComments.length > 0" >Les plus récents</p>
                    <li :key="i" v-for="(com, i) in allComments" class="one-comment">

                        <div class="author-info">
                            <router-link class="username-pic" :to="`/user/${allComments[i].comment.authorID}`" data-toggle="tooltip" title="Voir le profil" >
                                <div v-if="allComments.length > 0" id="comment-profil-pic">
                                    <img :src="allComments[i].user.profilPic" alt="Photo de profil">
                                </div>
                                <p class="comment-author">{{ allComments[i].comment.author }}</p>
                            </router-link>
                            <p class="comment-date">{{ moment(allComments[i].comment.createdAt).fromNow() }}</p>
                        </div>
                        <h6>{{ allComments[i].comment.comment }}</h6>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name:'Comment',
    data() {
        return {
            showInputComment: true,
            commentPublished: false,
            comment: '',
            allComments: []
        }
    },
    methods: {
        checkComment() {
            if (this.comment != '') {
                return true
            }
            else {
                return false
            }
        },
        submitComment() {
            if (this.checkComment()) {
                this.$http.post('http://localhost:3000/api/auth/comment', {
                    postID: this.postID,
                    comment: this.comment,
                    authorID: this.$store.state.userId
                })
                .then(() => {
                    this.showInputComment = false
                    this.commentPublished = true
                    // this.allComments[0].push(this.comment) // fonctionne mal
                    this.comment = ''
                })
                .catch((err) => {
                    this.checkIfTokenIsValid(err)
                })
            }
            else {
                console.log('Votre commentaire ne peut pas être vide!')
            }  
        }
    },
    mounted() {
        this.$http.get(`http://localhost:3000/api/auth/getcomments/${this.postID}`)
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