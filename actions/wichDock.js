const requestTPG = require("../tpgRequest");

const TRAMS = {
  PALE: "15",
  NATI: "15",
  PRBE: "14",
  CRGE: "18",
  GRVI: "14",
};

const getFirstTram = dataTPG => {
  const tramNum = TRAMS[dataTPG.data.stop.stopCode];
  const firstTram = dataTPG.data.departures.find(
    tram => tram.line.lineCode === tramNum && tram.waitingTimeMillis > 0
  );
  return firstTram;
};

const formatData = dataTPG => {
  if (!dataTPG)
    return "Désolé, je n'arrive pas à récupérer les infos du prochain tram\nNous avons quelques soucis avec l'arrêt *Palettes* actuellement.";
  const stopCode = dataTPG.data.stop.stopCode;
  const step =
    dataTPG.data.steps[0].stop.stopCode === stopCode
      ? dataTPG.data.steps[0]
      : dataTPG.data.steps[dataTPG.data.steps.length - 1];
  if (step.stop.stopCode !== stopCode)
    return "Le tram ne fera que passer à l'arrêt";
  if (!step.arrivalTime)
    return "Désolé, je n'arrive pas à récupérer les infos du prochain tram pour le moment.";
  const physicalStopCode = step.physicalStop.physicalStopCode;
  const quai = physicalStopCode.replace(stopCode, "").replace("0", "");
  const waitingTime = step.arrivalTime.replace("00", "0");
  const content = `Le prochain tram *${TRAMS[stopCode]}* sera sur le quai n° *${
    quai
  }* dans *${waitingTime} min*`;
  return content;
};

module.exports = (request, response) => {
  const dialogflow = request.content.dialogflow;
  if (!dialogflow.parameters.stopName)
    return response.sendText("Pour quel arrêt ?");
  const stopCode = dialogflow.parameters.stopName;
  return requestTPG("GetNextDepartures", { stopCode })
    .then(dataTPG => {
      const firstTram = getFirstTram(dataTPG);
      return requestTPG("GetThermometerPhysicalStops", {
        departureCode: firstTram.departureCode,
      });
    })
    .then(dataTPG => {
      const content = formatData(dataTPG);
      return response.sendText(content);
    })
    .catch(error => {
      console.log({ error });
      response.sendText(
        `Désolé, Je ne parviens pas à reconnaître un nom d'arrêt TPG avec plusieurs quais.
Les arrêts possibles sont *Palettes*, *Carouge*, *Nations*, *P+R Bernex* et *Meyrin Gravière*`
      );
    });
};
