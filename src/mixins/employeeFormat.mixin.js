import PhoneFormatter from '../services/my-formatter'
import axios from 'axios'
export default {
  methods: {
    cepFormat () {
      if (this.employee.zip_code.length === 8) {
        this.employee.zip_code = PhoneFormatter.modules.cepFormatter(this.employee.zip_code)
        if (/^[0-9]{5}-[0-9]{3}$/.test(this.employee.zip_code)) {
          axios.get('https://viacep.com.br/ws/' + this.employee.zip_code + '/json/')
            .then((response) => {
              this.employee.city = response.data.localidade
              this.employee.state = response.data.uf
            })
        }
      }
    },
    phoneFormat (value) {
      if (this.employee.phone) {
        if (this.employee.phone.length >= 10) {
          if (value === 1) {
            this.employee.phone = PhoneFormatter.modules.phoneFormatter(this.employee.phone)
          }
          else {
            this.employee.phoneAlternative = PhoneFormatter.modules.phoneFormatter(this.employee.phoneAlternative)
          }
        }
      }
    }
  }
}
