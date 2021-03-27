<template>
  <div class="container">
    <User></User>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home';

export default {
  name: 'HomePage',
  components: {
    User
  }
};
</script>
