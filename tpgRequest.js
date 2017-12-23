const config = require("./config.json");
const axios = require("axios");
const redis = require("redis");
const _ = require("lodash");
const db = require("./db");

module.exports = (endpoint, parameters) => {
  db.addRequest("tpg");
  const params = _.values(
    _.mapValues(parameters, (value, key) => "&" + key + "=" + value)
  ).join("");
  const URL =
    config.tpg.url + endpoint + ".json?key=" + config.tpg.key + params;
  return axios.get(URL).catch(error => {
    console.log(URL);
    console.log("Error: can't get data from TPG : " + error);
  });
};
