<template>
  <div class="layout-padding">
      <div class="row justify-center">
        <h5>
        Clientes Cadastrados
    </h5>
      </div>
    <q-data-table
            :data="clients.data || []"
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
      <q-tooltip>
        Cadastrar Cliente
      </q-tooltip>
      <q-btn  @click="goCreate()" round icon="ion-plus-round" color="primary">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */
  import dataTableClientMixin from '../../../mixins/dataTableClient.mixin'
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
    mixins: [dataTableClientMixin],
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
      clients () {
        return this.$store.state.clients.list
      }
    },
    methods: {
      goCreate () {
        return this.$router.push('/clients/create')
      },
      goTo (item) {
        let id = item.rows[0].data.id
        return this.$router.push('/clients/' + id)
      },
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 5000)
      }
    },
    mounted () {
      this.$store.dispatch('clientsList')
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
