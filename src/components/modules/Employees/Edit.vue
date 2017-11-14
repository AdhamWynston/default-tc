<template>
  <div class="layout-padding row justify-center">
    <div style="width: 700px; max-width: 90vw;">
    <q-stepper v-model="currentStep" vertical>
        <q-step name="first" title="Dados Pessoais" color="light">
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-12">
              <q-field
                      :error="$v.employee.name.$error"
                      :error-label="nameError"
              >
                <q-input
                        max-length="100"
                        v-model="employee.name"
                        float-label="Nome Completo"
                        class="no-margin"
                        @blur="$v.employee.name.$touch"
                />
              </q-field>
            </div>
          </div>
          <div class="row xs-gutter">
            <div class="col-xs-12 col-sm-4">
              <q-field
              >
                <q-input
                        :error="$v.employee.document.$error"
                        v-model="documentComputed"
                        max-length="11"
                        float-label="Nº Documento(CPF)"
                        @blur="$v.employee.document.$touch"
                />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-8">
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
              <!--<span v-if="$v.employee.email.$error">{{emailError}}</span>-->
            </div>
          </div>
          <div class="row xs-gutter">
            <div class="col-xs-12 col-sm-6">
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
            <div class="col-xs-12 col-sm-6">
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
          <q-stepper-navigation>
            <q-btn  color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </q-stepper-navigation>
        </q-step>
      <q-step name="second" title="Endereço">
        <div class="row xs-gutter">
          <div class="col-xs-12 col-sm-4">
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
        </div>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-8">
            <q-field
                    :error="$v.employee.city.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.city"
                      float-label="Cidade"
                      class="no-margin"
                      @blur="$v.employee.name.$touch"
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
        </div>
        <div class="row sm-gutter">
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
        </div>
        <div class="row sm-gutter">
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
        <q-stepper-navigation>
          <q-btn color="secundary" flat @click="currentStep = 'first'">Voltar</q-btn>
          <q-btn color="green" :disabled="$v.employee.$invalid" @click="save()">Salvar</q-btn>
        </q-stepper-navigation>
      </q-step>
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
      save () {
        if (this.$v.employee.$invalid === false) {
          let data = {
            name: this.employee.name,
            document: this.employee.document,
            state: this.employee.state,
            city: this.employee.city,
            zip_code: this.employee.zip_code,
            street: this.employee.street,
            neighborhood: this.employee.neighborhood,
            number: this.employee.number,
            complement: this.employee.complement,
            phone: this.employee.phone,
            phoneAlternative: this.employee.phoneAlternative,
            email: this.employee.email
          }
          this.$store.dispatch('employeeUpdate', {id: this.$route.params.id, data: data})
            .then(() => {
              this.$store.dispatch('employeesGet', this.$route.params.id)
              this.$router.push('/employees')
              Toast.create.positive({
                html: 'Atualizado com sucesso',
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
      this.$store.dispatch('employeesGet', this.$route.params.id)
    },
    computed: {
      employee () {
        return this.$store.state.employees.one || {}
      },
      documentComputed: {
        get: function () {
          if (this.employee && this.employee.document) {
            if (this.employee.document.length === 11) {
              if (CPF.isValid(this.employee.document)) {
                return CPF.format(this.employee.document)
              }
              else {
                this.employee.document = ''
                return Toast.create.negative('Informe um CPF válido')
              }
            }
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.employee.document = CPF.strip(newValue)
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
      Loading,
      QStepper,
      QStep,
      QStepperNavigation
    }
  }
</script>

<style scoped>
</style>
