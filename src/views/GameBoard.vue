<template>

  <GameBoard>
    <h1>Start Game</h1>
  </GameBoard>

</template>

<script>
// @ is an alias to /src
import GameBoard from '@/components/GameBoard.vue'

export default {
  name: 'Game',
  components: {
    GameBoard
  }
}
</script>
