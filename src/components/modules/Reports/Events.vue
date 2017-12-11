<template>
  <div class="layout-padding row justify-center">
      <div class="col-12">
        <div align="center">
          <h4><small>Relatório de Eventos</small></h4>
        </div>
      </div>
    <div style="width: 700px; max-width: 90vw;">
    <q-stepper ref="stepper" vertical>
      <q-step name="first" title="Tipo de relatório" color="light">
    <div class="row">
      <div class="col-xs-12 col-sm-2">
        Relatório de:
      </div>
      <div class="col-xs-12 col-sm-2">
        <q-radio v-model="radio1" val="all" label="Todos" />
      </div>
      <div class="col-xs-12 col-sm-2">
        <q-radio v-model="radio1" val="individual" label="Individual" />
      </div>
      <div class="col-12">
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Avançar</q-btn>
        </q-stepper-navigation>
      </div>
    </div>
      </q-step>
      <q-step name="second" title="Filtros do relatório">
        <div class="row sm-gutter">
      <template v-if="radio1 === 'individual'">
        <div class="col-xs-8 col-sm-10">
          <q-search v-model="terms" :disable="buttonAlterTerms" placeholder="Selecione o evento">
            <q-autocomplete
              v-model="terms"
              @search="search"
              :max-results="4"
              @selected="selected"
            />
            <q-tooltip>
              Digite o nome do evento
            </q-tooltip>
          </q-search>
        </div>
          <div class="col-2" v-if="Object.keys(this.selectedEvent).length !== 0">
            <q-btn small color="orange" @click="AlterTerms">Alterar</q-btn>
          </div>
        <template v-if="!$v.terms.$invalid">
          <div class="col-12" v-if="(this.selectedEvent.status === 4 || this.selectedEvent.status === 3) && this.selectedEvent.status !== 5">
            <q-checkbox  v-model="service.check" left-label label="Informações sobre sua realização" />
          </div>
          <div class="col-12" v-if="selectedEvent.status >= 2 && selectedEvent.status <= 4 && service.check === true">
            <div class="col-12">
              Possuir:
            </div>
            <div class="col-xs-12 col-sm-2">
              <q-radio v-model="service.filter" val="scale" label="Escala" />
            </div>
            <div class="col-xs-12 col-sm-2">
              <q-radio v-model="service.filter" val="fullScale" label="Escala e frequência"/>
            </div>
          </div>
        </template>
      </template>
        <template v-if="radio1 === 'all'">
          <div class="col-12">
            <div>
              Ordenar por:
            </div>
            <div class="col-xs-12 col-sm-2">
            <q-radio v-model="todos.order" val="name" label="Nome" />
            </div>
            <div class="col-xs-12 col-sm-2">
            <q-radio v-model="todos.order" val="startDate" label="Data de realização"/>
            </div>
          </div>
          <div class="col-12">
            <q-toggle v-model="checke1" label="Filtrar por período" />
          </div>
            <div class="col-xs-12 col-sm-6" v-if="this.checke1 === true">
              <q-field
                :error="$v.service.startDate.$error"
                :error-label="startError">
                <q-datetime
                  id="started"
                  v-model="service.startDate"
                  stack-label="Início"
                  type="datetime"
                  format24h
                  format="DD/MM/YYYY HH:mm"
                  ok-label="OK"
                  @blur="$v.service.startDate.$touch"
                  clear-label="Limpar"
                  cancel-label="Cancelar"
                  :day-names="['Dom','Seg', 'Ter','Qua','Qui','Sex','Sáb']"
                  :month-names="['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']"
                />
              </q-field>
            </div>
            <div v-if="this.checke1 === true" class="col-xs-12 col-sm-6">
              <q-field
                :error="$v.service.endDate.$error"
                :error-label="endError">
                <q-datetime
                  id="terminated"
                  format24h
                  v-model="service.endDate"
                  @blur="$v.service.endDate.$touch"
                  stack-label="Termíno"
                  type="datetime"
                  format="DD/MM/YYYY HH:mm"
                  ok-label="OK"
                  clear-label="Limpar"
                  cancel-label="Cancelar"
                  :day-names="['Dom','Seg', 'Ter','Qua','Qui','Sex','Sáb']"
                  :month-names="['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']"
                />
              </q-field>
            </div>
          <div class="col-xs-12 col-sm-6">
                <q-dialog-select
                  stack-label="Filtrar situações"
                  title="Emitir relatório de eventos"
                  v-model="select"
                  :options="options"
                />
              </div>
          </template>
          <div class="col-12">
            <q-stepper-navigation>
              <q-btn color="primary" flat @click="$refs.stepper.previous()">Voltar</q-btn>
              <template v-if="radio1 === 'individual'">
                <q-btn color="positive" :disabled="checkTerms" @click="individual()">Gerar</q-btn>
              </template>
              <template v-if="radio1 === 'all'">
                <q-btn color="positive" :disabled="checkAll" @click="all()">Gerar </q-btn>
              </template>
            </q-stepper-navigation>
          </div>
        </div>
      </q-step>
    </q-stepper>
  </div>
  </div>
