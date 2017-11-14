import 'vue-resource'
import Vue from 'vue'

export default {
  state: {
    list: [],
    one: {}
  },
  mutations: {
    update (state, config) {
      state[config.state] = config.data
    }
  },
  actions: {
    employeesList (context) {
      return Vue.http.get('http://127.0.0.1:8000/api/employees')
        .then((res) => {
          context.commit('update', {
            state: 'list',
            data: res
          })
        })
    },
    employeesGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/employees/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'one',
            data: res.data
          })
        })
    },
    employeeInsert (context, data) {
      return Vue.http.post('http://127.0.0.1:8000/api/employees', data)
    },
    employeeUpdate (context, config) {
      return Vue.http.put('http://127.0.0.1:8000/api/employees/' + config.id, config.data)
    },
    employeeDesactive (context, id) {
      return Vue.http.delete('http://127.0.0.1:8000/api/employees/' + id)
    }
  }
}
