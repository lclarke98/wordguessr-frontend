<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <router-link to="/"><h2>wordguessr</h2></router-link>
      </div>
      <div class="header__profile">
        <router-link to="/settings"><font-awesome-icon icon="user-circle" /></router-link>
      </div>
      <div class="btn__container">
        <router-link class="header__logout-btn btn" to="/logout">Logout</router-link>
      </div>
    </div>

  </header>
</template>

<script>
import './Header.scss';

export default {
  name: 'Header',
  data: function() {
    return {
      darkMode: true
    };
  },
  methods:{
  }
};


</script>

<style></style>
