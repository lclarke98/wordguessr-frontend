<template>
  <div id="root" class="theme theme--light">
    <div id="app">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import './styles/root.scss';
import './styles/typography/heading.scss';
import './styles/buttons/buttons.scss';

import Header from '@/components/Header/Header';
import UserInfoStore from "@/app/user-info-store";

export default {
  name: 'app',
  components: {
    Header
  },

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
