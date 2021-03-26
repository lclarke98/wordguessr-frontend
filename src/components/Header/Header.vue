<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo"><h2>wordguessr</h2></div>
      <div class="header__profile">
        <font-awesome-icon icon="user-circle" />
      </div>
      <div class="btn__container">
        <router-link class="header__logout-btn btn" to="/logout"
          >Logout</router-link
        >
      </div>
    </div>
  </header>
</template>

<script>
import './Header.scss';

export default {
  name: 'Header'
};
</script>

<style></style>
