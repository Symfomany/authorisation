<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Les questions</h2>

       <ul>
       
        <li v-for="answer in answers">
          <div class="collapsible-header">{{ answer.question }}</div>
          <div>{{ answer.reponse }}</div>
        </li>
        
      </ul>
        
    </div>
  </div>
</template>


<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
          answers: []
      }
    },

    created() {

      if (!Store.user.authenticated) {
        this.$router.push('/')
        this.$toasted.show('Vous devez etre connecté...').goAway(1500); // plugin Toast implemented

      }else{
          this.$http.get('http://localhost:3000/answers').then((res) => {
            this.answers = res.body;
          });
      }

    }


  }
</script>