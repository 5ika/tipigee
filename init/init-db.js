const config = require("../config.json");
const redis = require("redis");
const clientRedis = redis.createClient(6379, config.server.redis);
const Entries = require("./data/entities-nlp.json").entries;

Entries.forEach(entry => {
  console.log(entry.value);
  clientRedis.hset(`stop:${entry.value}`, "name", entry.synonyms[1]);
});

console.log("Finished.");
