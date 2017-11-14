<template>
    <a href="#" @click.prevent="logout()">Logout</a>
</template>

<script type="text/javascript">
    export default {
      methods: {
        logout () {
          let goToLogin = () => {
            this.$router.push('/login')
          }
          this.$store.dispatch('logout')
            .then(goToLogin)
            .catch(goToLogin)
        }
      }
    }
</script>

<style>
</style>