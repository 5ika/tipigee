const db = require("../db");

const text =
  "Voilà la liste de vos arrêts favoris.\nCela est déterminé à partir du nombre de fois que vous utilisez un arrêt.";

module.exports = (request, response, utils) => {
  db.getUserStops(request.service, request.user_id).then(stops => {
    if (stops.length <= 0) response.sendText("Vous n'avez aucun arrêt favoris");
    const getNames = stops.slice(0, 4).map(stop => db.getStopName(stop.code));
    Promise.all(getNames)
      .then(values => {
        console.log({ values });
        const keyboard = values.filter(i => i).map(label => ({ label }));
        response.sendText(text, { keyboard });
      })
      .catch(e => {
        const keyboard = stops.slice(0, 4).map(stop => ({ label: stop.code }));
        response.sendText(text, { keyboard });
      });
  });
};
