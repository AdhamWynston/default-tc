import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import { CNPJ, CPF } from 'cpf_cnpj'
export default {
  computed: {
    documentError () {
      if (!this.$v.employee.document.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.employee.document.isCPF) {
        return 'Este documento não é válido!'
      }
      else if (!this.$v.employee.document.isUnique) {
        return 'Este documento já está cadastrado!'
      }
      else {
        return null
      }
    },
    nameError () {
      if (!this.$v.employee.name.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.employee.name.minLength) {
        return 'Preencha com nome válido!'
      }
      else {
        return null
      }
    },
    emailError () {
      if (!this.$v.employee.email.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.employee.email.email) {
        return 'Preencha com E-mail válido!'
      }
      else if (!this.$v.employee.email.isUnique) {
        return 'Este E-mail já está cadastrado!'
      }
      else {
        return null
      }
    }
  },
  validations: {
    employee: {
      email: { required,
        email,
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
          const response = await fetch(`http://127.0.0.1:8000/api/employees/${value}/` + id)
          return Boolean(await response.json())
        }
      },
      name: { required,
        minLength: minLength(3)
      },
      document: { required,
        numeric,
        minLength: minLength(11),
        async isUnique (value) {
          let id
          if (value === '') {
            return true
          }
          value = CPF.strip(value)
          if (this.$route.params.id) {
            id = this.$route.params.id
          }
          else {
            id = 0
          }
          const response = await fetch(`http://127.0.0.1:8000/api/employees/document/${value}/` + id)
          return Boolean(await response.json())
        },
        isCPF (value) {
          value = CPF.strip(value)
          if (value.length === 11) {
            return CPF.isValid(value)
          }
          return CNPJ.isValid(value)
        }
      },
      phone: { required, minLength: minLength(11) },
      phoneAlternative: { minLength: minLength(11) },
      state: { required },
      city: { required },
      zip_code: { required },
      street: { required },
      neighborhood: { required },
      number: { required },
      complement: { required }
    }
  }
}
