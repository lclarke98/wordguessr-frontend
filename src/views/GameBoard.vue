<template>
  <div class="container game-board">
<!--    <h1>Welcome {{ userInfo.username }}, good luck guessing the word!</h1>-->

    <div class="game-board__info">
      <div id="letter-container">
        <div id="correct-container">
<!--          <h1>Guess The Word</h1>-->
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

      <div id="incorrect-container">
        <div v-if="list.length === 0">
        </div>
        <div v-else>
          <ul>
            <li
                v-for="letter in list"
                :key="letter.guess"
                v-if="letter.correct === false"
                style="padding: 10px; display: inline"
                class="incorrect"
            >
              {{ letter.guess }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="game-board__divider"></div>

    <div class="game-board__guess">
      <form class="game-board__guess__input" @submit.prevent="makeGuess">
        <label>
          <input
              type="text"
              placeholder="Take a guess..."
              v-model="guess"
              pattern="[a-z]{1}"
          />
        </label>
        <div class="btn__container">
          <button class="btn btn--bg-green game-board__guess__input--section-w-500px">Make Guess {{ guessCount }}</button>
        </div>
      </form>
<!--      <div class="game-board__guess__info">-->
<!--        <h3 class="game-board__guess__info__title">Guesses Left:</h3>-->
<!--        <p>{{ guessCount }}</p>-->
<!--      </div>-->
    </div>
    <Modal :title="modalTile" :word="theWord"/>
  </div>
</template>

<script>
import './GameBoard.scss';
import UserInfoStore from '@/app/user-info-store';
import gc from '@/app/game-controller';
import axios from 'axios';
import Modal from "@/components/Modal";
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: 'GameBoard.vue',
  components:{
    Modal
  },
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo,
      isLoading: false,
      guess: '',
      list: '',
      word: '',
      fullWord: '',
      guessCount: 0,
      modalTile: '',
      theWord: '',
    };
  },
  methods: {
    async getGame() {
      axios({
        method: 'get',
        url: API_BASE_URL + '/game/game',
        params: {
          gameID: new URL(location.href).searchParams.get('gameID'),
          userID: this.userInfo.sub,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            this.isLoading = false;
            //this.$emit('completed', response.data.data)
            this.guessCount = response.data[0].count;
            this.fullWord = response.data[0].word;
            this.list = response.data[1];
            this.word = gc.splitWord(response.data[0].word, this.list);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
            this.isLoading = false;
          });
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
            count: this.guessCount,
            userID: this.userInfo.sub,
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
              if (response.data[2].complete === true) {
                this.theWord = this.fullWord
                this.modalTile = "Game Over you won"
                document.getElementById('game-complete-modal').classList.remove('hidden')
              } else if (this.guessCount === 0) {
                this.theWord = this.fullWord
                this.modalTile = "Game Over you lost"
                document.getElementById('game-complete-modal').classList.remove('hidden')
              }
            })
            .catch(error => {
              // handle authentication and validation errors here
              //this.errors = error.response.data.errors;
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
