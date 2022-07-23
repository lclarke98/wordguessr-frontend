<template>
  <div class="container game-history">
    <h2>Game History</h2>

    <table class="history-table">
      <thead class="table-header">
      <tr>
        <th scope="col" class="table-header-spacing">Word</th>
        <th scope="col" class="table-header-spacing">Difficulty</th>
        <th scope="col" class="table-header-spacing">Number of guesses used</th>
        <th scope="col" class="table-header-spacing">Win/Loss</th>
      </tr>
      </thead>

      <tbody class="table-data">
      <tr class="table-data-row" v-for="game in games">
        <th scope="row" class="table-data-spacing">{{ game.word }}</th>
        <td class="table-data-spacing">{{ game.game_mode }}</td>
        <td class="table-data-spacing">{{ game.guesses.length }}</td>
        <td class="table-data-spacing">{{ game.complete }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import UserInfoStore from "@/app/user-info-store";
import axios from "axios";
import gc from "@/app/game-controller";
import './GameHistory.scss'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "GameHistory",
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo,
      games: [],
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
            this.games = response.data
          })
          .catch(error => {
            //this.errors = error.response.data.errors;
            //this.isLoading = false;
            console.log(error)
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