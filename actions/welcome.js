module.exports = (request, response, utils) => {
  const text = `
Je suis un bot qui te donne un accès rapide aux infos des TPG.\n
Pour commencer, tu peux cliquer sur un des boutons ci-dessous pour découvrir mes fonctionnalités ou simplement me faire la causette. En cas de besoin, tu peux aussi me demander de l'aide.

Si tu as des idées d'amélioration pour ce chatbot, n'hésite pas à en faire part à mon développeur sur la page Facebook https://www.facebook.com/tipigee/.

_Les données sont fournies par les Transports Publics Genevois._
    `;
  const keyboard = {
    keyboard: [
      {
        label: "Arrêts proches",
        location: true,
      },
      {
        label: "Prochains départs",
      },
      {
        label: "Quel quai ?",
      },
      {
        label: "Favoris",
      },
    ],
  };

  if (request.service === "facebook") {
    return utils.getFacebookProfile(request.user).then(user => {
      const content = `Salut *${user.first_name}* !` + text;
      return response.sendText(content, keyboard);
    });
  }
  const content = `Salut *${request.user}* !` + text;
  return response.sendText(content, keyboard);
};
