<template>
  <div class="game-board">
    <h1>Settings Page</h1>

    <div id="drop-down">
      <toggle-button id="lightswitch" :value="true" :labels="{checked: 'Light', unchecked: 'Dark'}" @change="onChangeEventHandler"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'SettingsPage',
  components: {

  },

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
