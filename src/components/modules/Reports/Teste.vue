<template>
  <div class="layout-padding">
    <q-modal ref="basicModal">
      <h4>Basic Modal</h4>
      <q-btn color="primary" @click="$refs.basicModal.close()">Close</q-btn>
    </q-modal>
    <q-btn @click="$refs.basicModal.open()">teste</q-btn>
  </div>
</template>
<script>
  import {
    Ripple,
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QList,
    QItem,
    QItemSide,
    QItemMain
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QIcon,
      QModal,
      QModalLayout,
      QToolbar,
      QToolbarTitle,
      QSearch,
      QList,
      QItem,
      QItemSide,
      QItemMain
    },
    directives: {
      Ripple
    },
    data () {
      return {

      }
    }
  }
</script>
