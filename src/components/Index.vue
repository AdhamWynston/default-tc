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
            <q-route-tab slot="title" icon="home" to="/" label="Home" />
            <q-route-tab slot="title" icon="ion-calendar" to="/events" label="Eventos" />
            <q-route-tab slot="title" icon="ion-ios-people" to="/clients" label="Clientes" />
            <q-route-tab slot="title" icon="supervisor_account" to="/employees" label="Funcionários" />
            <template v-if="isAdministrator">
                <q-route-tab slot="title" icon="perm_identity" to="/admin/users" label="Usuários" />
            </template>
        </q-tabs>
        <Drawer slot="left"></Drawer>
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
        Events
    } from 'quasar'

    export default {
        name: 'index',
        components: {
            Ripple,
            Toolbar,
            Drawer,
            QSideLink,
            Events
        },
        mixins: [authMixin],
        data () {
          return {
            indexStore
          }
        },
      methods: {
        back () {
          window.history.go(-1)
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
            }
        }
    }
</script>

<style scoped="">
    .container {
        padding: 20px;
    }
</style>
