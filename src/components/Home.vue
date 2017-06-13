<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h3>FAQ secrète</h3>

    <p>Créer des questions publiques et des réponses secrètes</p>
    <div class="" v-if="user.authenticated == false">Vous devez être connecté pour créer son sujet et sa réponse</div>
    <button class="btn btn-primary" @click="connection()"><i class="material-icons">lock_open</i> Je m'authentifie en tant que Julien Boyer</button>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
          user: Store.user
      }
    },

    methods: {
      connection() {
        this.$http.post('http://localhost:3000/signin').then((res) => {
            
            localStorage.setItem('id_token', res.body.id_token)
            localStorage.setItem('user', JSON.stringify(res.body.user))
            
            Store.user.datas = res.body.user;
            Store.user.authenticated = true
            
            this.$router.push('/answer'); //redirection
            this.$toasted.show('Vous etes connecté en tant que Julien Boyer').goAway(1500); // plugin Toast implemented

        });

      }
    }

  }
</script>