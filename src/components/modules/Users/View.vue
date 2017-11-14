<template>
  <div class="layout-padding justify-center">
    <div class="row justify-center">
      <div class="col-auto">
      <h5>
       Informações do Usuário
      </h5>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-8 col-md-8">
    <q-list link>
      <q-collapsible opened  icon="perm_identity" label="Dados Pessoais">
        <div>
      <q-item>
        <q-item-main>
          <q-item-tile label>Nome</q-item-tile>
          <q-item-tile sublabel>{{ user.name }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>E-mail</q-item-tile>
          <q-item-tile sublabel>{{ user.email }}</q-item-tile>
        </q-item-main>
      </q-item>
          <template>
          <q-item v-if="user.role === 2">
            <q-item-main>
              <q-item-tile label>Tipo</q-item-tile>
              <q-item-tile sublabel>Usuário</q-item-tile>
            </q-item-main>
          </q-item>
        </template>
          <template>
            <q-item v-if="user.role === 1">
              <q-item-main>
                <q-item-tile label>Tipo</q-item-tile>
                <q-item-tile sublabel>Administrador</q-item-tile>
              </q-item-main>
            </q-item>
          </template>
        </div>
      </q-collapsible>
      <q-collapsible opened icon="ion-levels" label="Extras">
        <div>
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Cliente está ativo?</q-item-tile>
              <q-item-tile sublabel>Selecione se sim</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-toggle @input="alterChecked" color="secondary" v-model="checked" />
            </q-item-side>
          </q-item>
          <q-item-separator />
        </div>
      </q-collapsible>
    </q-list>
      </div>
    </div>
    <q-fixed-position corner="bottom-left" :offset="[16, 16]">
      <q-btn @click="goEdit" round color="orange">
        <q-icon name="mode_edit" />
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable indent */

  import moment from 'moment'

import {
  Toast
} from 'quasar'
export default {
  data () {
    return {
      checked_one: true,
      checked_two: true,
      clientCreated: ''
    }
  },
  computed: {
    checked () {
      return this.user.status === 1
    },
    user () {
      return this.$store.state.users.one || {}
    }
  },
  mounted () {
    this.$store.dispatch('usersGet', this.$route.params.id)
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY hh:mm')
    }
  },
  methods: {
    goEdit () {
      this.$router.push('/admin/users/' + this.user.id + '/edit')
    },
    alterChecked () {
      let check
      if (this.user.status === 1) {
        check = 0
      }
      else {
        check = 1
      }
      let data = {
        status: check
      }
      this.$store.dispatch('userUpdate', {id: this.user.id, data: data})
        .then(() => {
          this.$store.dispatch('usersGet', this.user.id)
          Toast.create.positive({
            html: 'Status alterado com sucesso!',
            icon: 'done'
          })
        })
        .catch(() => {
          Toast.create.negative({
            html: 'Não foi possível alterar o status',
            icon: 'cancel'
          })
        })
    },
    openModal (url) {
      this.$router.push(url)
      this.$refs.basicModal.open()
    },
    closeModal () {
      this.$router.push('/admin/users' + this.client.id)
    }
  },
    back () {
      window.history.go(-1)
    },
    clientDate () {
      this.clientCreated = moment().format('DD/MM/YYYY')
      return this.clientCreated
    },
    goEditClients () {
      this.$router.push('/clients/1/edit')
    },
    goDesactiveClients () {
    this.$router.push('/clients/1/remove')
  }
}
</script>

<style>
</style>
