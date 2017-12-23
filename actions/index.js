const defaultAction = require("./default");
const welcome = require("./welcome");
const stopDepartures = require("./stopDepartures");
const stopDeparturesLine = require("./stopDeparturesLine");
const wichDock = require("./wichDock");
const closeStops = require("./closeStops");
const help = require("./help");
const favorites = require("./favorites");
const disruptions = require("./disruptions");

const actions = {
  welcome: welcome,
  "stop.departures": stopDepartures,
  "stop.departures.line": stopDeparturesLine,
  "stopMultipleDocks.wichDock": wichDock,
  "stop.closeStops": closeStops,
  "server.favorites": favorites,
  "server.help": help,
  disruptions: disruptions,
};

module.exports = (action, request, response, utils) => {
  if (actions[action]) return actions[action](request, response, utils);
  return defaultAction(request, response, utils);
};
