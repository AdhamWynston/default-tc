<template>
        <q-toolbar slot="header" color="dark" class="glossy">
            <q-btn
                    flat
                    @click="openDrawer()"
            >
                <q-icon name="menu" />
            </q-btn>
            <q-toolbar-title>
              iComand
                <div slot="subtitle">Sistema para Gerenciamento de equipes de segurança de eventos</div>
            </q-toolbar-title>
            <template v-if=" this.$route.name != 'index' && this.$route.name != 'home' && this.$route.name != 'dashboard'" >
                <q-btn class="within-iframe-hide" flat @click="back()" style="margin-right: 5px">
                    <q-icon name="keyboard_arrow_left" />
                    Voltar
                </q-btn>
            </template>
        </q-toolbar>
</template>

<script>
  import {
    Loading,
    QListHeader,
    Events
  } from 'quasar'
  export default {
    name: 'drawer',
    components: {
      Loading,
      QListHeader,
      Events
    },
    methods: {
      back () {
        window.history.go(-1)
      },
      openDrawer () {
        Events.$emit('openDrawer', true)
      }
    }
  }
</script>

<style>
</style>
