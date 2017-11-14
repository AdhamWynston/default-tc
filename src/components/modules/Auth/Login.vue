<template>
    <q-layout
            :right-breakpoint="1100"
            :page-class="{'bg-grey-13': true}"
            :left-class="{'dark': true}" >
        <q-toolbar slot="header" color="dark" class="glossy">
            <q-toolbar-title>
                sgENV
                <div slot="subtitle">Sistema Gerenciador de Eventos</div>
            </q-toolbar-title>
        </q-toolbar>
            <div class="layout-view layout-padding">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4 offset-md-4">
                <q-card color="light">
                    <q-card-title class="text-dark" align="center">
                        <h5>Login</h5>
                    </q-card-title>
                    <q-card-main>
                        <q-field icon="mail">
                            <q-input v-model="user.username" type="email" float-label="E-mail" />
                        </q-field>
                        <q-field icon="vpn_key">
                            <q-input @keyup.enter="submit()" v-model="user.password" type="password" float-label="Password" />
                        </q-field>
                        <q-card-separator />
                        <br>
                        <q-btn color="primary" class="full-width" @click="submit()">Login</q-btn>
                        <div align="center">
                          <a href=""> Esqueceu sua senha?</a>
                        </div>
                    </q-card-main>
                </q-card>
            </div>
            </div>
        </div>
    </q-layout>
</template>

<script>

import { QCard, Toast, Loading, QLayout, QCardTitle, QCardMain, QCardSeparator, QCardMedia, GoBack, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput } from 'quasar'
export default {
  data: function () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    closeLoading () {
      setTimeout(Loading.hide, 600)
    },
    submit () {
      Loading.show()
      this.$store.dispatch('login', this.user)
        .then(() => {
          this.closeLoading()
          this.$router.push('/home')
          Toast.create.info('Seja bem vindo')
        })
        .catch((response) => {
          this.closeLoading()
          Toast.create.negative('Verifique suas credenciais!')
        })
    }
  },
  components: { QCard, Toast, Loading, QLayout, QCardTitle, QCardMain, QCardSeparator, QCardMedia, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput },
  directives: { GoBack }
}
</script>
<style scoped>
</style>
