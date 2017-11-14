
const phoneFormatter = (input) => {
  let str = input + ''
  str = str.replace(/\D/g, '')
  if (str.length === 11) {
    str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  else {
    str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return str
}
const cepFormatter = (input) => {
  let str = input + ''
  str = str.replace(/\D/g, '')
  str = str.replace(/^(\d{5})(\d{3})/, '$1-$2')
  return str
}

const strip = (input) => {
  let str = input + ''
  str = str.replace(/\D/g, '')
  return str
}

export default {
  modules: {
    phoneFormatter,
    cepFormatter,
    strip
  }
}
