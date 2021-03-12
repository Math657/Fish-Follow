<template>
    <div>
        <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
            <div class="google-btn">
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p class="btn-text">Log in with Google</p>
            </div>
        </g-signin-button>
        <p v-if="noAccount" class="error">Aucun compte associé à cette adresse e-mail.</p>
        <p v-if="googleError" class="error">Une erreur est survenue</p>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            /**
             * The Auth2 parameters, as seen on
             * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
             * As the very least, a valid client_id must present.
             * @type {Object} 
             */
            googleSignInParams: {
                client_id: '499019390281-7cb4nbfnqlb92ge8v3p6kmbuui7jgfa5.apps.googleusercontent.com'
            },
            noAccount: false,
            googleError: false
        }
    },
    methods: {
        onSignInSuccess(googleUser) {
            this.noAccount = false
            const profile = googleUser.getBasicProfile()
            this.$http.post(`${this.$store.state.url}/api/auth/googleLogin`, {
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                image: profile.getImageUrl()
            })
            .then(res => {
                this.createCookie('userId', res.data.userId, 365)
                this.createCookie('userProfilPic', res.data.userProfilPic, 365)
                this.createCookie('isLogged', true, 365)

                localStorage.setItem('userID', JSON.stringify(res.data.userId))
                localStorage.setItem('userProfilPic', JSON.stringify(res.data.userProfilPic))
                this.$store.dispatch('StoreId')
                this.$store.dispatch('StoreProfilPic')
                this.$store.dispatch('Logged')
                if (res.data.userStatus === 'admin') {
                    this.$store.dispatch('IsAdmin')
                    this.createCookie('isAdmin', true, 365)
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                        this.noAccount = true
                    }
                    else {
                        this.googleError = true
                        console.log(err)
                    }
            })
        },
        onSignInError(error) {
            this.googleError = true
            console.log(error)
        }
    }
}
</script>

<style>

@import url(https://fonts.googleapis.com/css?family=Roboto:500);

.g-signin-button {
    display: inline-block;
    margin-top: 1em;
}

.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
}

.google-btn:hover {
    cursor: pointer;
}

.google-btn .google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
}

.google-btn .google-icon {
  position: absolute;
  margin-top: 11px;
  margin-left: -8px;
  width: 18px;
  height: 18px;
}

.google-btn .btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: "Roboto";
}

.google-btn:hover {
  box-shadow: 0 0 6px #4285f4;
}

.google-btn:active {
  background: #1669f2;
}

/* .g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}

.g-signin-button:hover {
    cursor: pointer;
    opacity: 0.8;
} */

</style>