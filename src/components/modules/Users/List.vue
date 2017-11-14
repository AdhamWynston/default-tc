<template>
  <div class="layout-padding">
    <h5>
      <div class="row justify-center">
        Usuários Cadastrados
      </div>
    </h5>
    <q-modal
            ref="userModal"
            :content-css="{padding: '20px', minWidth: '40vw', minHeight: '30vh'}"
            position="bottom">
      <router-view />
      <br>
      <q-btn class="small" @click="closeModal" flat>Fechar</q-btn>
      <q-btn class="small" color="blue" @click="createUser()" flat >Salvar</q-btn>
    </q-modal>
    <q-data-table
            :data="users.data || []"
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
      <q-btn  @click="openModal('/admin/users/create')" round icon="ion-plus-round" color="primary">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */

  import moment from 'moment'
  import dataTableUserMixin from '../../../mixins/dataTableUser.mixin'
  import {
    Events,
    clone
  } from 'quasar'
  export default {
    components: {
      Events
    },
    data () {
      return {
      }
    },
    mixins: [dataTableUserMixin],
    computed: {
      users () {
        return this.$store.state.users.list
      }
    },
    methods: {
      goRemove (value) {
        console.log(value)
      },
      createUser () {
        Events.$emit('createUser')
      },
      openModal (url) {
        this.$router.push(url)
        this.$refs.userModal.open()
      },
      closeModal () {
        this.$router.push('/admin/users')
      },
      goCreate () {
        return this.$router.push('/admin/users/create')
      },
      goTo (item) {
        let id = item.rows[0].data.id
        return this.$router.push('/admin/users/' + id)
      },
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 5000)
      }
    },
    mounted () {
      this.$store.dispatch('usersList')
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
