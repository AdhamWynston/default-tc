<template>
  <div class="layout-padding row justify-center">
    <div class="col-12">
      <div align="center">
        <img src="./Logo.png" alt="Fjords" width="128" height="128">
      </div>
    </div>
    <div class="col-12">
      <br>
      <div align="center">
        <span class="light-paragraph"><big>Recuperar sua senha</big></span>
      </div>
    </div>
    <div class="col-12 offset-md-8">
      <q-card color="light" style="width: 400px">
        <q-card-title class="text-dark">
        </q-card-title>
        <q-card-main>
          <div>
            <q-field
              :error="$v.user.email.$error"
              error-label="Por favor, preencha este campo"
            >
              <q-input
                v-model="user.email"
                @blur="$v.user.email.$touch"
                @keyup.enter="submit"
                :error="$v.user.email.$error"
                float-label="E-mail"
              />
            </q-field>
          </div>
          <br>
        </q-card-main>
        <q-card-actions>
          <q-btn class="full-width" :disable="$v.user.$invalid" color="primary" @click="submit">Enviar</q-btn>
        </q-card-actions>
        <br>
      </q-card>
    </div>
      </div>
</template>
<script>
  import { required, email } from 'vuelidate/lib/validators'
  import { Loading, Toast } from 'quasar'

  export default {
    data () {
      return {
        response: '',
        error: false,
        user: {
          email: ''
        }
      }
    },
    validations: {
      user: {
        email: {
          required,
          email
        }
      }
    },
    components: {
      Toast
    },
    methods: {
      submit () {
        Loading.show()
        let data = {
          email: this.user.email
        }
        this.$http.post('token/recovery', data)
          .then((response) => {
            setTimeout(() => {
              Loading.hide()
              this.$router.push('/login')
              Toast.create.positive('Enviamos um link de recuperação para o e-mail')
            }, 1000)
          })
          .catch((response) => {
            setTimeout(() => {
              Loading.hide()
              this.$router.push('/login')
              Toast.create.positive('Enviamos um link de recuperação para o e-mail')
            }, 1000)
          })
      }
    }
  }
</script>

