const messenja = require("messenja");
const Actions = require("./actions");
const db = require("./db");
const logger = require("./logger");

const app = messenja((request, response, utils) => {
  logger.request(request);

  // Store data for stats
  db.addRequest("api");

  // If user uses callback
  if (request.isCallback) {
    // If user clicks on "Démarrer" button (Facebook)
    if (request.data === "/start")
      return Actions("welcome", request, response, utils);
  }
  // If user sends text
  if (request.content) {
    if (request.content.hasOwnProperty("text")) {
      // If text is "/favoris" (useful for Telegram)
      if (request.content.text === "/favoris") {
        return Actions("server.favorites", request, response, utils);
      }
      // If request has Dialogflow data associated
      if (request.content.hasOwnProperty("dialogflow")) {
        const action = request.content.dialogflow.action;
        return Actions(action, request, response, utils);
      }
      // Else
      return response.sendText("Pas de connexion avec le service NLP");
    }
    // If user sends a location
    if (request.content.hasOwnProperty("location")) {
      return Actions("stop.closeStops", request, response);
    }
    // If user from Facebook sends an image (thumb up sticker in most case)
    if (
      request.service === "facebook" &&
      request.content.hasOwnProperty("image")
    ) {
      return Actions("server.favorites", request, response, utils);
    }
  }
  return response.sendText("Je n'ai pas compris votre requête");
});

// Send privacy notes
app.use("/privacy", (req, res) => {
  res.send(
    "Le développeur de Tipigee s'engage à ne pas utiliser / diffuser toute information fournie par un utilisateur du chatbot. Aucune exception possible."
  );
});
