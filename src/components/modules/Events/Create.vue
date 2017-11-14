<template>
    <div class="layout-padding row justify-center">
        <div style="width: 600px; max-width: 90vw;">
            <q-stepper v-model="step" flat ref="stepper" vertical>
                <q-step name="first" title="Selecionar o Cliente" color="light">
                    <div>
                        <div class="row sm-gutter">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-search v-model="terms" placeholder="Selecione o Cliente">
                                    <q-autocomplete
                                            v-model="terms"
                                            @search="search"
                                            :max-results="4"
                                            @selected="selected"
                                    />
                                    <q-tooltip>
                                        Digite o nome do cliente
                                    </q-tooltip>
                                </q-search>
                            </div>
                            </div>
                        </div>
                </q-step>
                <q-step name="second" title="Dados do Evento">
                    <div>
                        <div class="row xs-gutter">
                            <div class="col-xs-12 col-sm-12">
                                Cliente: {{ selectedClient.name }}
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <q-field
                                        :error="$v.form.name.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            autofocus
                                            max-length="100"
                                            v-model="form.name"
                                            float-label="Nome do evento"
                                            class="no-margin"
                                            @blur="$v.form.name.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <q-field
                                        :error="$v.form.startDate.$error"
                                        :error-label="startError">
                                <q-datetime
                                        id="started"
                                        v-model="form.startDate"
                                        stack-label="Início do Evento"
                                        type="datetime"
                                        format24h
                                        format="DD/MM/YYYY HH:mm"
                                        ok-label="OK"
                                        @blur="$v.form.startDate.$touch"
                                        clear-label="Limpar"
                                        cancel-label="Cancelar"
                                        :day-names="['Dom','Seg', 'Ter','Qua','Qui','Sex','Sáb']"
                                        :month-names="['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']"
                                />
                                </q-field>
                            </div>
                            <template v-if="this.form.startDate !== ''">
                                <div class="col-xs-12 col-sm-6">
                                    <q-field
                                            :error="$v.form.endDate.$error"
                                            :error-label="endError">
                                        <q-datetime
                                                id="terminated"
                                                format24h
                                                v-model="form.endDate"
                                                @blur="$v.form.endDate.$touch"
                                                stack-label="Termíno do Evento"
                                                type="datetime"
                                                format="DD/MM/YYYY HH:mm"
                                                ok-label="OK"
                                                clear-label="Limpar"
                                                cancel-label="Cancelar"
                                                :day-names="['Dom','Seg', 'Ter','Qua','Qui','Sex','Sáb']"
                                                :month-names="['Janeiro', 'Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']"
                                        />
                                    </q-field>
                                </div>
                            </template>
                            <template v-if="this.form.startDate !== '' && this.form.endDate !== ''">
                                <div class="col-xs-12 col-sm-12">
                                    Duração: {{ calculeDuration }}
                                </div>
                              <div class="col-xs-12 col-sm-12">
                              Funcionários disponíveis: {{ knob }}
                              </div>
                            </template>
                            <!--<template v-if="this.form.endDate !== ''">-->
                                <!--<div class="col-xs-12 col-sm-5">-->
                                    <!--<q-field-->
                                            <!--:error="$v.form.quantityEmployees.$error"-->
                                            <!--:error-label="quantityEmployeesError">-->
                                        <!--<q-input-->
                                                <!--type="number"-->
                                                <!--v-model="form.quantityEmployees"-->
                                                <!--:min="0"-->
                                                <!--float-label="Quantidade de Seguranças"-->
                                                <!--class="no-margin"-->
                                                <!--@blur="$v.form.quantityEmployees.$touch"-->
                                        <!--/>-->
                                    <!--</q-field>-->
                                <!--</div>-->
                            <!--</template>-->
                          <template v-if="this.form.startDate !== '' && this.form.endDate !== ''">
                              <q-field
                                label="Selecione a quantidade"
                                :label-width="10"
                                :error="$v.model.$error"
                                error-label="Este campo é obrigatorio"
                              >
                              <q-knob
                                class="text-primary"
                                v-model="model"
                                :min="0"
                                :step="2"
                                :max="knob"
                              >
                                <q-icon class="on-left" name="ion-person-stalker" /> {{model}}
                              </q-knob>
                              </q-field>
                          </template>
                            <div class="col-xs-12 col-sm-12">
                                <q-field
                                        :error="$v.form.observations.$error"
                                        error-label="Houve um erro neste campo">
                                    <q-input
                                            type="text"
                                            v-model="form.observations"
                                            :min="0"
                                            float-label="Observações"
                                            class="no-margin"
                                            @blur="$v.form.observations.$touch"
                                    />
                                </q-field>
                            </div>
                        </div>
                    </div>
                </q-step>
                <q-step name="third" title="Local do Evento">
                    <div>
                        <div class="row xs-gutter">
                            <div class="col-xs-12 col-sm-12">
                                <q-field
                                        :error="$v.form.local.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            v-model="form.local"
                                            :min="0"
                                            float-label="Local"
                                            class="no-margin"
                                            @blur="$v.form.local.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-7">
                                <q-field
                                        :error="$v.form.zip_code.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            v-on:keyup="cepFormat"
                                            max-length="9"
                                            v-model="form.zip_code"
                                            float-label="CEP"
                                            class="no-margin"
                                            @blur="$v.form.zip_code.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-8">
                                <q-field
                                        :error="$v.form.city.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            v-model="form.city"
                                            :min="0"
                                            float-label="Cidade"
                                            class="no-margin"
                                            @blur="$v.form.city.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <q-field
                                        :error="$v.form.state.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-select
                                            v-model="form.state"
                                            float-label="Estado"
                                            @blur="$v.form.state.$touch"
                                            :options="states"
                                    />
                                </q-field>
                            </div>
                        </div>
                    </div>
                </q-step>
                <q-stepper-navigation class="on-right ">
                    <q-btn
                            v-if="step !== 'first'"
                            color="primary"
                            flat
                            @click="$refs.stepper.previous()"
                    >
                        Voltar
                    </q-btn>
                    <!--<template v-if="step === 'first'">-->
                        <!--<q-btn color="primary" :disabled="$v.terms.$invalid" @click="$refs.stepper.next()" >Avançar</q-btn>-->
                    <!--</template>-->
                    <template v-if="step === 'second'">
                        <q-btn color="primary" :disabled="$v.model.$invalid" @click="$refs.stepper.next()"> Avançar </q-btn>
                    </template>
                    <template v-if="step === 'third'">
                        <q-btn color="primary" :disabled="$v.form.$invalid" @click="submit" >Cadastrar</q-btn>
                    </template>
                </q-stepper-navigation>
            </q-stepper>
        </div>
    </div>
