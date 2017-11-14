export default {
  set (key, value) { // setar uma string, int, boolean
    window.localStorage[key] = value
    return window.localStorage[key]
  },
  get (key, defaultValue = null) { // ler uma string, int, boolean
    return window.localStorage[key] || defaultValue
  },
  setObject (key, value) { // recebe um objeto e armazena no local storage
    window.localStorage[key] = JSON.stringify(value)
    return this.getObject(key)
  },
  getObject (key) { // Ele pega o JSON do localstore transformando em um objeto e se n tiver retorna null
    return JSON.parse(window.localStorage[key] || null)
  },
  remove (key) { // remove o dados no localstorage
    window.localStorage.removeItem(key)
  }
}
