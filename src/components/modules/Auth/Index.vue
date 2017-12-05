<template>
  <q-layout
    ref="layout"
    :view="indexStore.view"
    :left-breakpoint="indexStore.leftBreakpoint"
    :right-breakpoint="indexStore.rightBreakpoint"
    :reveal="indexStore.reveal"
    :left-class="{'bg-grey-13': true}"
    :page-class="{'bg-grey-13': true}"
    >
    <q-toolbar slot="header" class="glossy" color="dark" v-if="!indexStore.hideTabs">
      <q-toolbar-title>
        iComand
        <div slot="subtitle">Sistema para Gerenciamento de equipes de segurança de eventos</div>
      </q-toolbar-title>
    </q-toolbar>
    <router-view />
  </q-layout>
</template>
<script>
  import {
    QSideLink,
    Ripple,
    Events
  } from 'quasar'
  import indexStore from '../../index-store'

  export default {
    name: 'index',
    components: {
      Ripple,
      QSideLink,
      Events
    },
    data () {
      return {
        indexStore
      }
    },
    methods: {
      logout () {
        this.$auth.destroyToken()
        return this.$router.push('/login')
      }
    },
    computed: {
    }
  }
</script>

<style scoped="">
  .container {
    padding: 20px;
  }
</style>

