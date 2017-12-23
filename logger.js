const formatDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

module.exports = {
  request: data => {
    let content = data.content || data.data;
    if (data.content && data.content.hasOwnProperty("dialogflow")) {
      content = {
        text: data.content.text,
        action: data.content.dialogflow.action,
        parameters: data.content.dialogflow.parameters,
      };
    }
    const timestamp =
      data.service === "telegram" ? data.date * 1000 : data.date;
    console.log(
      `${formatDate(timestamp)} - REQUEST - [${data.service}] ${
        data.user
      } : ${JSON.stringify(content)}`
    );
  },
};
