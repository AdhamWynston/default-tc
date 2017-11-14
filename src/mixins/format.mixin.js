import PhoneFormatter from '../services/my-formatter'
import axios from 'axios'
export default {
  methods: {
    cepFormat () {
      if (this.client.zip_code.length === 8) {
        this.client.zip_code = PhoneFormatter.modules.cepFormatter(this.client.zip_code)
        if (/^[0-9]{5}-[0-9]{3}$/.test(this.client.zip_code)) {
          axios.get('https://viacep.com.br/ws/' + this.client.zip_code + '/json/')
            .then((response) => {
              this.client.city = response.data.localidade
              this.client.state = response.data.uf
            })
        }
      }
    },
    phoneFormat (value) {
      if (this.client.phone) {
        if (this.client.phone.length >= 10) {
          if (value === 1) {
            this.client.phone = PhoneFormatter.modules.phoneFormatter(this.client.phone)
          }
          else {
            this.client.phoneAlternative = PhoneFormatter.modules.phoneFormatter(this.client.phoneAlternative)
          }
        }
      }
    }
  }
}
