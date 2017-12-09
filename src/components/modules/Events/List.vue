<template>
    <div class="layout-padding">
        <q-btn color="primary" @click="getEvents()" flat> Todos</q-btn>
        <q-btn color="primary" @click="getEvents('where[status]=1')" flat> Pendentes</q-btn>
        <q-btn color="primary" @click="getEvents('where[status]=2')" flat> Aguardando</q-btn>
        <q-btn color="primary" @click="getEvents('where[status]=3')" flat> Em Andamento </q-btn>
      <q-btn color="primary" @click="getEvents('where[status]=4')" flat> Realizados </q-btn>
      <q-btn color="primary" @click="getEvents('where[status]=5')" flat> Cancelados </q-btn>
        <q-data-table
                :data="this.events"
                :columns="columns"
                :config="config"
                @refresh="refresh"
        >
          <template slot="selection" slot-scope="selection">
            <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Visualizar Evento</q-btn>
          </template>
            <template slot="col-created_at" slot-scope="cell">
                <span>{{cell.row.created_at | moment }}</span>
            </template>
            <template slot="col-actions" slot-scope="cell">
                <q-btn color="primary" round @click="goManage(cell.row.id)" flat small>
                  <q-tooltip>Gerenciar Evento</q-tooltip>
                  <q-icon name="ion-gear-a"></q-icon>
                </q-btn>
            </template>
            <template slot="col-startDate" slot-scope="cell">
                <span>{{cell.row.startDate | moment }}</span>
            </template>
            <template slot="col-endDate" slot-scope="cell">
                <span>{{cell.row.endDate | moment }}</span>
            </template>
          <template slot="col-sta" slot-scope="cell">
            <div v-if="cell.row.status === 1" class="my-label text-white bg-amber-9">
              <q-icon name="fa-circle-o"></q-icon>
              Pendente
              <q-tooltip> Faça a escala dos funcionários </q-tooltip>
            </div>
            <div v-if="cell.row.status === 2" class="my-label text-white bg-primary">
              <q-icon name="fa-check-circle-o"></q-icon>
              Aguardando
              <q-tooltip> Aguardando data de Início </q-tooltip>
            </div>
            <div v-if="cell.row.status === 3" class="my-label text-white bg-secondary">
              <q-icon name="fa-calendar-o"></q-icon>
              Andamento
              <q-tooltip> Evento em andamento </q-tooltip>
            </div>
            <div v-if="cell.row.status === 4" class="my-label text-white bg-positive">
              <q-icon name="fa-calendar-check-o"></q-icon>
              Realizado
              <q-tooltip> Evento foi realizado </q-tooltip>
            </div>
            <div v-if="cell.row.status === 5" class="my-label text-white bg-negative">
              <q-icon name="fa-ban"></q-icon>
              Cancelado
              <q-tooltip> Evento foi cancelado </q-tooltip>
            </div>
          </template>
        </q-data-table>
        <q-fixed-position corner="bottom-left" :offset="[10, 10]">
            <q-tooltip>
                Cadastrar Evento
            </q-tooltip>
            <q-btn  @click="goCreate()" round icon="ion-plus-round" color="primary">
            </q-btn>
        </q-fixed-position>

    </div>
</template>

<script>
    import dataTableEventMixin from '../../../mixins/dataTableEvent.mixin'
    import moment from 'moment'
    import {
      Loading,
      clone
    } from 'quasar'
    export default {
      mixins: [dataTableEventMixin],
      data () {
        return {
          events: []
        }
      },
      computed: {
      },
      methods: {
        goReports (value) {
          let url = 'http://127.0.0.1:8000/api/reports/event/' + value
          window.open(url, '_blank')
        },
        closeLoading () {
          setTimeout(Loading.hide, 2000)
        },
        getEvents (param) {
          this.$http.get('http://127.0.0.1:8000/api/events?' + param)
            .then((response) => {
              this.events = response.data
            })
        },
        goCreate () {
          return this.$router.push('/events/create')
        },
        goManage (id) {
          Loading.show({
            delay: 500
          })
          this.closeLoading()
          this.$router.push('/events/' + id + '/manage')
        },
        goTo (item) {
          let id = item.rows[0].data.id
          return this.$router.push('/events/' + id)
        },
        refresh (done) {
          this.timeout = setTimeout(() => {
            done()
          }, 5000)
        }
      },
      mounted () {
        this.getEvents()
        this.$store.dispatch('eventsList', '')
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

<style lang="stylus">
  .my-label
    padding 5px
    border-radius 3px
    display inline-block
</style>
