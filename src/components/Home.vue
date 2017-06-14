<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h3>FAQ secrète</h3>
    <ul>
        <li><router-link :to="{ name: 'a'}">Composant A</router-link></li>
        <li><router-link :to="{ name: 'b'}">Composant B</router-link></li>
    </ul>
      <router-view></router-view>

    <p v-if="user.authenticated == false">Créer des questions publiques et des réponses secrètes</p>
    <p v-if="user.authenticated == true">Bienvenue {{ user.datas.nom }} {{ user.datas.prenom }}</p>
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
            
            this.$toasted.show('Vous etes connecté en tant que Julien Boyer').goAway(1500); // plugin Toast implemented

        });

      }
    }

  }
</script>