<template>
  <div class="container">
    <GameController>
      <h1>Start Game</h1>
    </GameController>
  </div>
</template>

<script>
// @ is an alias to /src
import GameController from '@/components/GameController.vue';

export default {
  name: 'Game',
  components: {
    GameController
  }
};
</script>
