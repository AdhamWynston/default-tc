
export default {
  computed: {
    isAuth () {
      return this.$store.state.auth.check
    },
    user () {
      return this.$store.state.auth.user
    },
    username () {
      return this.isAuth ? this.$store.state.auth.user.name : null
    },

    isAdministrator () {
      return this.$store.getters.isAdmin
    }
  }

}
