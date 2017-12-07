<template>
    <q-layout
            ref="layout"
            :view="indexStore.view"
            :left-breakpoint="indexStore.leftBreakpoint"
            :right-breakpoint="indexStore.rightBreakpoint"
            :reveal="indexStore.reveal"
            :left-class="{'bg-grey-9': false}"
            :page-class="{'bg-grey-9': false}"
    >
        <Toolbar slot="header"></Toolbar>
        <q-tabs slot="navigation" color="dark" v-if="!indexStore.hideTabs">
            <q-route-tab slot="title" icon="home" to="/home" label="Home" />
            <q-route-tab slot="title" icon="ion-calendar" to="/events" label="Eventos" />
            <q-route-tab slot="title" icon="ion-ios-people" to="/clients" label="Clientes" />
            <q-route-tab slot="title" icon="supervisor_account" to="/employees" label="Funcionários" />
          <q-route-tab slot="title" icon="assignment" to="/reports" label="Relatórios" />
            <template v-if="isAdministrator">
                <q-route-tab slot="title" icon="computer" to="/admin/users" label="Usuários" />
            </template>
        </q-tabs>
      <div slot="left">
      <q-list no-border link inset-delimiter>
        <div class="row flex-center bg-white" style="width: 100%; height: 110px;">
          <img src="~assets/L.png" style="height: 75px;">
          <div>
            <q-btn flat>
              {{ this.username }}
              <q-popover
                ref="popover2"
              >
                <q-list separator link style="min-width: 200px">
                  <q-item @click="myAccount()">
                    <q-item-side icon="ion-gear-b" />
                    <q-item-main label="Meu Perfil" />
                  </q-item>
                  <q-item link @click="logout()">
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
            <router-view />
    </q-layout>
</template>

<script>
    /* eslint-disable indent */
    import Toolbar from './common/Toolbar.vue'
    import Drawer from './common/Drawer.vue'
    import indexStore from './index-store'
    import authMixin from '../mixins/auth.mixin'
    import {
        Loading,
        QSideLink,
        Ripple,
        Events,
        QIcon,
        QList,
        QPopover,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain
    } from 'quasar'

    export default {
        name: 'index',
        components: {
            Ripple,
            Toolbar,
            Drawer,
            Events,
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
        mixins: [authMixin],
        data () {
          return {
            indexStore,
            anchorOrigin: {vertical: 'bottom', horizontal: 'left'},
            selfOrigin: {vertical: 'top', horizontal: 'left'}
          }
        },
      methods: {
        back () {
          window.history.go(-1)
        },
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
      },
      mounted () {
        Events.$on('openDrawer', () => {
          this.$refs.layout.toggleLeft()
        })
      },
        computed: {
            list () {
                return this.$store.state.Expenses.list
            },
          anchor () {
            return `${this.anchorOrigin.vertical} ${this.anchorOrigin.horizontal}`
          },
          self () {
            return `${this.selfOrigin.vertical} ${this.selfOrigin.horizontal}`
          }
        }
    }
</script>

<style scoped="">
    .container {
        padding: 20px;
    }
</style>
