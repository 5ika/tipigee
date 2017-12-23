const requestTPG = require("../tpgRequest");
const { formatTime, formatDepartures } = require("../utils");
const db = require("../db");

module.exports = (request, response) => {
  const dialogflow = request.content.dialogflow;
  if (!dialogflow.parameters.stopName)
    return response.sendText("Pour quel arrêt ?");
  const stopCode = dialogflow.parameters.stopName;
  const linesCode = dialogflow.parameters.lineCode;
  return requestTPG("GetNextDepartures", { stopCode, linesCode })
    .then(dataTPG => {
      db.saveUserStop(request.service, request.user_id, stopCode);
      const content = formatDepartures(dataTPG);
      return response.sendText(content);
    })
    .catch(error => {
      response.sendText(
        "Désolé, Je ne parviens pas à reconnaître un nom d'arrêt TPG"
      );
    });
};
