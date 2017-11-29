<template>
  <div class="layout-padding row justify-center">
    <template v-if="response">
    <q-card color="light" style="width: 500px">
      <q-card-title class="text-dark">
        <h4>
          Cadastrar senha
        </h4>
      </q-card-title>
      <q-card-main>
          <div>
            <div class="row xs-gutter">
              <div class="col-xs-12 col-sm-12">
                <q-field
                  :error="$v.user.password.$error"
                  :error-label="passwordError">
                <q-input
                  v-model="user.password"
                  type="password"
                  class="no-margin"
                  @blur="$v.user.password.$touch"
                  float-label="Senha"/>
                </q-field>
              </div>
              <div class="col-xs-12 col-sm-12">
                <q-field
                  :error="$v.user.repeatPassword.$error"
                  :error-label="repeatPasswordError">
                <q-input
                  v-model="user.repeatPassword"
                  type="password"
                  :no-pass-toggle="true"
                  class="no-margin"
                  @blur="$v.user.repeatPassword.$touch"
                  float-label="Confirmar Senha"/>
                </q-field>
              </div>
            </div>
          </div>
        <br>
        <q-btn class="text-white" color="primary" :disable="$v.user.$invalid" @click="submit">Salvar</q-btn>
      </q-card-main>
    </q-card>
    </template>
    <template v-else>
      <div>
        <q-card color="light" style="width: 500px">
          <q-card-title class="text-dark">
          </q-card-title>
          <q-card-main>
            <div>
              <q-alert
                color="red"
                icon="warning"
              >
                Token Inválido!
              </q-alert>
            </div>
            <br>
          </q-card-main>
        </q-card>
      </div>
    </template>
  </div>
</template>
<script>
  import { required, sameAs, minLength } from 'vuelidate/lib/validators'
  import { Loading, Toast } from 'quasar'
  export default {
    data () {
      return {
        response: {},
        error: false,
        user: {
          password: '',
          repeatPassword: ''
        }
      }
    },
    computed: {
      passwordError () {
        if (!this.$v.user.password.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.password.minLength) {
          return 'A senha deve possuir pelo menos 6 caracteres!'
        }
        else {
          return null
        }
      },
      repeatPasswordError () {
        if (!this.$v.user.password.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.password.minLength) {
          return 'A senha deve possuir pelo menos 6 caracteres!'
        }
        else if (!this.$v.user.password.sameAs) {
          return 'As senhas não conferem!'
        }
        else {
          return null
        }
      }
    },
    validations: {
      user: {
        password: {
          required,
          minLength: minLength(6)
        },
        repeatPassword: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    mounted () {
      this.confirmed()
    },
    components: {
      Toast
    },
    methods: {
      confirmed () {
        this.$http.get('token/confirmed/' + this.$route.params.token)
          .then((response) => {
            console.log(response.body)
            this.response = response.body
          })
          .catch((response) => {
            this.response = null
          })
      },
      submit () {
        Loading.show()
        let data = {
          password: this.user.password,
          confirmed_token: this.$route.params.token
        }
        this.$http.post('token/' + this.response.id + '/password', data)
          .then((response) => {
            console.log(response)
            this.$router.push('/login')
            Loading.hide()
            Toast.create.positive('Sua senha foi cadastrada com sucesso!')
          })
          .catch((response) => {
            if (response.status === 422) {
              Loading.hide()
              Toast.create.negative('Preencha todos os campos!')
            }
            else {
              Toast.create.negative('Ocorreu um erro, por favor tente novamente.')
            }
          })
      }
    }
  }
</script>
