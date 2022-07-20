<template>
  <div class="container game-controller">
    <h2>Game History</h2>
  </div>
</template>

<script>
import UserInfoStore from "@/app/user-info-store";
import axios from "axios";
import gc from "@/app/game-controller";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "GameHistory",
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo
    };
  },

  methods: {
    async getGames() {
      axios({
        method: 'get',
        url: API_BASE_URL + '/game/allGames',
        params: {
          userID: this.userInfo.sub,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            //this.$emit('completed', response.data.data)
            console.log(response.data)
          })
          .catch(error => {
            //this.errors = error.response.data.errors;
            //this.isLoading = false;
          });
    },
  },
  beforeMount() {
    this.getGames();
  }
}
</script>

<style scoped>

</style>