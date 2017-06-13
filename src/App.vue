<template>
  <div id="app">
   <nav>
    <div class="nav-wrapper">
      <a href="#" v-if="user.authenticated"  class="brand-logo right">{{ user.datas.nom }} {{ user.datas.prenom }}</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><router-link :to="{ name: 'home'}">Home</router-link></li>
      </ul>
    </div>
  </nav>
        
    <div class="container">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {
    name: 'app',
    data() {
      return {
        user: Store.user
      }
    },

    methods: {
      logout() {
        // remove session datas
        localStorage.removeItem('id_token')
        localStorage.removeItem('user')

        Store.user.datas = {};
        Store.user.authenticated = false

        this.$router.push('/login') //redirection
      }
    }

  }
</script>