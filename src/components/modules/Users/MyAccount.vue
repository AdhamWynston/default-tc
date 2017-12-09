<template>
  <div class="layout-padding row justify-center">

    <q-card style="width: 700px">
      <q-card-title>
        <h4>
          Atualizar perfil
        </h4>
      </q-card-title>
      <q-card-main>
        <div>
          <div class="row xs-gutter">
            <div class="col-xs-12 col-sm-12">
              <q-field
                :error="$v.user.name.$error"
                :error-label="nameError"
              >
                <q-input
                  v-model="user.name"
                  class="no-margin"
                  float-label="Nome Completo"
                  @blur="$v.user.name.$touch"/>
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-12">
              <q-field
                :error="$v.user.email.$error"
                :error-label="emailError"
              >
                <q-input
                  v-model="user.email"
                  class="no-margin"
                  float-label="E-mail"
                  @blur="$v.user.email.$touch"/>
              </q-field>
            </div>
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
                :error="$v.user.confirmed_password.$error"
                :error-label="confirmed_passwordError">
                <q-input
                  v-model="user.confirmed_password"
                  type="password"
                  :no-pass-toggle="true"
                  class="no-margin"
                  @blur="$v.user.confirmed_password.$touch"
                  float-label="Confirmar Senha"/>
              </q-field>
            </div>
          </div>
        </div>
        <br>
        <q-btn @click="backCreate"flat>Voltar</q-btn>
        <q-btn color="primary" @click="save">Salvar</q-btn>
      </q-card-main>

    </q-card>
  </div>
</template>
<script>
  import { Loading, Toast, Dialog } from 'quasar'
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          confirmed_password: '',
          current_password: ''
        }
      }
    },
    validations: {
      user: {
        name: { required, minLength: minLength(3) },
        password: {
          minLength: minLength(6)
        },
        confirmed_password: {
          sameAsPassword: sameAs('password')
        },
        email: { email,
          required,
          async isUnique (value) {
            let id
            if (value === '') {
              return true
            }
            if (this.$route.params.id) {
              id = this.$route.params.id
            }
            else {
              id = 0
            }
            const response = await fetch(`http://127.0.0.1:8000/api/users/${value}/` + id)
            return Boolean(await response.json())
          }
        }
      }
    },
    computed: {
      passwordError () {
        if (!this.$v.user.password.minLength) {
          return 'A senha deve possuir pelo menos 6 caracteres!'
        }
        else {
          return null
        }
      },
      confirmed_passwordError () {
        if (!this.$v.user.confirmed_password.minLength) {
          return 'A senha deve possuir pelo menos 6 caracteres!'
        }
        else if (!this.$v.user.confirmed_password.sameAs) {
          return 'As senhas não conferem!'
        }
        else {
          return null
        }
      },
      nameError () {
        if (!this.$v.user.name.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.name.minLength) {
          console.log(this.$route.params.id)
          return 'Preencha com nome válido!'
        }
        else {
          return null
        }
      },
      emailError () {
        if (!this.$v.user.email.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.email.email) {
          return 'Preencha com E-mail válido!'
        }
        else if (!this.$v.user.email.isUnique) {
          return 'Este E-mail já está cadastrado!'
        }
        else {
          return null
        }
      }
    },
    methods: {
      backCreate () {
        this.$router.push('/home')
      },
      closeLoading () {
        setTimeout(Loading.hide, 300)
      },
      save () {
        Dialog.create({
          title: 'Informe sua senha atual',
          form: {
            pass: {
              type: 'password',
              label: 'Senha',
              model: ''
            }
          },
          buttons: [
            {
              label: 'Cancelar',
              handler: () => {
              }
            },
            {
              label: 'Salvar',
              handler: (data) => {
                this.submit(data)
                console.log(this.user)
              }
            }
          ]
        })
      },
      submit (value) {
        Loading.show({
          delay: 300
        })
        let data = this.user
        data['current_password'] = value.pass
        console.log(data)
        this.$http.put('user/profile', data)
          .then((response) => {
            this.user = response.body
            this.$store.commit('setUser', response.body)
            this.closeLoading()
            Toast.create.positive({
              html: 'Perfil Atualizado com sucesso!',
              icon: 'done'
            })
          })
          .catch((response) => {
            console.log(response)
            this.closeLoading()
            let res
            if (response.status === 404) {
              res = 'Senha inválida'
            }
            else {
              res = 'Foi impossivel atualizar seu perfil!'
            }
            Toast.create.negative(res)
          })
      },
      currentUser () {
        this.$http.get('user/current')
          .then((response) => {
            console.log(response.body)
            this.user = response.body
          })
          .catch((response) => {
            console.log(response)
          })
      }
    },
    mounted () {
      this.currentUser()
    }
  }
</script>
