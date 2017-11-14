<template>
  <div class="layout-padding row justify-center">
    <div style="width: 800px; max-width: 90vw;">
      <q-stepper v-model="step" flat ref="stepper">
        <q-step name="first" title="Dados Pessoais" color="light">
          <div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <q-field
                      :error="$v.client.name.$error"
                      :error-label="nameError">
                <q-input
                        max-length="100"
                        v-model="client.name"
                        float-label="Nome Completo"
                        class="no-margin"
                        @blur="$v.client.name.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              <q-field
                      :error="$v.client.type.$error"
                      error-label="Por favor, preencha este campo">
                <q-select
                        v-model="client.type"
                        float-label="Tipo de pessoa?"
                        @blur="$v.client.type.$touch"
                        :options="options"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-8 col-md-8">
              <q-field
                      :error="$v.client.document.$error"
                      :error-label="documentError">
                <template v-if="this.client.type === 1">
                  <q-input
                          v-model="documentComputed"
                          max-length="11"
                          float-label="Nº Documento(CPF)"
                          @blur="$v.client.document.$touch"
                  />
                </template>
                <template v-if="this.client.type === 2">
                  <q-input
                          v-model="documentComputed"
                          max-length="14"
                          float-label="Nº Documento(CNPJ)"
                          @blur="$v.client.document.$touch"
                          :error="$v.client.document.$error"
                  />
                </template>
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
              <q-field :error="error" :error-label="emailError">
                <q-input
                        v-model="client.email"
                        type="email"
                        float-label="E-mail"
                        @blur="$v.client.email.$touch"
                        :error="$v.client.email.$error"
                        required
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-field :error="error" error-label="Por favor, preencha com telefone válido">
                <q-input
                        type="text"
                        v-model="client.phone"
                        v-on:keyup="phoneFormat(1)"
                        class="no-margin"
                        @blur="$v.client.phone.$touch"
                        :error="$v.client.phone.$error"
                        max-length="15"
                        float-label="Telefone" />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-field
                      :error="$v.client.phoneAlternative.$error"
                      error-label="Por favor, preencha com telefone válido">
                <q-input
                        type="text"
                        max-length="15"
                        class="no-margin"
                        v-on:keyup="phoneFormat(2)"
                        v-model="client.phoneAlternative"
                        @blur="$v.client.phoneAlternative.$touch"
                        float-label="Telefone Alernativo"
                />
              </q-field>
            </div>
          </div>
          </div>
        </q-step>
        <q-step name="second" title="Endereço">
          <div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-5">
              <q-field
                      :error="$v.client.zip_code.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        v-on:keyup="cepFormat"
                        max-length="9"
                        v-model="client.zip_code"
                        float-label="CEP"
                        class="no-margin"
                        @blur="$v.client.zip_code.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-8">
              <q-field
                      :error="$v.client.city.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="client.city"
                        float-label="Cidade"
                        class="no-margin"
                        @blur="$v.client.name.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-field
                      :error="$v.client.state.$error"
                      error-label="Por favor, preencha este campo">
                <q-select
                        v-model="client.state"
                        float-label="Estado"
                        @blur="$v.client.state.$touch"
                        :options="states"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-7">
              <q-field
                      :error="$v.client.street.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="client.street"
                        float-label="Logradouro"
                        class="no-margin"
                        @blur="$v.client.street.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-5">
              <q-field
                      :error="$v.client.neighborhood.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="client.neighborhood"
                        float-label="Bairro"
                        class="no-margin"
                        @blur="$v.client.neighborhood.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-field
                      :error="$v.client.number.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="client.number"
                        float-label="Número"
                        class="no-margin"
                        @blur="$v.client.number.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-8">
              <q-field
                      :error="$v.client.complement.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="60"
                        v-model="client.complement"
                        float-label="Complemento"
                        class="no-margin"
                        @blur="$v.client.complement.$touch"
                />
              </q-field>
            </div>
          </div>
          </div>
        </q-step>
        <q-stepper-navigation>
          <q-btn
                  v-if="step !== 'first'"
                  color="primary"
                  flat
                  @click="$refs.stepper.previous()"
          >
            Voltar
          </q-btn>
          <template v-if="step === 'second'">
            <q-btn color="primary" :disabled="$v.client.$invalid" @click="submit"> Cadastrar </q-btn>
          </template>
          <template v-else>
            <q-btn color="primary" @click="$refs.stepper.next()" >Avançar</q-btn>
          </template>
        </q-stepper-navigation>
      </q-stepper>
    </div>
  </div>
</template>

<script>
  import { CNPJ, CPF } from 'cpf_cnpj'
  import validationClientMixin from '../../../mixins/validationClient.mixin'
  import statesMixin from '../../../mixins/states.mixin'
  import formatMixin from '../../../mixins/format.mixin'
  import {
    QInput,
    QSelect,
    QBtn,
    Loading,
    QField,
    QAlert,
    Toast,
    QStepper,
    QStep,
    QStepperNavigation
  } from 'quasar'
  export default {
    mixins: [statesMixin, formatMixin, validationClientMixin],
    methods: {
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      submit () {
        if (this.$v.client.$invalid === false) {
          this.$store.dispatch('clientInsert', this.client)
            .then(() => {
              Loading.show()
              this.$router.push('/clients')
              this.closeLoading()
              Toast.create.positive({
                html: 'Cliente cadastrado com sucesso',
                icon: 'done'
              })
            })
            .catch(() => {
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
                icon: 'cancel'
              })
            })
        }
        else {
          Toast.create.negative('Verifique os dados')
        }
      }
    },
    computed: {
      documentComputed: {
        get: function () {
          if (this.client.type === 1) {
            return CPF.format(this.client.document)
          }
          else {
            return CNPJ.format(this.client.document)
          }
        },
        set: function (newValue) {
          if (this.client.type === 1) {
            this.client.document = CPF.strip(newValue)
          }
          else {
            this.client.document = CNPJ.strip(newValue)
          }
        }
      }
    },
    data () {
      return {
        error: false,
        step: 'first',
        client: {
          email: '',
          name: '',
          document: '',
          phone: '',
          type: 1,
          phoneAlternative: '',
          state: '',
          city: '',
          zip_code: '',
          street: '',
          neighborhood: '',
          number: '',
          complement: ''
        }
      }
    },
    components: {
      QInput,
      QField,
      QSelect,
      Loading,
      Toast,
      QBtn,
      QAlert,
      QStepper,
      QStep,
      QStepperNavigation
    }
  }
</script>

<style scoped>
</style>
