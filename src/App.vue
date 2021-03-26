<template>
  <div class="theme theme--dark">
    <div id="app">
      <div class="contents">
        <Header />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import './styles/root.scss';
import './styles/typography/heading.scss';
import './styles/buttons/buttons.scss';

import Header from '@/components/Header/Header';

export default {
  name: 'app',
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
