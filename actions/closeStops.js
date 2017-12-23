const requestTPG = require("../tpgRequest");

const formatData = dataTPG => {
  const stopsData = dataTPG.data.stops.slice(0, 4);
  if (!stopsData.length) return null;
  return {
    keyboard: stopsData.map(stop => ({
      label: stop.stopName,
    })),
  };
};

module.exports = (request, response) => {
  const location = request.content.location;
  return requestTPG("GetStops", location)
    .then(dataTPG => {
      const keyboard = formatData(dataTPG);
      if (!keyboard)
        return response.sendText(
          "Il n'y a aucun arrêt TPG à moins de 500m de cette position"
        );
      return response.sendText(
        "Voilà les arrêts les plus proches de votre position",
        keyboard
      );
    })
    .catch(error => {
      console.log({ error });
      response.sendText(
        "Désolé, Je ne parviens pas à reconnaître un nom d'arrêt TPG"
      );
    });
};
