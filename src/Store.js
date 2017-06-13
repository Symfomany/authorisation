
export default {

    user: {
        authenticated: false,
        datas: {}
    },

    checkAuth() {
        console.log('check')
        // savoir si il est Authentifié, Si oui, recharger le Store depuis la session
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.user.datas = user
            }
        }
        else {
            this.user.authenticated = false
        }
    },

    getAuthHeader() {
        return 'Bearer ' + localStorage.getItem('id_token')

    }

}