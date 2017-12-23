const requestTPG = require("../tpgRequest");

const formatData = (dataTPG, request) => {
  const disruptions = dataTPG.data.disruptions;
  if (disruptions.length === 0) {
    return "Il n'y a aucun incident sur le réseau actuellement";
  }
  // If user gives a line code, filter disruptions for this line
  if (request.content.dialogflow.parameters.lineCode) {
    const lineCode = request.content.dialogflow.parameters.lineCode;
    const filteredDisruptions = disruptions.filter(
      d => d.lineCode === lineCode
    );
    if (filteredDisruptions.length > 0) {
      return filteredDisruptions.reduce(
        (acc, cur) =>
          acc +
          `
    *${cur.nature}*\n(${cur.place})
  ${cur.consequence}
    `,
        `Voilà les perturbations pour la ligne *${lineCode}*:\n`
      );
    } else
      return `Il n'y a pas d'incident impactant la ligne ${
        lineCode
      } actuellement`;
  }
  // If is not, send all disruptions
  const text = disruptions.reduce(
    (acc, cur) =>
      acc +
      `
Ligne *${cur.lineCode}*:
  *${cur.nature}* (${cur.place})
${cur.consequence}
`,
    "Voilà la liste des perturbations en cours sur le réseau TPG:\n"
  );
  return text;
};

module.exports = (request, response) =>
  requestTPG("GetDisruptions")
    .then(dataTPG => formatData(dataTPG, request))
    .then(response.sendText);
