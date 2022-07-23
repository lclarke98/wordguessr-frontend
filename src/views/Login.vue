<template>
  <div class="login-container">
    <form class="login-form">
        <input
            type="email"
            placeholder="Email Address"
            name="email"
            v-model="email"
            required
        />
        <input
            type="password"
            placeholder="password"
            name="password"
            v-model="password"
            required
        />

      <div class="btn-container">
        <button class="btn" v-on:click="login">Log In</button>
      </div>
    </form>
    <a>
      Dont have an account?
    </a>
  </div>

</template>

<script>
import './login.scss'
import '../styles/buttons/buttons.scss'
import UserInfoStore from "@/app/user-info-store";
import {Amplify, Auth} from "aws-amplify"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'eu-west-2',
    userPoolId: 'wordguessr-userpool',
    userPoolWebClientId: '1t2c4ei2k312p0f5nk6eca9pfj'
  }
})

export default {
  name: "Login",
  data: function() {
    return {
      userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
      userInfo: UserInfoStore.state.cognitoInfo,
      email: '',
      password: '',
    };
  },
  methods:{
    async login(){
      await Auth.signIn(this.email,this.password)
    }
  }
}
</script>

<style scoped>

</style>