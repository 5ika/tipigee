const redis = require("redis");
const config = require("./config.json");
const clientRedis = redis.createClient(6379, config.server.redis);
const _ = require("lodash");

clientRedis.on("connect", function() {
  console.log("Connected to redis");
});

const saveUserStop = (service, userId, stopCode) => {
  clientRedis.hsetnx(`${service}:${userId}`, stopCode, 0);
  clientRedis.hincrby(`${service}:${userId}`, stopCode, 1);
  clientRedis.hsetnx(`stop:${stopCode}`, "number", 0);
  clientRedis.hincrby(`stop:${stopCode}`, "number", 1);
  clientRedis.hset(`stop:${stopCode}`, "last-time", Date.now());
};

const getUserStops = (service, userId) =>
  new Promise((resolve, reject) => {
    clientRedis.hgetall(`${service}:${userId}`, (err, user) => {
      if (err) return reject(err);
      const sortedStops = _.reverse(
        _.sortBy(
          _.map(user, (number, code) => ({ code, number: parseInt(number) })),
          "number"
        )
      );
      resolve(sortedStops);
    });
  });

const getStopName = stopCode =>
  new Promise((resolve, reject) => {
    clientRedis.hget(
      `stop:${stopCode}`,
      "name",
      (err, stopName) => (err ? reject(err) : resolve(stopName))
    );
  });

const addRequest = type => {
  const date = new Date().toLocaleDateString();
  clientRedis.hsetnx(`request:${date}`, type, 0);
  clientRedis.hincrby(`request:${date}`, type, 1);
};

module.exports = {
  saveUserStop,
  getUserStops,
  getStopName,
  addRequest,
};
