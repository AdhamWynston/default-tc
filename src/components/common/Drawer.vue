<template>
    <div>
        <q-list no-border link inset-delimiter>
            <div class="row flex-center bg-white" style="width: 100%; height: 110px;"><img src="~assets/L.png" style="height: 75px;"> <div style="margin-left: 15px;">{{ this.username }}</div></div>
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
            <q-item link @click="logout()">
                <q-item-side  icon="ion-android-exit" />
                <q-item-main label="Sair" />
            </q-item>
        </q-list>
    </div>
</template>

<script>
  import {
    QIcon,
    QList,
    Loading,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  } from 'quasar'
  import authMixin from '../../mixins/auth.mixin'
  export default {
    name: 'drawer',
    components: {
      Loading,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink
    },
    mixins: [authMixin],
    methods: {
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

<style>
</style>
