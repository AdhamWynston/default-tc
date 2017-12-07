<template>
  <div class="layout-padding">
    <div class="row">
    <div class="col-xs-12 col-sm-4 col-md-6">
      <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline>
        <q-card-title>
          Relatório de Eventos
          <span slot="subtitle">Emitir relatório de eventos</span>
          <q-icon slot="right" name="ion-calendar" size="60px"/>
        </q-card-title>
      </q-card>
    </div>
      <div class="col-xs-12 col-sm-4 col-md-6">
        <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline>
          <q-card-title>
            Relatório de Clientes
            <span slot="subtitle">Emitir relatório de clientes</span>
            <q-icon slot="right" name="ion-ios-people" size="60px"/>
          </q-card-title>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-6">
        <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline  @click="$refs.basicModal.open()">
          <q-card-title>
            Relatório de Funcionários
            <span slot="subtitle">Emitir relatório de funcionários</span>
            <q-icon slot="right" name="supervisor_account" size="60px"/>
          </q-card-title>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-6">
        <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline >
          <q-card-title>
            Relatório de Usuários
            <span slot="subtitle">Emitir relatório de usuários</span>
            <q-icon slot="right" name="computer" size="60px"/>
          </q-card-title>
        </q-card>
      </div>
    </div>
    <q-modal position="bottom" :content-css="{minWindth: '800px', minHeight: '100px', padding: '20px'}">
      <my-employee></my-employee>
      <q-btn @click="teste"></q-btn>
      <q-btn class="primary" @click="open = false" label="Close"/>
    </q-modal>
    <q-modal position="bottom" ref="basicModal" :content-css="{minWindth: '800px', minHeight: '100px', padding: '20px'}">
      <my-employee></my-employee>
      <hr>
      <q-btn flat @click="$refs.basicModal.close()">Fechar</q-btn>
    </q-modal>
    </div>
</template>
<script>
  import { QModal } from 'quasar'
  import MyEmployee from './Employees.vue'
  export default {
    data () {
      return {
        open: false
      }
    },
    components: {
      QModal,
      MyEmployee
    },
    methods: {
      teste () {
        console.log(this.open)
      }
    }
  }
</script>
