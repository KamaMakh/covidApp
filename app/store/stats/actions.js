import api from "@/shared/api";
import urls from "./urls";

function getGlobal({ commit }) {
  return new Promise((resolve, reject) => {
  api.get(urls.global)
      .then(response => {
        commit("setGlobal", response.data);
      })
    .catch(error => {
      console.log(error);
    })
  });
}

function getCountries({ commit }) {
  return new Promise((resolve, reject) => {
    api.get(urls.countries)
      .then(response => {
        commit("setCountries", response.data);
      })
      .catch(error => {
        console.log(error);
      })
  });
}

export {
  getGlobal,
  getCountries
}