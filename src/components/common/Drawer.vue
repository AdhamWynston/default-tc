<template>
    <div>

    </div>
</template>

<script>
  import {
    QIcon,
    QList,
    QPopover,
    Loading,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  } from 'quasar'
  import authMixin from '../../mixins/auth.mixin'
  export default {
    data () {
      return {
        anchorOrigin: {vertical: 'bottom', horizontal: 'left'},
        selfOrigin: {vertical: 'top', horizontal: 'left'}
      }
    },
    name: 'drawer',
    components: {
      Loading,
      QIcon,
      QList,
      QPopover,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink
    },
    computed: {
      anchor () {
        return `${this.anchorOrigin.vertical} ${this.anchorOrigin.horizontal}`
      },
      self () {
        return `${this.selfOrigin.vertical} ${this.selfOrigin.horizontal}`
      }
    },
    mixins: [authMixin],
    methods: {
      myAccount () {
        return this.$router.push('/my-account')
      },
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      logout () {
        Loading.show()
        let goToLogin = () => {
          this.closeLoading()
          this.$router.push('/login')
        }
        this.$store.dispatch('logout')
          .then(goToLogin)
          .catch(goToLogin)
      }
    }
  }
</script>

<style scoped>

</style>
