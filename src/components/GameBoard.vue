<template>
  <div>
    <h1>Hi {{userInfo.username}}, guess the word...</h1>
    <form @submit.prevent="makeGuess">
      <label>
        <input type="text" placeholder="Make guess" v-model="guess" pattern="[a-z]{1}" >
      </label>
      <button>Make Guess</button>
    </form>
  </div>

</template>

<script>

import UserInfoStore from "@/app/user-info-store";
import gc from "@/app/game-controller";
import axios from 'axios'
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export default {
name: "GameBoard.vue",
  data: function() {
    return{
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo,
      isLoading: false,
      guess: ''
    }
  },
  methods: {
    async getGame(){
      console.log('hiiii')
      console.log(new URL(location.href).searchParams.get('gameID'))
      axios({
        method:'get',
        url: API_BASE_URL + '/game/game',
        params: {
          gameID: new URL(location.href).searchParams.get('gameID'),
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
          .then(response => {
            this.isLoading = false
            this.$emit('completed', response.data.data)
            console.log(response.data)
          })
          .catch(error => {
            this.errors = error.response.data.errors
            this.isLoading = false
          })
    },

    async makeGuess(){
      await gc.guessWord(this.guess)
      console.log("making guess")
      axios({
        method: 'post',
        url: API_BASE_URL + '/game/guessLetter',
        data: {
          gameID: new URL(location.href).searchParams.get('gameID'),
          guess: this.guess,
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
          .then(response => {
            this.guess = ''
            this.isLoading = false
            this.$emit('completed', response.data.data)
          })
          .catch(error => {
            // handle authentication and validation errors here
            this.errors = error.response.data.errors
            this.isLoading = false
          })
    },
  },
  beforeMount(){
    this.getGame()
  },
}
</script>

<style scoped>

</style>