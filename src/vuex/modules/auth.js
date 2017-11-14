import JwtToken from '../../services/jwt-token'

const ROLE_ADMIN = 1
const ROLE_COORDINATOR = 2

export default {
  state: {
    user: JwtToken.payload !== null ? JwtToken.payload.user : null,
    check: JwtToken.token !== null
  },
  mutations: {
    authenticated (state) {
      state.check = true
      state.user = JwtToken.payload.user
    },
    unauthenticated (state) {
      state.check = false
      state.user = null
    }
  },
  actions: {
    login (context, {username, password}) {
      return JwtToken.accessToken(username, password)
        .then(() => {
          context.commit('authenticated')
        })
    },
    logout (context) {
      let afterLogout = () => {
        context.commit('unauthenticated')
      }
      return JwtToken.revokeToken()
        .then(afterLogout)
        .catch(afterLogout)
    }
  },
  getters: {
    isAdmin (state) {
      return state.user && state.user.role === ROLE_ADMIN
    },
    isCoordinator (state) {
      return state.user && state.user.role === ROLE_COORDINATOR
    }
  }
}