</template>

<script>
  import PhoneFormatter from '../../../services/my-formatter'
  import axios from 'axios'
  import statesMixin from '../../../mixins/states.mixin'
  import { required, minValue } from 'vuelidate/lib/validators'
  import { CNPJ, CPF } from 'cpf_cnpj'
  import {
    Loading,
    Toast,
    filter
  } from 'quasar'
  import moment from 'moment'
  function show (options) {
    Loading.show(options)
    setTimeout(() => {
      Loading.hide()
    }, 3000)
  }
  export default {
    mixins: [statesMixin],
    data () {
      return {
        model: 0,
        range3: {
          from: null,
          to: null
        },
        available: 0,
        resp: '',
        durations: '',
        step: 'first',
        error: false,
        terms: '',
        clients: [],
        selectedClient: { address: {} },
        form: {
          name: '',
          quantityEmployees: '',
          local: '',
          zip_code: '',
          city: '',
          state: '',
          startDate: '',
          endDate: '',
          observations: ''
        }
      }
    },
    computed: {
      knob () {
        let data = {
          startDate: moment(this.form.startDate).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(this.form.endDate).format('YYYY-MM-DD HH:mm:ss')
        }
        this.$http.post('http://127.0.0.1:8000/api/events/check', data)
          .then((response) => {
            this.available = response.body.quantity
          })
        return this.available
      },
      calculeDuration () {
        const date1 = moment(this.form.startDate)
        const date2 = moment(this.form.endDate)
        const differenceInMs = date2.diff(date1)
        const duration = moment.duration(differenceInMs)
        const differenceInHours = duration.asHours()
        this.duration = differenceInHours
        return differenceInHours + ' Horas'
      },
      cList () {
        return this.$store.state.clients.list
      },
      endError () {
        if (!this.$v.form.endDate.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.form.endDate.isAfter) {
          return 'Data inválida'
        }
        else {
          return null
        }
      },
      startError () {
        if (!this.$v.form.startDate.required) {
          return 'Este campo é obrigatório!'
        }
        else {
          return null
        }
      },
      parseClients () {
        return this.clients.map(client => {
          let document = this.documentFormat(client.document)
          return {
            allData: client,
            label: client.name,
            sublabel: 'CPF: ' + document,
            value: client.name
          }
        })
      }
    },
    validations: {
      model: { required, minValue: minValue(2) },
      terms: { required },
      form: {
        name: { required },
        local: { required },
        zip_code: { required },
        city: { required },
        state: { required },
        startDate: {
          required
        },
        endDate: {
          required,
          isAfter (date) {
            return moment(date).isAfter(this.form.startDate)
          }
        },
        observations: {}
      }
    },
    methods: {
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      cepFormat () {
        if (this.form.zip_code.length === 8) {
          this.form.zip_code = PhoneFormatter.modules.cepFormatter(this.form.zip_code)
          if (/^[0-9]{5}-[0-9]{3}$/.test(this.form.zip_code)) {
            axios.get('https://viacep.com.br/ws/' + this.form.zip_code + '/json/')
              .then((response) => {
                this.form.city = response.data.localidade
                this.form.state = response.data.uf
              })
          }
        }
      },
      documentFormat (value) {
        if (value.length === 11) {
          return CPF.format(value)
        }
        else {
          return CNPJ.format(value)
        }
      },
      submit () {
        let data = {
          duration: this.duration,
          client_id: this.selectedClient.id,
          name: this.form.name,
          local: this.form.local,
          zip_code: this.form.zip_code,
          city: this.form.city,
          state: this.form.state,
          observations: this.form.observations,
          quantityEmployees: this.model,
          startDate: moment(this.form.startDate).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(this.form.endDate).format('YYYY-MM-DD HH:mm:ss')
        }
        if (this.$v.form.$invalid === false) {
          show()
          this.$store.dispatch('eventInsert', data)
            .then((response) => {
              this.$router.push('/events')
              Toast.create.positive({
                html: 'Evento cadastrado com sucesso!',
                icon: 'done'
              })
            })
            .catch((response) => {
              console.log(response)
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
                icon: 'cancel'
              })
            })
        }
        else {
          Toast.create.negative('Verifique os dados')
        }
      },
      search (terms, done) {
        setTimeout(() => {
          done(filter(terms, {field: 'value', list: this.parseClients}))
        }, 500)
      },
      selected (client) {
        this.selectedClient = client.allData
        this.$refs.stepper.next()
      },
      getClients () {
        this.$http.get('http://127.0.0.1:8000/api/clients?where[status]=1')
          .then(response => {
            this.clients = response.data
          })
      }
    },
    mounted () {
      this.getClients()
    },
    components: {
      Loading,
      Toast
    }
  }
</script>

<style>
</style>
