const fs = require("fs");
const rawJSON = require("./data/stops.json");
const rawStops = rawJSON.stops;

const stops = rawStops.map(stop => {
  const formattedStopName = stop.stopName.replace(/\(|\)/g, "");
  return {
    value: stop.stopCode,
    synonyms: [stop.stopCode, formattedStopName],
  };
});

const fileData = {
  name: "stopName",
  isOverridable: true,
  entries: stops,
  isEnum: false,
  automatedExpansion: true,
};

fs.writeFile(
  __dirname + "/data/entities-nlp.json",
  JSON.stringify(fileData),
  err => (err ? console.log(err) : console.log("File saved !"))
);
