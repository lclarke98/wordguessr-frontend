<template>
  <div id="game-complete-modal" class="hidden">
    <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" class="modal-container" aria-modal="true" role="dialog">
      <div class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <!-- Modal header -->
          <div class="modal-header">
            <h3 class="modal-header-content">
              {{ title }}
            </h3>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <p class="modal-body-content">
              Your Word Was: {{ word }}
            </p>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button data-modal-toggle="defaultModal" type="button" class="btn btn--bg-green btn--space" v-on:click="playAgain">Play Again</button>
            <button data-modal-toggle="defaultModal" type="button" class="btn btn--space" v-on:click="returnHome">Return to Home</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import './Modal.scss'
import '../styles/buttons/buttons.scss'
export default {
  name: "Modal",
  props: {
    title: String,
    word: String
  },

  methods:{
    returnHome(){
      window.location.href = '/'
    },

    playAgain(){
      window.location.href = '/game'
    }
  }

}

</script>


<style scoped>

</style>