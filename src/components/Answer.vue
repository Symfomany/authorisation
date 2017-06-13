<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h3><i class="material-icons">question_answer</i> FAQ</h3>
      
        <div class="row"> 
            
            <ul class="collection">
              <li class="collection-item" v-for="answer in answers">
              <a @click="remove(answer.id)" class="secondary-content"><i class="material-icons red-text">delete_forever</i></a>
                <h4>{{ answer.question }}</h4>
                <p>{{ answer.reponse }}</p>
              </li>
            </ul>

            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input v-validate="{ rules: {required: true,regex: /^([a-z0-9- ]{8,300})$/i} }"   v-model="newAnswer.question" placeholder="Quelle est la question?" id="question" name="question" type="text" class="validate">
                  <span v-show="errors.has('question')" class="text-danger">{{ errors.first('question') }}</span>
                </div>
                <div class="input-field col s12">
                  <input v-validate="{ rules: {required: true,regex: /^([a-z0-9- ]{4,})$/i} }" name="reponse"  v-model="newAnswer.reponse" placeholder="Sa réponses secrete" id="reponse" type="text" class="validate">
                  <span v-show="errors.has('reponse')" class="text-danger">{{ errors.first('reponse') }}</span>
                </div>
                <div class="input-field col s12">
                  <button type="button" @click="add" class="waves-effect waves-light btn"><i class="material-icons left">save</i> Enregistrer cette question</button>
                </div>
              </div>
            </form>

        </div>
                
    </div>
  </div>
</template>


<script>
  import Store from '@/Store.js'

  export default {
    methods: {
      add(){
          this.$http.post(`http://localhost:3000/add`, this.newAnswer).then((res) => {
            this.answers = res.body;
            this.$toasted.show('Votre question a bien été ajoutée!').goAway(1500); // plugin Toast implemented      
            this.newAnswer = {
              question: '',
              reponse: ''
            };
            
          });
      },
      
      remove(id){
          this.$http.get(`http://localhost:3000/remove/${id}`).then((res) => {
              this.answers = res.body;
              this.$toasted.show('Vous devez etre connecté...').goAway(1500); // plugin Toast implemented      
          });
      }

    },

    data() {
      return {
         newAnswer: {
          question: '',
          reponse: ''
        },
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
<style>
  h4{
    font-size: 16px;
    font-style: italic;
  }
</style>