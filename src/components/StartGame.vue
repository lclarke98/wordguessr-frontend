<template>
  <form @submit.prevent="onSubmit">
    <h1>Wordguessr</h1>
    <h2>Enter your name to start a game :) </h2>
    <span class="help is-danger" v-text="errors"></span>

    <div class="field">
      <div class="control">
        <input class="input" type="name" placeholder="enter player name..." v-model="name" @keydown="errors = ''">
      </div>
    </div>

    <button class="button is-primary" v-bind:class="{ 'is-loading' : isLoading }">Add Player</button>
  </form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  data() {
    return {
      name: '',
      errors: '',
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      this.postPlayer()
    },
    async postPlayer() {
      //axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
      axios.defaults.headers.common['Authorization'] = `Bearer`
      axios.post(API_BASE_URL + 'game/create', this.$data)
          .then(response => {
            this.name = ''
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