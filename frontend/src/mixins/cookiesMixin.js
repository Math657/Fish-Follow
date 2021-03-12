import store from '../store/index'

export function createCookie(name, value, days) {
    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        var expires = '; expires=' + date.toGMTString()
    }
    else expires = ''
    document.cookie = name + '=' + value + expires + '; path=/'
}

export function readCookie(name) {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }
    return null
}

export function eraseCookie(name) {
    this.createCookie(name,'', -1)
}

export function checkIfLogged() {
    if (readCookie('isLogged') === 'true') {
        return true
    }
    else if (store.state.isLogged) {
        return store.state.isLogged
    } else {
        return false
    }
}

export function checkUserId() {
    if (readCookie('userId') !== '') {
        return this.readCookie('userId')
    } else if (store.state.userId.length !== '') {
        return store.state.userId
    } else this.loggout()
}

export default { 
    methods: {
        checkIfLogged,
        createCookie,
        readCookie,
        eraseCookie,
        checkUserId
    }
}