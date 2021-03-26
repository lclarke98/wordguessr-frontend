<template>
  <div>
    <button v-on:click="createGame('normal')">Normal</button>
  </div>
</template>

<script>
import axios from 'axios';
import UserInfoStore from '../app/user-info-store';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export default {
  name: 'GameController',

  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo
    };
  },

  methods: {
    async createGame() {
      window.location.href = 'StartGame?gameID=52';
      // axios({
      //   method: 'post',
      //   url: API_BASE_URL + '/game/createGame',
      //   data: {
      //     sub: this.userInfo.sub,
      //     mode: mode,
      //   },
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // })
      //     .then(response => {
      //       window.location.href = 'StartGame?gameID=' + response.data.gameID;
      //     })
      //     .catch(error => {
      //       // handle authentication and validation errors here
      //       this.errors = error.response.data.errors
      //       this.isLoading = false
      //     })
    }
  }
};
</script>

<style scoped></style>
