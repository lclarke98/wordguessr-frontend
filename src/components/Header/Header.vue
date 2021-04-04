<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <h2>wordguessr</h2>
      </div>
      <div class="header__profile">
        <font-awesome-icon icon="user-circle" />
      </div>
      <div class="btn__container">
        <router-link class="header__logout-btn btn" to="/logout">Logout</router-link>
      </div>
    </div>

    <div id="drop-down">
      <toggle-button id="lightswitch" :value="true" :labels="{checked: 'Light', unchecked: 'Dark'}" @change="onChangeEventHandler"/>
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
    onChangeEventHandler(){
      let root = document.getElementById('root')
      console.log(document.getElementById('lightswitch'))
      if (root.classList.contains('theme--dark')){
        document.getElementById('root').classList.remove("theme--dark");
        document.getElementById('root').classList.add("theme--light");
      }else{
        document.getElementById('root').classList.remove("theme--light");
        document.getElementById('root').classList.add("theme--dark");
      }



    }
  }
};


</script>

<style></style>
