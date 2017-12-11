<template>
  <div class="layout-padding row justify-center">
      <div class="col-12">
        <div align="center">
          <h4><small>Relatório de Funcionários</small></h4>
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
        <div class="col-12">
          <q-search v-model="terms" placeholder="Selecione o funcionário">
            <q-autocomplete
              v-model="terms"
              @search="search"
              :max-results="4"
              @selected="selected"
            />
            <q-tooltip>
              Digite o nome do funcionário
            </q-tooltip>
          </q-search>
        </div>
        <div v-if="!$v.terms.$invalid" class="col-12">
          <q-checkbox  v-model="events.check" left-label label="Eventos trabalhados" />
        </div>
        <div v-if="events.check === true" class="col-12">
          <div class="col-12">
            Filtrar eventos:
          </div>
          <div class="col-xs-12 col-sm-2">
            <q-radio v-model="events.filter" val="all" label="Todos" />
          </div>
          <div class="col-xs-12 col-sm-2">
            <q-radio v-model="events.filter" val="datetime" label="Período"/>
          </div>
        </div>
        <div v-if="events.check === true" class="col-12">
          <div class="col-xs-12 col-sm-2">
            Ordernar Eventos por:
          </div>
          <div class="col-xs-12 col-sm-2">
          <q-radio v-model="events.order" val="name" label="Nome" />
          </div>
          <div class="col-xs-12 col-sm-2">
          <q-radio v-model="events.order" val="startDate" label="Data de realização" />
          </div>
        </div>
        <template v-if="this.events.filter === 'datetime'">
          <div class="col-xs-12 col-sm-6">
            <q-field
              :error="$v.events.startDate.$error"
              :error-label="startError">
              <q-datetime
                id="started"
                v-model="events.startDate"
                stack-label="Início do Evento"
                type="datetime"
                format24h
                format="DD/MM/YYYY HH:mm"
                ok-label="OK"
                @blur="$v.events.startDate.$touch"
                clear-label="Limpar"
                cancel-label="Cancelar"
                :day-names="['Dom','Seg', 'Ter','Qua','Qui','Sex','Sáb']"
                :month-names="['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']"
              />
            </q-field>
          </div>
            <div v-if="this.events.startDate !== ''" class="col-xs-12 col-sm-6">
              <q-field
                :error="$v.events.endDate.$error"
                :error-label="endError">
                <q-datetime
                  id="terminated"
                  format24h
                  v-model="events.endDate"
                  @blur="$v.events.endDate.$touch"
                  stack-label="Termíno do Evento"
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
            <q-radio v-model="todos.order" val="created_at" label="Data de cadastro"/>
            </div>
          </div>
        </template>
          <template v-if="radio1 === 'all'">
            <div class="col-12">
              <div>
                Situação:
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-radio v-model="todos.status" val="one" label="Ativos" />
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-radio v-model="todos.status" val="zero" label="Desativados"/>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-radio v-model="todos.status" val="two" label="Todos"/>
              </div>
            </div>
          </template>
          <div class="col-12">
            <q-stepper-navigation>
              <q-btn color="primary" flat @click="$refs.stepper.previous()">Voltar</q-btn>
              <template v-if="radio1 === 'individual'">
                <q-btn color="positive" :disabled="$v.terms.$invalid" @click="individual()">Gerar</q-btn>
              </template>
              <template v-if="radio1 === 'all'">
                <q-btn color="positive" @click="all()">Gerar </q-btn>
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
    filter
  } from 'quasar'
  import { CNPJ, CPF } from 'cpf_cnpj'
  import { required } from 'vuelidate/lib/validators'
  import moment from 'moment'
  export default {
    data () {
      return {
        radio1: 'individual',
        terms: '',
        todos: {
          order: 'name',
          status: 'two'
        },
        events: {
          check: false,
          filter: 'all',
          startDate: '',
          endDate: '',
          order: 'name'
        },
        ret: false,
        selectedEmployee: { address: {} },
        employees: []
      }
    },
    validations: {
      events: {
        startDate: {},
        endDate: {
          required,
          isAfter (date) {
            return moment(date).isAfter(this.events.startDate)
          }
        }
      },
      terms: { required,
        async isExists (value) {
          let data = {
            name: value
          }
          this.$http.post('employee/exists', data)
            .then((response) => {
              console.log(response.data)
              this.ret = response.data
            })
          return this.ret
        }
      }
    },
    mounted () {
      this.getEmployees()
    },
    methods: {
      all () {
        let url
        let status
        if (this.todos.status === 'zero') {
          status = 0
        }
        else if (this.todos.status === 'one') {
          status = 1
        }
        if (this.todos.status === 'two') {
          url = 'http://127.0.0.1:8000/api/reports/all/employee?order=' + this.todos.order
        }
        else {
          url = 'http://127.0.0.1:8000/api/reports/all/employee?order=' + this.todos.order + '&status=' + status
        }
        console.log(url)
        window.open(url, '_blank')
      },
      individual () {
        let url
        if (this.events.check === true) {
          if (this.events.filter === 'all') {
            url = 'http://127.0.0.1:8000/api/reports/individual/employee?name=' +
              this.terms + '&order=' + this.events.order
          }
          else if (this.events.filter === 'datetime') {
            let startDate = moment(this.events.startDate).format('YYYY-MM-DD HH:mm:ss')
            let endDate = moment(this.events.endDate).format('YYYY-MM-DD HH:mm:ss')
            url = 'http://127.0.0.1:8000/api/reports/individual/employee?name=' +
              this.terms + '&order=' + this.events.order + '&startDate=' + startDate + '&endDate=' + endDate
          }
        }
        else {
          url = 'http://127.0.0.1:8000/api/reports/individual/employee?name=' + this.terms + '&type=simple'
        }
        console.log(url)
        window.open(url, '_blank')
      },
      goReportEmployee (value) {
        let data = {
          name: this.terms,
          personal: value.group1[0],
          events: value.group1[1]
        }
        let url = 'http://127.0.0.1:8000/api/reports/employee?name=' +
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
      getEmployees () {
        this.$http.get('http://127.0.0.1:8000/api/employees')
          .then(response => {
            this.employees = response.data
          })
      },
      search (terms, done) {
        setTimeout(() => {
          done(filter(terms, {field: 'value', list: this.parseEmployees}))
        }, 500)
      },
      selected (employee) {
        console.log(employee)
        this.selectedEmployee = employee.allData
      }
    },
    computed: {
      endError () {
        if (!this.$v.events.endDate.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.events.endDate.isAfter) {
          return 'Data inválida'
        }
        else {
          return null
        }
      },
      startError () {
        if (!this.$v.events.startDate.required) {
          return 'Este campo é obrigatório!'
        }
        else {
          return null
        }
      },
      parseEmployees () {
        return this.employees.map(employee => {
          let document = this.documentFormat(employee.document)
          return {
            allData: employee,
            label: employee.name,
            sublabel: 'CPF: ' + document,
            value: employee.name
          }
        })
      }
    }
  }
</script>
