<template>
  <div>
        <div class="col-xs-12 col-sm-12 col-md-12">
              <div>
                <q-progress :percentage="progress" stripe animate style="height: 45px" />
              </div>
                <q-data-table
                        :data="this.employeesList || []"
                        :columns="columns"
                        :config="config"
                        @refresh="refresh"
                >
                    <template slot="col-created_at" slot-scope="cell">
                        <span>{{cell.row.created_at | moment }}</span>
                    </template>
                    <template slot="col-select" slot-scope="cell">
                      <q-checkbox v-model="check_employee" @change="alterCheckBox()" :val="cell.row.id"/>
                    </template>
                    <template slot="selection" slot-scope="selection">
                        <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Salvar registros</q-btn>
                    </template>
                </q-data-table>
        </div>
        <q-fixed-position corner="bottom-left" :offset="[16, 16]">
          <q-btn  @click="goEdit()" round icon="ion-edit" color="orange">
          </q-btn>
        </q-fixed-position>
  </div>
</template>

<script>
    import moment from 'moment'
    import dataTableSelectEmployeesMixin from '../../../../mixins/dataTableSelectEmployees'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import { Dialog, clone, Toast } from 'quasar'
    export default {
      mixins: [dataTableSelectEmployeesMixin],
      data () {
        return {
          client: {},
          employees: [],
          checked: 0,
          employeesList: []
        }
      },
      methods: {
        alertAlterCheckBox () {
          Dialog.create({
            title: 'Oopa! Atingiu a quantidade de funcionários para este evento',
            message: 'Os funcionários selecionados, serão escalados para o dia do evento',
            buttons: [
              {
                label: 'Cancelar',
                handler: () => {
                }
              },
              {
                label: 'Salvar',
                handler: () => {
                  this.registerEmployees()
                }
              }
            ]
          })
        },
        goEdit () {
          this.$router.push('/events/' + this.event.id + '/edit')
        },
        removeLastArray () {
          this.check_employee.pop()
        },
        registerEmployees () {
          let data = {
            event_id: this.$route.params.id,
            employees: this.check_employee
          }
          let alter = {
            status: 2
          }
          this.$store.dispatch('eventUpdate', {id: this.$route.params.id, data: alter})
          this.$store.dispatch('manageInsert', data)
            .then((response) => {
              console.log(response)
              this.$router.push('/events')
              Toast.create.positive({
                html: 'Evento cadastrado com sucesso!',
                icon: 'done'
              })
            })
            .catch((response) => {
              console.log(response)
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
                icon: 'cancel'
              })
            })
        },
        alterCheckBox () {
          if (this.check_employee.length === this.event.quantityEmployees) {
            this.alertAlterCheckBox()
          }
          else if (this.check_employee.length > this.event.quantityEmployees) {
            this.removeLastArray()
            this.alertAlterCheckBox()
          }
        },
        refresh (done) {
          this.timeout = setTimeout(() => {
            done()
          }, 5000)
        },
        getEmployees () {
          this.$http.get('http://127.0.0.1:8000/api/manage/employee/list/' + this.$route.params.id)
            .then((response) => {
              console.log(response)
              this.employeesList = response.data
            })
        }
      },
      computed: {
        check_employee () {
          return this.$store.state.manageEvents.manageEmployees || []
        },
        progress () {
          let x = this.event.quantityEmployees
          let val = (100 / x) * this.check_employee.length
          return val
        },
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('eventsGet', this.$route.params.id)
        this.$store.dispatch('manageGet', this.$route.params.id)
        this.getEmployees()
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
      },
      watch: {
        pagination (value) {
          if (!value) {
            this.oldPagination = clone(this.config.pagination)
            this.config.pagination = false
            return
          }
          this.config.pagination = this.oldPagination
        },
        rowHeight (value) {
          this.config.rowHeight = value + 'px'
        },
        bodyHeight (value) {
          let style = {}
          if (this.bodyHeightProp !== 'auto') {
            style[this.bodyHeightProp] = value + 'px'
          }
          this.config.bodyStyle = style
        },
        bodyHeightProp (value) {
          let style = {}
          if (value !== 'auto') {
            style[value] = this.bodyHeight + 'px'
          }
          this.config.bodyStyle = style
        }
      }
    }
</script>

<style>
</style>
