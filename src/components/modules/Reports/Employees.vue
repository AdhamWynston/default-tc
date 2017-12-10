<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        Tipo de relatório:
        <q-radio v-model="radio1" val="all" label="Todos" />
        <q-radio v-model="radio1" val="individual" label="Individual" color="secondary" style="margin-left: 10px" />
      </div>
      <template v-if="radio1 === 'individual'">
        <div class="col-8">
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
        <div class="col-2">
          <q-btn color="primary" :disabled="$v.terms.$invalid" @click="individual()">Gerar </q-btn>
        </div>
      </template>
      <template v-else>
        <div class="col-8 offset-2" >
          <q-btn @click="all()" class="full-width" color="primary">Gerar </q-btn>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import {
    filter,
    Dialog
  } from 'quasar'
  import { CNPJ, CPF } from 'cpf_cnpj'
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        radio1: 'individual',
        terms: '',
        ret: false,
        selectedEmployee: { address: {} },
        employees: []
      }
    },
    validations: {
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
        Dialog.create({
          title: 'Filtrar relatório de todos funcionários',
          message: 'Selecione os filtros desejados para gerar o relatório.',
          form: {
            header1: {
              type: 'heading',
              label: 'Relatório com:'
            },
            group1: {
              type: 'toggle',
              model: ['personal'],
              inline: false, // optional
              items: [
                {label: 'Dados Pessoais', value: 'personal'},
                {label: 'Eventos Trabalhados', value: 'events'}
              ]
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                this.goReportEmployee(data)
              }
            }
          ]
        })
      },
      individual () {
        Dialog.create({
          title: 'Filtrar relatório do funcionário',
          message: 'Selecione os filtros desejados para gerar o relatório.',
          form: {
            header1: {
              type: 'heading',
              label: 'Possuir:'
            },
            group1: {
              type: 'toggle',
              model: ['personal'],
              inline: false, // optional
              items: [
                {label: 'Dados Pessoais', value: 'personal'},
                {label: 'Eventos Trabalhados', value: 'events'}
              ]
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                this.goReportEmployee(data)
              }
            }
          ]
        })
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
