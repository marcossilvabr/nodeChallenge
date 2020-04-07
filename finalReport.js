const readline = require("readline");
const reports = require("./metarGenerator");
const metarParser = require("./metarParser")

const logReports = (reports) => {
  const readlineInterface = readline.createInterface({
    input: reports
  });

  const listOfIcoes = {};

  readlineInterface.on("line", (data) => {
    report = metarParser(data);

    if (!listOfIcoes.hasOwnProperty(report.icaoCode)) {
      listOfIcoes[report.icaoCode] = new Object({
        icaoCode: report.icaoCode,
        numberOfReports: 0,
        currentWindSpeed: 0,
        averageWindSpeed: 0
      });
    }
    const icao = listOfIcoes[report.icaoCode];

    icao.numberOfReports = icao.numberOfReports + 1
    icao.currentWindSpeed = report.windInfo.speed;
    icao.averageWindSpeed = Math.round(
      ((icao.currentWindSpeed - icao.averageWindSpeed) / icao.numberOfReports)
    + icao.averageWindSpeed);
  });

  readlineInterface.on("close", () => {
    Object.values(listOfIcoes).forEach((code) => {
      const {icaoCode, currentWindSpeed, averageWindSpeed} = code;
      console.log('------------------------');
      console.log("icaoCode: " + icaoCode);
      console.log("Current wind speed: " + currentWindSpeed);
      console.log("Average wind speed: " + averageWindSpeed);
    })
  });
}

logReports(reports);