</template>
<script>
  import {
    filter,
    QDialogSelect
  } from 'quasar'
  import { CNPJ, CPF } from 'cpf_cnpj'
  import { required } from 'vuelidate/lib/validators'
  import moment from 'moment'
  export default {
    data () {
      return {
        select: 0,
        radio1: 'individual',
        terms: '',
        checke1: false,
        checkInputTerms: false,
        checkSelect: false,
        todos: {
          order: 'name',
          status: 'two'
        },
        options: [
          {
            label: 'Todas as situações',
            value: 0
          },
          {
            label: 'Escala pendente',
            value: 1
          },
          {
            label: 'Aguardando data',
            value: 2
          },
          {
            label: 'Em andamento',
            value: 3
          },
          {
            label: 'Realizado',
            value: 4
          },
          {
            label: 'Cancelado',
            value: 5
          }
        ],
        service: {
          check: false,
          startDate: '',
          endDate: '',
          order: 'name',
          filter: 'fullScale'
        },
        ret: false,
        selectedEvent: {},
        events: []
      }
    },
    components: {
      QDialogSelect
    },
    validations: {
      service: {
        startDate: {},
        endDate: {
          isAfter (date) {
            return moment(date).isAfter(this.service.startDate)
          }
        }
      },
      terms: { required,
        async isExists (value) {
          let data = {
            name: value
          }
          this.$http.post('event/exists', data)
            .then((response) => {
              console.log(response.data)
              this.ret = response.data
            })
          return this.ret
        }
      }
    },
    mounted () {
      this.getEvents()
    },
    methods: {
      all () {
        let url
        let startDate = moment(this.service.startDate).format('YYYY-MM-DD HH:mm:ss')
        let endDate = moment(this.service.endDate).format('YYYY-MM-DD HH:mm:ss')
        if (this.$v.service.$invalid !== true && this.checke1 === true) {
          url = 'http://127.0.0.1:8000/api/reports/all/event?startDate=' +
            startDate + '&endDate=' + endDate + '&order=' + this.todos.order + '&status=' + this.select
        }
        else {
          url = 'http://127.0.0.1:8000/api/reports/all/event?order=' +
            this.todos.order + '&status=' + this.select
        }
        console.log(url)
        window.open(url, '_blank')
      },
      individual () {
        let url
        console.log(this.selectedEvent)
        if (this.service.check === true) {
          url = 'http://127.0.0.1:8000/api/reports/individual/event?id=' +
            this.selectedEvent.id + '&type=' + this.service.filter
        }
        else {
          url = 'http://127.0.0.1:8000/api/reports/individual/event?id=' + this.selectedEvent.id
        }
        console.log(url)
        window.open(url, '_blank')
      },
      goReportEvent (value) {
        let data = {
          name: this.terms,
          personal: value.group1[0],
          events: value.group1[1]
        }
        let url = 'http://127.0.0.1:8000/api/reports/event?id=' +
          data.name + '&' + 'personal=' + data.personal + '&events=' + data.events
        window.open(url, '_blank')
      },
      ava () {
        console.log('teste')
      },
      documentFormat (value) {
        if (value.length === 11) {
          return CPF.format(value)
        }
        else {
          return CNPJ.format(value)
        }
      },
      getEvents () {
        this.$http.get('http://127.0.0.1:8000/api/events')
          .then(response => {
            this.events = response.data
          })
      },
      AlterTerms () {
        this.terms = ''
        this.selectedEvent = {}
      },
      search (terms, done) {
        setTimeout(() => {
          done(filter(terms, {field: 'value', list: this.parseEvents}))
        }, 500)
      },
      selected (event) {
        this.checkSelect = true
        this.selectedEvent = event.allData
      }
    },
    computed: {
      buttonAlterTerms () {
        if (this.terms !== '' && Object.keys(this.selectedEvent).length !== 0) {
          return true
        }
        else {
          return false
        }
      },
      checkAll () {
        if (this.checke1 === true) {
          if (this.service.startDate === '' || this.service.endDate === '') {
            return true
          }
          else {
            return false
          }
        }
        else {
          return false
        }
      },
      checkTerms () {
        if (this.terms !== '' && Object.keys(this.selectedEvent).length !== 0) {
          return false
        }
        else {
          return true
        }
      },
      endError () {
        if (!this.$v.service.endDate.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.service.endDate.isAfter) {
          return 'Data inválida'
        }
        else {
          return null
        }
      },
      startError () {
        if (!this.$v.service.startDate.required) {
          return 'Este campo é obrigatório!'
        }
        else {
          return null
        }
      },
      parseEvents () {
        return this.events.map(event => {
          return {
            allData: event,
            label: event.name,
            sublabel: 'Cliente: ' + event.client.name,
            value: event.name
          }
        })
      }
    }
  }
</script>
