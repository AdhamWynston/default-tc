<template>
    <div class="layout-padding justify-center">
        <div class="row justify-center">
            <h5>
                Informações do evento
            </h5>
        </div>
        <div class="row justify-center">
            <div class="col-xs-12 col-sm-8 col-md-8">
                <q-list link>
                    <q-collapsible opened icon="info_outline" label="Dados do Evento">
                        <div>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Nome</q-item-tile>
                                    <q-item-tile sublabel>{{ event.name }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Início do evento</q-item-tile>
                                    <q-item-tile sublabel>{{ event.startDate | moment}}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Término do evento</q-item-tile>
                                    <q-item-tile sublabel>{{ event.endDate | moment}}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Quantidade de Seguranças</q-item-tile>
                                    <q-item-tile sublabel>{{ event.quantityEmployees }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Observações</q-item-tile>
                                    <q-item-tile sublabel>{{ event.observations }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Cadastrado em</q-item-tile>
                                    <q-item-tile sublabel>{{ event.created_at | moment }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Atualizado em</q-item-tile>
                                    <q-item-tile sublabel>{{ event.updated_at | moment }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </div>
                    </q-collapsible>
                    <q-collapsible opened icon="ion-ios-location" label="Local do Evento">
                        <div>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Cidade</q-item-tile>
                                    <q-item-tile sublabel>{{ event.city }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>CEP</q-item-tile>
                                    <q-item-tile sublabel>{{ event.zip_code }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Estado</q-item-tile>
                                    <q-item-tile sublabel>{{ event.state }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Número</q-item-tile>
                                    <q-item-tile sublabel>{{ event.local }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </div>
                    </q-collapsible>
                    <q-collapsible opened icon="ion-person" label="Dados do Cliente">
                        <div>
                            <template v-if="event.client">
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile label>Nome</q-item-tile>
                                        <q-item-tile sublabel>{{ event.client.name }}</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile label>Document</q-item-tile>
                                        <q-item-tile sublabel>{{ event.client.document | document }}</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile label>Telefone</q-item-tile>
                                        <q-item-tile sublabel>{{ event.client.phone }}</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <template v-if="event.client.phoneAlternative != null">
                                    <q-item>
                                        <q-item-main>
                                            <q-item-tile label>Telefone Alternativo</q-item-tile>
                                            <q-item-tile sublabel>{{ event.client.phoneAlternative }}</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                </template>
                            </template>
                        </div>
                    </q-collapsible>
                </q-list>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent */
    import moment from 'moment'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import {
      QFixedPosition,
      QFab,
      QFabAction,
      Toast,
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
        QItemSide,
        QItemMain,
        Toast,
        QSideLink,
        QListHeader,
        QScrollArea
      },
      data () {
        return {
          list2: true,
          checked_two: true,
          eventCreated: '',
          client: {}
        }
      },
      computed: {
        checked () {
          return this.event.status === 1
        },
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('eventsGet', this.$route.params.id)
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
      methods: {
        alterChecked () {
          let check
          if (this.event.status === 1) {
            check = 0
          }
          else {
            check = 1
          }
          let data = {
            status: check
          }
          this.$store.dispatch('eventUpdate', {id: this.event.id, data: data})
            .then(() => {
              this.$store.dispatch('eventsGet', this.event.id)
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
        eventDate () {
          this.eventCreated = moment().format('DD/MM/YYYY')
          return this.eventCreated
        }
      }
    }
</script>

<style>
</style>
