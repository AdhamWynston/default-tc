<template>
  <div class="layout-padding row justify-center">

    <q-card style="width: 700px">
      <q-card-title>
        <h4>
          Cadastrar Usuário
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
            <div class="col-xs-12 col-sm-6">
              <q-field
                      :error="$v.user.role.$error"
                      error-label="Preencha corretamente este campo!"
              >
                <q-select
                        v-model="user.role"
                        float-label="Permissão"
                        @blur="$v.user.role.$touch"
                        :options="roles"
                />
              </q-field>
            </div>
          </div>
        </div>
        <br>
        <q-btn @click="backCreate"flat>Voltar</q-btn>
        <q-btn color="primary" :disabled="$v.user.$invalid" @click="save">Salvar</q-btn>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {
    Events,
    Loading,
    Toast
  }
    from 'quasar'
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        error: false,
        roles: [
          {
            label: 'Coordenador',
            value: 2
          },
          {
            label: 'Administrador',
            value: 1
          }
        ]
      }
    },
    validations: {
      user: {
        name: { required },
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
        },
        role: { required }
      }
    },
    methods: {
      backCreate () {
        this.$router.push('/admin/users')
      },
      closeLoading () {
        setTimeout(Loading.hide, 300)
      },
      save () {
        if (this.$v.user.$invalid === false) {
          let data = {
            name: this.user.name,
            email: this.user.email,
            role: this.user.role
          }
          this.$store.dispatch('userUpdate', {id: this.$route.params.id, data: data})
            .then(() => {
              this.$store.dispatch('usersGet', this.$route.params.id)
              this.$router.push('/admin/users')
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
      Events.$on('createUser', () => {
        this.submit()
      })
    },
    computed: {
      user () {
        return this.$store.state.users.one || {}
      },
      nameError () {
        if (!this.$v.user.name.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.name.minLength) {
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
    components: {
      Toast
    }
  }
</script>

<style lang="stylus">
</style>
