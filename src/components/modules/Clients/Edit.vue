<template>
  <div class="layout-padding row justify-center">
    <div style="width: 700px; max-width: 90vw;">
    <q-stepper v-model="currentStep" vertical>
      <q-step name="first" title="Dados Pessoais" color="light">
        <div class="row-inline">
          <div class="row sm-gutter self-center">
            <div class="col-xs-12 col-sm-12">
              <q-field
                      :error="$v.client.name.$error"
                      error-label="Por favor, preencha com nome válido">
                <q-input
                        max-length="100"
                        v-model="client.name"
                        float-label="Nome Completo"
                        class="no-margin"
                        @blur="$v.client.name.$touch"
                />
              </q-field>
            </div>
          </div>
          <div class="row xs-gutter">
            <div class="col-xs-12 col-sm-4">
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
            <div class="col-xs-12 col-sm-8">
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
          </div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-12">
              <q-field :error="error" :error-label="emailError">
                <q-input
                        v-model="client.email"
                        type="email"
                        class="no-margin"
                        float-label="E-mail"
                        @blur="$v.client.email.$touch"
                        :error="$v.client.email.$error"
                        required
                />
              </q-field>
            </div>
          </div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-6">
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
            <div class="col-xs-12 col-sm-6">
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
          <q-stepper-navigation>
            <q-btn :disabled="$v.client.$invalid"  color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </q-stepper-navigation>
        </div>
      </q-step>
      <q-step name="second" title="Endereço">
        <div class="row xs-gutter">
          <div class="col-xs-12 col-sm-4">
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
        </div>
        <div class="row sm-gutter">
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
        </div>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-8">
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
          <div class="col-xs-12 col-sm-4">
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
        </div>
        <div class="row sm-gutter">
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
        <q-stepper-navigation>
          <q-btn color="primary" @click="currentStep = 'first'">Voltar</q-btn>
          <q-btn color="green" :disabled="$v.client.$invalid" @click="save()">Salvar</q-btn>
        </q-stepper-navigation>
      </q-step>
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
      save () {
        if (this.$v.client.$invalid === false) {
          let data = {
            name: this.client.name,
            document: this.client.document,
            state: this.client.state,
            city: this.client.city,
            zip_code: this.client.zip_code,
            street: this.client.street,
            type: this.client.type,
            neighborhood: this.client.neighborhood,
            number: this.client.number,
            complement: this.client.complement,
            phone: this.client.phone,
            phoneAlternative: this.client.phoneAlternative,
            email: this.client.email
          }
          this.$store.dispatch('clientUpdate', {id: this.$route.params.id, data: data})
            .then(() => {
              this.$store.dispatch('clientsGet', this.$route.params.id)
              this.$router.push('/clients')
              Toast.create.positive({
                html: 'Atualizado com sucesso!',
                icon: 'done'
              })
            })
            .catch(() => {
              Toast.create.negative({
                html: 'Não pode ser atualizado',
                icon: 'cancel'
              })
            })
        }
        else {
          Toast.create.negative('Verifique os dados')
        }
      }
    },
    mounted () {
      this.$store.dispatch('clientsGet', this.$route.params.id)
    },
    computed: {
      client () {
        return this.$store.state.clients.one || {}
      },
      documentComputed: {
        get: function () {
          if (this.client && this.client.document) {
            if (this.client.type === 1) {
              if (this.client.document.length === 11) {
                if (CPF.isValid(this.client.document)) {
                  return CPF.format(this.client.document)
                }
                else {
                  this.client.document = ''
                  return Toast.create.negative('Informe um CPF válido')
                }
              }
              else {
                return CPF.format(this.client.document)
              }
            }
            else {
              return CNPJ.format(this.client.document)
            }
          }
          else {
            return ''
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
        currentStep: 'first'
      }
    },
    components: {
      QInput,
      QField,
      QSelect,
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
