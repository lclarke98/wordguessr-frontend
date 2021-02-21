<template>
  <div>
    <h1>Hi {{userInfo.username}}, guess the word...</h1>
    <form @submit.prevent="onSubmit">
      <label>
        <input type="text" placeholder="Make guess" v-model="guess" pattern="[a-z]{1}" >
      </label>
      <button>Make Guess</button>
    </form>
  </div>

</template>

<script>

import UserInfoStore from "@/app/user-info-store";
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
    onSubmit() {
      this.isLoading = true
      this.test()
    },
    async postPlayer() {
      //axios.defaults.headers.common['X-CSRF-TOKEN']
      //axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf;
      //axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`

      //axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      axios.get(API_BASE_URL + '/game/test', this.$data)
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

    async test(){
      console.log("HIIIII")
      axios({
        method: 'post',
        url: API_BASE_URL + '/api/test',
        data: {
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
    }
  }
}
</script>

<style scoped>

</style>