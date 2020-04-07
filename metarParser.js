const parseMetar = (metar) => {
  const [icaoCode, timestamp, windInfo] = metar.split(' ');

  const date = new Date();
  date.setUTCDate(parseInt(timestamp.slice(0, 2)));
  date.setUTCHours(parseInt(timestamp.slice(2, 4)));
  date.setUTCMinutes(parseInt(timestamp.slice(4, 6)));

  const wind = {
    direction: parseInt(windInfo.slice(0, 3), 10),
    speed: 0,
    gusts: 0,
  }

  if (windInfo.includes("G")) {
    gustIndex = windInfo.indexOf("G");

    wind.speed = parseInt(windInfo.slice(3, gustIndex), 10);
    wind.gusts = parseInt(windInfo.slice(gustIndex + 1, gustIndex + 3), 10);
  } else {
    wind.speed = parseInt(
      windInfo.slice(3, windInfo.indexOf(windInfo.match("[a-zA-Z]")), 10)
    );
  }

  return {
    icaoCode,
    timestamp: date,
    windInfo: wind,
  }
}

module.exports = parseMetar