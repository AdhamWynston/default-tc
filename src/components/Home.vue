<template>
  <div>
  <div class="layout-view">
  <div class="layout-padding">
  <h4>Gerenciamento</h4>
  <div class="row">
  <div class="col-8">
    <div v-if="isAdministrator">
    ALAAAA
    </div>
    <p>Seja Bem Vindo(a), {{ username }}</p>
    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, doloremque eveniet in iusto optio vitae. Animi deserunt dicta doloremque dolores facere modi natus, odit reiciendis repellat repellendus sequi similique vero.</span></p>
    <h5> Lorem ipsum</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur deserunt nulla placeat! Assumenda cumque deserunt dignissimos minima nemo quae soluta tempore veritatis. Ab accusamus, blanditiis consequuntur delectus iste sint? Dolore?</p>
  </div>
      <!--<donut-chart-->
              <!--id="donut"-->
              <!--:data="donutData"-->
              <!--colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'-->
              <!--resize="true">-->
      <!--</donut-chart>-->
      <!--<bar-chart-->
              <!--id="bar"-->
              <!--:data="barData"-->
              <!--:xkey="'year'"-->
              <!--:ykeys="barYKeys"-->
              <!--:labels="labels"-->
              <!--bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'-->
              <!--grid="true"-->
              <!--grid-text-weight="'bold'"-->
              <!--resize="true"-->
      <!--&gt;</bar-chart>-->
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import Raphael from 'raphael/raphael'
  import authMixin from '../mixins/auth.mixin'
  global.Raphael = Raphael
  import { DonutChart, BarChart } from 'vue-morris'
  export default {
    data () {
      return {
        donutData: [
          {label: 'Clientes', value: 300},
          {label: 'Usuários', value: 50},
          {label: 'Funcionários', value: 100}
        ],
        barData: [
          {year: 2012, and: 10, ios: 5, win: 2},
          {year: 2013, and: 20, ios: 15, win: 3},
          {year: 2014, and: 20, ios: 25, win: 2},
          {year: 2015, and: 40, ios: 20, win: 1}
        ],
        barYKeys: ['and', 'ios', 'win'],
        labels: ['android', 'ios', 'windows']
      }
    },
    mixins: [authMixin],
    created () {
    },
    components: {
      DonutChart, BarChart
    }
  }
</script>

<style>
</style>
