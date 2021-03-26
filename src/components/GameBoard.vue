<template>
  <div>
    <h1>Hi {{ userInfo.username }}, guess the word...</h1>
    <h2>Number of guesses remaining: {{ guessCount }}</h2>
    <form @submit.prevent="makeGuess">
      <label>
        <input
          type="text"
          placeholder="Make guess"
          v-model="guess"
          pattern="[a-z]{1}"
        />
      </label>
      <button>Make Guess</button>
    </form>

    <div id="letter-container">
      <div id="correct-container">
        <h1>The Word</h1>
        <div v-if="list.length === 0">
          <ul>
            <li v-for="char in word" style="padding: 10px; display: inline">
              _
            </li>
          </ul>
        </div>
        <div v-else>
          <ul>
            <li
              v-for="char in word"
              v-if="char.display === true"
              style="padding: 10px; display: inline"
            >
              {{ char.letter }}
            </li>
            <li
              v-else-if="char.display === false"
              style="padding: 10px; display: inline"
            >
              _
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ul></ul>

    <div id="incorrect-container">
      <h1>Incorrect guesses</h1>
      <div v-if="list.length === 0">
        No guesses yet
      </div>
      <div v-else>
        <ul>
          <li
            v-for="letter in list"
            :key="letter.guess"
            v-if="letter.correct === false"
            style="padding: 10px; display: inline"
          >
            {{ letter.guess }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoStore from '@/app/user-info-store';
import gc from '@/app/game-controller';
import axios from 'axios';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: 'GameBoard.vue',
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo,
      isLoading: false,
      guess: '',
      list: '',
      word: '',
      fullWord: '',
      guessCount: 0
    };
  },
  methods: {
    async getGame() {
      // axios({
      //   method:'get',
      //   url: API_BASE_URL + '/game/game',
      //   params: {
      //     gameID: new URL(location.href).searchParams.get('gameID'),
      //   },
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // })
      //     .then(response => {
      //       this.isLoading = false
      //       //this.$emit('completed', response.data.data)
      //       this.guessCount = response.data[0].guess_count
      //       this.fullWord = response.data[0].word
      //       this.list = response.data[1]
      //       this.word = gc.splitWord(response.data[0].word, this.list)
      //     })
      //     .catch(error => {
      //       this.errors = error.response.data.errors
      //       this.isLoading = false
      //     })
    },

    async makeGuess() {
      if (!this.fullWord.includes(this.guess)) {
        this.guessCount -= 1;
      }
      if (
        (await gc.validateGuess(this.guess, this.list)) === true &&
        this.guess !== ''
      ) {
        axios({
          method: 'post',
          url: API_BASE_URL + '/game/guessLetter',
          data: {
            gameID: new URL(location.href).searchParams.get('gameID'),
            guess: this.guess,
            count: this.guessCount
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            this.guess = '';
            this.isLoading = false;
            this.list = response.data[1];
            this.word = gc.splitWord(response.data[0].word, this.list);
            //this.$emit('completed', response.data.data)
            if (response.data[2].complete === true) {
              alert('Game Over you won');
            } else if (this.guessCount === 0) {
              alert('game over you lost');
            }
          })
          .catch(error => {
            // handle authentication and validation errors here
            this.errors = error.response.data.errors;
            this.isLoading = false;
          });
      } else {
        alert('Guess already made');
        this.guess = '';
      }
    }
  },
  beforeMount() {
    this.getGame();
  }
};
</script>

<style scoped></style>
