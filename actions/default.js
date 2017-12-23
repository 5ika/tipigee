module.exports = (request, response) => {
  if (request.content.dialogflow)
    return response.sendText(request.content.dialogflow.fulfillment.speech);
  return response.sendText("Désolé, je'ai pas compris ce que tu as dit");
};
