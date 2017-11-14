<template>
    <div class="layout-padding row justify-center">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <q-collapsible
                    icon="info_outline"
                    label="Dados do Evento"
                    style="max-width: 1200px; margin-bottom: 10px"
                    class="shadow-2"
            >
                <div>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Nome</q-item-tile>
                            <q-item-tile sublabel>{{ event.name }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Início do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.startDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Término do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.endDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Quantidade de Seguranças</q-item-tile>
                            <q-item-tile sublabel>{{ event.quantityEmployees }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Observações</q-item-tile>
                            <q-item-tile sublabel>{{ event.observations }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Cadastrado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.created_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Atualizado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.updated_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                </div>
            </q-collapsible>
          <q-collapsible
             icon="ion-person"
             label="Dados do Cliente"
             style="max-width: 1200px; margin-bottom: 10px"
             class="shadow-2"
          >
            <div>
              <template v-if="event.client">
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Nome</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.name }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Document</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.document | document }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Telefone</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.phone }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <template v-if="event.client.phoneAlternative != null">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label>Telefone Alternativo</q-item-tile>
                      <q-item-tile sublabel>{{ event.client.phoneAlternative }}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </template>
              </template>
            </div>
          </q-collapsible>
            <template v-if="this.event.status === 1 || this.event.status === 2">
              <select-employees></select-employees>
            </template>
          <template v-if="this.event.status === 3">
            <check-frequency-employees></check-frequency-employees>
          </template>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import SelectEmployees from './manage/SelectEmployees.vue'
    import CheckFrequencyEmployees from './manage/CheckFrequencyEmployee.vue'
    import { CNPJ, CPF } from 'cpf_cnpj'
    export default {
      components: {
        SelectEmployees,
        CheckFrequencyEmployees
      },
      data () {
        return {
        }
      },
      methods: {
      },
      computed: {
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('eventsGet', this.$route.params.id)
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
        },
        document: function (value) {
          if (value.length === 11) {
            return CPF.format(value)
          }
          return CNPJ.format(value)
        }
      }
    }
</script>

<style>
</style>
