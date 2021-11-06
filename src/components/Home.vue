<template>
  <div class="home">
    <h1>wordguessr</h1>
    <div class="alert alert-info">
      {{ userInfo }}
    </div>

    <div class="btn__container btn__container--w-250px">
      <router-link class="btn" to="/game">New Game</router-link>
      <router-link class="btn" to="/logout">Logout</router-link>
    </div>
  </div>
</template>

<script>
import './Home.scss';
import '../styles/buttons/buttons.scss';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
import UserInfoStore from '../app/user-info-store';
import axios from 'axios';
export default {
  name: 'Home',
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: "UserInfoStore.state.cognitoInfo"
    };
  },

  methods: {
    checkUser() {
      axios({
        method: 'post',
        url: API_BASE_URL + '/user/user',
        data: {
          sub: "this.userInfo.sub"
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.guess = '';
          this.isLoading = false;
          this.$emit('completed', response.data.data);
        })
        .catch(error => {
          // handle authentication and validation errors here
          this.errors = error.response.data.errors;
          this.isLoading = false;
        });
    }
  },

  beforeMount() {
    this.checkUser();
  }
};
</script>

<style></style>
