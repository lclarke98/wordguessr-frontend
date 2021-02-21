<template>
  <div>
    <button v-on:click="createGame">Normal</button>
  </div>

</template>

<script>
export default {
  name: "GameController",
  methods:{
    createGame(){
      window.location.href = 'StartGame';
    }
  }
}
</script>

<style scoped>

</style>