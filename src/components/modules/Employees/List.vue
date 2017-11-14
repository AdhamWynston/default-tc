<template>
  <div class="layout-padding">
    <h5>
      <div class="row justify-center">
        Funcionários Cadastrados
      </div>
    </h5>
    <q-data-table
            :data="employees.data || []"
            :columns="columns"
            :config="config"
            @refresh="refresh"
    >
      <template slot="col-created_at" slot-scope="cell">
        <span>{{cell.row.created_at | moment }}</span>
      </template>
      <template slot="selection" slot-scope="selection">
        <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Visualizar Registro</q-btn>
      </template>
    </q-data-table>
    <q-fixed-position corner="bottom-left" :offset="[10, 10]">
      <q-btn  @click="goCreate()" round icon="ion-plus-round" color="primary">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */
  import dataTableEmployeeMixin from '../../../mixins/dataTableEmployee.mixin'
  import moment from 'moment'
  import {
    QIcon,
    QFixedPosition,
    QFab,
    QFabAction,
    QDataTable,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QTooltip,
    QCollapsible,
    clone
  } from 'quasar'
  export default {
    mixins: [dataTableEmployeeMixin],
    components: {
      QIcon,
      QFixedPosition,
      QFab,
      QFabAction,
      QDataTable,
      QField,
      QInput,
      QCheckbox,
      QSelect,
      QSlider,
      QBtn,
      QTooltip,
      QCollapsible
    },
    computed: {
      employees () {
        return this.$store.state.employees.list
      }
    },
    methods: {
      goCreate () {
        return this.$router.push('/employees/create')
      },
      goTo (item) {
        let id = item.rows[0].data.id
        return this.$router.push('/employees/' + id)
      },
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 5000)
      }
    },
    mounted () {
      this.$store.dispatch('employeesList')
    },
    filters: {
      moment: function (date) {
        return moment(date).format('DD/MM/YYYY HH:mm')
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
