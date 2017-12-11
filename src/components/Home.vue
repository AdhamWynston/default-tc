<template>
  <div class="layout-padding row">
  <!--<div class="col-12">-->
    <!--Bem vindo, {{ username }}.</div>-->
    <!--<div class="col-xs-12 col-sm-4 col-md-4">-->
      <!--<q-card style="height: 100px" color="secondary" inline>-->
        <!--<q-card-title>-->
          <!--<q-icon name="fa-calendar-o" size="40px"/>-->
          <!--<big>{{ andamento }}</big>-->
          <!--<span v-if="this.andamento === 0">-->
            <!--Não possui eventos em andamento-->
          <!--</span>-->
          <!--<span v-if="this.andamento === 1">-->
            <!--Evento em ndamento-->
          <!--</span>-->
          <!--<span v-else>-->
            <!--Eventos em andamento-->
          <!--</span>-->
        <!--</q-card-title>-->
      <!--</q-card>-->
    <!--</div>-->
    <div class="col-12">
      <line-chart :chart-data="datacollection"></line-chart>
    </div>
    <!--<div class="col-xs-12 col-sm-4 col-md-4">-->
      <!--<q-card style="height: 100px" color="warning" inline>-->
        <!--<q-card-title>-->
          <!--<q-icon name="fa-circle-o" size="40px"/>-->
          <!--<big>{{ aguardandoEscala }}</big> Evento(s) aguardando escala-->
        <!--</q-card-title>-->
      <!--</q-card>-->
    <!--</div>-->
  <div class="row">
    <div id="calendar"></div>
  </div>
  </div>
</template>

<script >
  import authMixin from '../mixins/auth.mixin'
  import LineChart from './LineChart.js'
  export default {
    data () {
      return {
        andamento: 0,
        aguardandoEscala: 0,
        datacollection: null
      }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [{
            label: 'Eventos produzidos',
            backgroundColor: '#f87979',
            data: this.getRandomInt()
          }
          ]
        }
      },
      getRandomInt () {
        return this.teste
      },
      calcule () {
        this.$http.get('events?where[status]=3')
          .then((response) => {
            console.log(response.data.length)
            this.andamento = response.data.length
          })
      },
      escalaCalcule () {
        this.$http.get('events?where[status]=1')
          .then((response) => {
            console.log(response.data.length)
            this.aguardandoEscala = response.data.length
          })
      }
    },
    computed: {
      vaila () {
        let v
        this.$http.get('testeando')
          .then((response) => {
            v = response.data
          })
        return v
      },
      teste () {
        return this.$store.state.events.graph
      }
    },
    mixins: [authMixin],
    created () {
      this.fillData()
      this.$store.dispatch('graphGet')
    },
    mounted () {
      this.calcule()
      this.escalaCalcule()
    },
    components: {
      LineChart
    }
  }
</script>

<style scoped>
  .g-card-title {
    position: relative;
    bottom: 2vw;
    color: #fff;
    width: 75px;
    height: 75px;
    box-shadow: 0 6px 6px -3px rgba(59, 89, 178, .2), 0 10px 14px 1px rgba(59, 89, 178, .14), 0 4px 18px 3px rgba(59, 89, 178, .12)
  }
</style>
