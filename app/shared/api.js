process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let axios = require("axios");
const https = require("https");

let axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json"
  },
  /* other custom settings */
});

export default axiosInstance;
