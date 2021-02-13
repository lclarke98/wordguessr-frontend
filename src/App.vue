<template>
  <div id="app">
    <auth/>
  </div>
</template>

<script>
import auth from './components/Auth.vue'
import axios from "axios";

export default {
  name: 'App',
  components: {
    auth
  },
  methods: {
    onload(){
      this.getUserInfo()
    }
  },

  getUserInfo(){
    console.log("Testing")
    var jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
    const USERINFO_URL = 'https://'+auth.auth.getAppWebDomain() + '/oauth2/userInfo';
    var requestData = {
      headers: {
        'Authorization': 'Bearer '+ jwtToken
      }
    }
    return axios.get(USERINFO_URL, requestData).then(response => {
      console.log(response.data)
      return response.data;
    });
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
