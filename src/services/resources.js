import 'vue-resource'
import Vue from 'vue'

export class Jwt {
  static accessToken (username, password) {
    return Vue.http.post('access_token', {username, password})
  }
  static logout () {
    return Vue.http.post('logout')
  }
}
