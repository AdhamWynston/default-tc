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
        <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline @click="goReportClientRoute()">
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
        <q-card style="width: 320px; height: 100px" color="secondary" class="cursor-pointer"inline  @click="goReportEmployeeRoute()">
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
    </div>
</template>
<script>
  import { QModal } from 'quasar'
  import MyEmployee from './Employees.vue'
  export default {
    data () {
      return {
        open: false,
        modalEmployee: false
      }
    },
    components: {
      QModal,
      MyEmployee
    },
    methods: {
      goReportClientRoute () {
        return this.$router.push('/reports/clients')
      },
      goReportEmployeeRoute () {
        return this.$router.push('/reports/employees')
      },
      teste () {
        console.log(this.open)
      }
    }
  }
</script>
