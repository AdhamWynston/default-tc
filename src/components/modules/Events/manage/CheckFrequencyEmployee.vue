<template>
      <div class="col-xs-12 col-sm-12 col-md-12">
            <q-data-table
              :data="this.checkFrequencyEmployeeList || []"
              :columns="columns"
              :config="config"
            >
              <template slot="col-checkin" slot-scope="cell">
                <q-toggle v-model="check_inArray" @change="alterCheckin(cell.row)" left-label color="primary" :val="cell.row.employee_id" />
              </template>
              <template slot="col-checkout" slot-scope="cell">
                <q-toggle v-model="check_outArray" @change="alterCheckout(cell.row)" color="primary" :val="cell.row.employee_id" />
              </template>
            </q-data-table>
      </div>
</template>

<script>
    import moment from 'moment'
    import DataTableCheckEvent from '../../../../mixins/dataTableCheckFrequencyEmployee'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import { clone, Dialog } from 'quasar'
    export default {
      mixins: [DataTableCheckEvent],
      data () {
        return {
          checkFrequencyEmployeeList: []
        }
      },
      methods: {
        submitAlterCheckinToggle (value) {
          let checkin
          if (value.check_in === null) {
            checkin = moment().format('YYYY-MM-DD HH:mm:ss')
          }
          else {
            checkin = ''
          }
          let id = value.id
          let data = {
            check_in: checkin
          }
          this.$store.dispatch('manageUpdate', {id: id, data: data})
            .then(() => {
              this.getCheckFrequencyEmployees()
            })
        },
        submitAlterCheckoutToggle (value) {
          let checkout
          if (value.check_out === null) {
            checkout = moment().format('YYYY-MM-DD HH:mm:ss')
          }
          else {
            checkout = ''
          }
          let id = value.id
          let data = {
            check_out: checkout
          }
          this.$store.dispatch('manageUpdate', {id: id, data: data})
            .then(() => {
              this.getCheckFrequencyEmployees()
            })
        },
        alertAlterCheckinToggle (value) {
          Dialog.create({
            title: 'Tem certeza que deseja desatribuir a frequência?',
            message: value.name + ' terá a frequência desatribuida!',
            buttons: [
              {
                label: 'Cancelar',
                handler: () => {
                  return this.check_inArray.push(value.employee_id)
                }
              },
              {
                label: 'Confirmar',
                handler: () => {
                  this.submitAlterCheckinToggle(value)
                }
              }
            ]
          })
        },
        alertAlterCheckoutToggle (value) {
          Dialog.create({
            title: 'Tem certeza que deseja desatribuir a frequência?',
            message: value.name + ' terá a frequência desatribuida!',
            buttons: [
              {
                label: 'Cancelar',
                handler: () => {
                  return this.check_outArray.push(value.employee_id)
                }
              },
              {
                label: 'Confirmar',
                handler: () => {
                  this.submitAlterCheckoutToggle(value)
                }
              }
            ]
          })
        },
        getCheckFrequencyEmployees () {
          this.$http.get('http://127.0.0.1:8000/api/manage/employee/checkfrequency/' + this.$route.params.id)
            .then((response) => {
              this.checkFrequencyEmployeeList = response.data
            })
        },
        alterCheckin (value) {
          if (value.check_in !== null) {
            this.alertAlterCheckinToggle(value)
          }
          else {
            this.submitAlterCheckinToggle(value)
          }
        },
        alterCheckout (value) {
          if (value.check_out !== null) {
            this.alertAlterCheckoutToggle(value)
          }
          else {
            this.submitAlterCheckoutToggle(value)
          }
        }
      },
      computed: {
        check_inArray () {
          return this.$store.state.manageEvents.employeeCheckinList
        },
        check_outArray () {
          return this.$store.state.manageEvents.employeeCheckoutList
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
        this.$store.dispatch('employeeCheckinListGet', this.$route.params.id)
        this.$store.dispatch('employeeCheckoutListGet', this.$route.params.id)
        this.getCheckFrequencyEmployees()
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
