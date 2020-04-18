function setGlobal(state, data) {
  state.global = data;
}
function setCountries(state, data) {
  state.countries = data;
}

export {
  setGlobal,
  setCountries
}