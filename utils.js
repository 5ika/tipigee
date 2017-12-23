const _ = require("lodash");
const redis = require("redis");
const config = require("./config.json");
const clientRedis = redis.createClient(6379, config.server.redis);

const formatDepartures = dataTPG => {
  const stopName = dataTPG.data.stop.stopName;
  const departures = dataTPG.data.departures;
  const text = `Prochains départs à \`${stopName}\`:\n`;
  const content =
    text +
    departures
      .filter(depart => depart.line.destinationName !== stopName)
      .slice(0, 5)
      .map(
        depart =>
          `*${depart.line.lineCode}* ${
            depart.line.destinationName
          } : ${formatTime(depart.waitingTime, depart.reliability)}`
      )
      .join("\n");
  return content;
};

const formatTime = (value, reliability) => {
  const num = _.toNumber(value);
  if (_.isNaN(num)) {
    if (value === "no more") return "*terminé*";
    return value.replace("&gt;", ">");
  }
  const rel = reliability === "F" ? "" : "~";
  return rel + num + " min";
};

module.exports = {
  formatDepartures,
  formatTime,
};
