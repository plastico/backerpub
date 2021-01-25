<template>
  <div class="home">
   <SignIn />
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/signin.vue'

export default {
  name: 'Home',
  components: {
    SignIn
  }
}
</script>
