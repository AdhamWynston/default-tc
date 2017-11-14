<template>
  <div class="layout-padding">
    <div class="row justify-center">
      <div class="col-auto">
      <h5>
       Informações do Funcionário
      </h5>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6">
    <q-list link>
      <q-collapsible opened  icon="perm_identity" label="Dados Pessoais">
        <div>
      <q-item>
        <q-item-main>
          <q-item-tile label>Nome</q-item-tile>
          <q-item-tile sublabel>{{ employee.name }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Nº Documento</q-item-tile>
          <q-item-tile sublabel>{{ employee.document }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Telefone</q-item-tile>
          <q-item-tile sublabel>{{ employee.phone }}</q-item-tile>
        </q-item-main>
      </q-item>
      <template v-if="employee.phoneAlternative != null">
        <q-item>
          <q-item-main>
            <q-item-tile label>Telefone Alternativo</q-item-tile>
            <q-item-tile sublabel>{{ employee.phoneAlternative }}</q-item-tile>
          </q-item-main>
        </q-item>
      </template>
      <q-item>
        <q-item-main>
          <q-item-tile label>E-mail</q-item-tile>
          <q-item-tile sublabel>{{ employee.email }}</q-item-tile>
        </q-item-main>
      </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Cadastrado em</q-item-tile>
              <q-item-tile sublabel>{{ employee.created_at | moment }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Atualizado em</q-item-tile>
              <q-item-tile sublabel>{{ employee.updated_at | moment }}</q-item-tile>
            </q-item-main>
          </q-item>
        </div>
      </q-collapsible>
      <q-collapsible opened icon="ion-ios-location" label="Endereço">
        <div>
          <q-item>
            <q-item-main>
              <q-item-tile label>Cidade</q-item-tile>
              <q-item-tile sublabel>{{ employee.city }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>CEP</q-item-tile>
              <q-item-tile sublabel>{{ employee.zip_code }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Estado</q-item-tile>
              <q-item-tile sublabel>{{ employee.state }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Rua/Logradouro</q-item-tile>
              <q-item-tile sublabel>{{ employee.street }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Número</q-item-tile>
              <q-item-tile sublabel>{{ employee.number }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Bairro</q-item-tile>
              <q-item-tile sublabel>{{ employee.neighborhood }}</q-item-tile>
            </q-item-main>
          </q-item>
          <template v-if="employee.complement != null">
            <q-item>
              <q-item-main>
                <q-item-tile label>Complemento</q-item-tile>
                <q-item-tile sublabel>{{ employee.complement }}</q-item-tile>
              </q-item-main>
            </q-item>
          </template>
        </div>
      </q-collapsible>
      <q-collapsible opened icon="ion-levels" label="Extras">
        <div>
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Funcionário está ativo?</q-item-tile>
              <q-item-tile sublabel>Selecione se sim</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-toggle @input="alterChecked" color="secondary" v-model="checked" />
            </q-item-side>
          </q-item>
          <q-item-separator />
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Notificações</q-item-tile>
              <q-item-tile sublabel>Notificar o Funcionário quando estiver eventos próximos?</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-checkbox v-model="checked_two" />
            </q-item-side>
          </q-item>
        </div>
      </q-collapsible>
    </q-list>
      </div>
    </div>
    <q-fixed-position corner="bottom-left" :offset="[10, 10]">
      <q-btn  @click="goEdit()" round icon="ion-edit" color="orange">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable indent */
import moment from 'moment'
import {
  QFixedPosition,
  QFab,
  Toast,
  QFabAction,
  QModal,
  QStepper,
  QStep,
  QStepperNavigation,
  QModalLayout,
  QCheckbox,
  QRadio,
  QToggle,
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QCollapsible,
  QInnerLoading,
  QItemSide,
  QItemMain,
  QItemTile,
  QLayout,
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QTabs,
  QRouteTab,
  QBtn,
  QIcon,
  QSideLink,
  QTooltip,
  QScrollArea} from 'quasar'
export default {
  components: {
    QFixedPosition,
    QCheckbox,
    QModal,
    QModalLayout,
    QRadio,
    QToggle,
    QCollapsible,
    QList,
    QStepper,
    QStep,
    QStepperNavigation,
    QItem,
    QItemSeparator,
    QItemTile,
    QInnerLoading,
    QTooltip,
    QCard,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QCardTitle,
    QFabAction,
    QFab,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    Toast,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  },
  data () {
    return {
      checked_one: true,
      list2: true,
      checked_two: true,
      employeeCreated: ''
    }
  },
  computed: {
    checked () {
      return this.employee.status === 1
    },
    employee () {
      return this.$store.state.employees.one || {}
    }
  },
  mounted () {
    this.$store.dispatch('employeesGet', this.$route.params.id)
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  },
  methods: {
    alterChecked () {
      let check
      if (this.employee.status === 1) {
        check = 0
      }
      else {
        check = 1
      }
      let data = {
        status: check
      }
      this.$store.dispatch('employeeUpdate', {id: this.employee.id, data: data})
        .then(() => {
          this.$store.dispatch('employeesGet', this.employee.id)
          Toast.create.positive({
            html: 'Status alterado com sucesso!',
            icon: 'done'
          })
        })
        .catch(() => {
          Toast.create.negative({
            html: 'Não foi possível alterar o status',
            icon: 'cancel'
          })
        })
    },
    back () {
      window.history.go(-1)
    },
    employeeDate () {
      this.employeeCreated = moment().format('DD/MM/YYYY')
      return this.employeeCreated
    },
    goEdit () {
      this.$router.push('/employees/' + this.employee.id + '/edit')
    }
  }
}
</script>

<style>
</style>
