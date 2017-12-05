<template>
    <div>
        <q-list no-border link inset-delimiter>
            <div class="row flex-center bg-white" style="width: 100%; height: 110px;">
              <img src="~assets/L.png" style="height: 75px;">
                <div>
                  <q-btn flat>
                    {{ this.username }}
                    <q-popover
                      ref="popover2"
                      :anchor="anchor"
                      :self="self"
                    >
                      <q-list link style="min-width: 200px">
                        <q-item link @click="myAccount(), $refs.popover2.close()">
                          <q-item-side icon="ion-gear-b" />
                          <q-item-main label="Configurações" />
                        </q-item>
                        <q-item link @click="logout(), $refs.popover2.close()">
                          <q-item-side  color="red" icon="ion-android-exit" />
                          <q-item-main class="text-negative" label="Sair" />
                        </q-item>
                      </q-list>
                    </q-popover>
                    <i aria-hidden="true" class="q-if-control q-icon material-icons">arrow_drop_down</i>
                  </q-btn>
                </div>
            </div>
            <q-list-header>Ações no sistema</q-list-header>
            <q-side-link item to="/home">
                <q-item-side icon="home" />
                <q-item-main label="Início" />
            </q-side-link>
            <q-side-link item to="/events">
                <q-item-side icon="ion-calendar" />
                <q-item-main label="Eventos" />
            </q-side-link>
            <q-side-link item to="/clients">
                <q-item-side icon="ion-ios-people" />
                <q-item-main label="Clientes" />
            </q-side-link>
            <q-side-link item to="/employees">
                <q-item-side icon="supervisor_account" />
                <q-item-main label="Funcionários" />
            </q-side-link>
            <q-side-link item to="/admin/users">
                <q-item-side icon="computer" />
                <q-item-main label="Usuários" />
            </q-side-link>
          <q-side-link item to="/reports">
            <q-item-side icon="assignment" />
            <q-item-main label="Relatórios" />
          </q-side-link>
        </q-list>
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
