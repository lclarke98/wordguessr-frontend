<template>
  <div class="row">
    <div class="col">
      <h3>Welcome, </h3>
      <div class="alert alert-info">
        {{userInfo}}
      </div>

      <ul>
        <li><router-link to="/game">New Game</router-link></li>
        <li><router-link to="/logout">Logout</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
const API_BASE_URL = 'http://localhost:8080';
import UserInfoStore from '../app/user-info-store';
import axios from "axios";
export default {

  name: 'Home',
  data: function() {
    return{
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo
    }
  },

  methods:{
    checkUser(){
      axios({
        method: 'post',
        url: API_BASE_URL + '/user/user',
        data: {
          sub: this.userInfo.sub,
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
  },

  beforeMount(){
    this.checkUser()
  },
}
</script>

<style>
</style>