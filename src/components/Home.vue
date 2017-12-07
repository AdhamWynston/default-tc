<template>
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
    </div>
  <div class="row">
    <div id="calendar"></div>
  </div>
  </div>
</template>

<script >
  import authMixin from '../mixins/auth.mixin'
  export default {
    data () {
      return {
      }
    },
    mixins: [authMixin],
    created () {
    },
    components: {
    }
  }
</script>

<style>
</style>
