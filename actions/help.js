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

module.exports = (request, response, utils) => {
  const favorisContent =
    request.service === "facebook" ? "un pouce bleu" : '"/favoris"';
  const blogContent =
    request.service === "facebook"
      ? "le blog de mon développeur: https://5ika.org/tipigee/"
      : "[le blog de mon développeur](https://5ika.org/tipigee/)";
  const content = `Je m'appelle *tipigee* et je suis un bot qui te permet d'obtenir rapidement des infos sur les TPG. Si tu m'envoies...

  ... *le nom d'un arrêt* ("Carouge") et éventuellement le nom d'une ligne ("12"), je te donne les prochains départs correspondants.

  ... *le nom d'un arrêt qui a plusieurs quais*, je te donne le quai sur lequel partira le prochain tram.

  ... *ta position GPS*, je te donne les arrêts les plus proches de ta position.

  ... *${
    favorisContent
  }* ou "Favoris", je te donne la liste des arrêts que tu utilise le plus souvent.

  Pour plus de détails, tu peux consulter ${blogContent}.
  `;

  return response.sendText(content, keyboard);
};
