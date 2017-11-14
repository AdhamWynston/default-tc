<template>
  <div class="layout-padding row justify-center">
    <div style="width: 800px; max-width: 90vw;">
    <q-stepper color="primary" v-model="step" ref="stepper" flat>
      <q-step name="first" title="Dados Pessoais" color="light">
        <div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <q-field
                      :error="$v.employee.name.$error"
                      :error-label="nameError"
              >
                <q-input
                        :error="$v.employee.name.$error"
                        max-length="100"
                        v-model="employee.name"
                        float-label="Nome Completo"
                        class="no-margin"
                        @blur="$v.employee.name.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5">
              <q-field
                      :error="$v.employee.document.$error"
                      :error-label="documentError"
                    >
                  <q-input
                          v-model="documentComputed"
                          max-length="11"
                          float-label="Nº Documento(CPF)"
                          @blur="$v.employee.document.$touch"
                  />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-7 col-md-7">
              <q-field :error="$v.employee.email.$error" :error-label="emailError">
                <q-input
                        v-model="employee.email"
                        type="email"
                        class="no-margin"
                        float-label="E-mail"
                        @blur="$v.employee.email.$touch"
                        :error="$v.employee.email.$error"
                        required
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-field :error="error" error-label="Por favor, preencha com telefone válido">
                <q-input
                        type="text"
                        v-model="employee.phone"
                        v-on:keyup="phoneFormat(1)"
                        class="no-margin"
                        @blur="$v.employee.phone.$touch"
                        :error="$v.employee.phone.$error"
                        max-length="15"
                        float-label="Telefone" />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-field
                      error-label="Por favor, preencha com telefone válido">
                <q-input
                        max-length="15"
                        class="no-margin"
                        v-on:keyup="phoneFormat(2)"
                        v-model="employee.phoneAlternative"
                        @blur="$v.employee.phoneAlternative.$touch"
                        float-label="Telefone Alernativo"
                        :error="$v.employee.phoneAlternative.$error"
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
                    :error="$v.employee.zip_code.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      v-on:keyup="cepFormat"
                      max-length="9"
                      v-model="employee.zip_code"
                      float-label="CEP"
                      class="no-margin"
                      @blur="$v.employee.zip_code.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-8">
            <q-field
                    :error="$v.employee.city.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.city"
                      float-label="Cidade"
                      class="no-margin"
                      @blur="$v.employee.city.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-field
                    :error="$v.employee.state.$error"
                    error-label="Por favor, preencha este campo">
              <q-select
                      v-model="employee.state"
                      float-label="Estado"
                      @blur="$v.employee.state.$touch"
                      :options="states"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-7">
            <q-field
                    :error="$v.employee.street.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.street"
                      float-label="Logradouro"
                      class="no-margin"
                      @blur="$v.employee.street.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-5">
            <q-field
                    :error="$v.employee.neighborhood.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.neighborhood"
                      float-label="Bairro"
                      class="no-margin"
                      @blur="$v.employee.neighborhood.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-field
                    :error="$v.employee.number.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.number"
                      float-label="Número"
                      class="no-margin"
                      @blur="$v.employee.number.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-8">
            <q-field
                    :error="$v.employee.complement.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="60"
                      v-model="employee.complement"
                      float-label="Complemento"
                      class="no-margin"
                      @blur="$v.employee.complement.$touch"
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
          <q-btn color="primary" :disabled="$v.employee.$invalid" @click="submit"> Cadastrar </q-btn>
        </template>
        <template v-else>
          <q-btn color="primary"  @click="$refs.stepper.next()" >Avançar</q-btn>
        </template>
      </q-stepper-navigation>
    </q-stepper>
  </div>
  </div>
</template>

<script>
  import { CPF } from 'cpf_cnpj'
  import validation from '../../../mixins/validationemployee.mixin'
  import statesMixin from '../../../mixins/states.mixin'
  import formatMixin from '../../../mixins/employeeFormat.mixin'
  import {
    Loading,
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
    mixins: [statesMixin, formatMixin, validation],
    methods: {
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      submit () {
        if (this.$v.employee.$invalid === false) {
          this.$store.dispatch('employeeInsert', this.employee)
            .then(() => {
              Loading.show()
              this.$router.push('/employees')
              this.closeLoading()
              Toast.create.positive({
                html: 'Cadastrado com sucesso',
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
          return CPF.format(this.employee.document)
        },
        set: function (newValue) {
          this.employee.document = CPF.strip(newValue)
        }
      }
    },
    data () {
      return {
        error: false,
        step: 'first',
        employee: {
          email: '',
          name: '',
          document: '',
          phone: '',
          type: '',
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
      Toast,
      QBtn,
      QAlert,
      Loading,
      QStepper,
      QStep,
      QStepperNavigation
    }
  }
</script>

<style scoped>
</style>
