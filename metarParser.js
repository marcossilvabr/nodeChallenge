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

  const getGustAndSpeed = () => {
    const gustPosition = windInfo.indexOf("G");
    wind.speed = parseInt(windInfo.slice(3, gustPosition), 10);
    return wind.gusts = parseInt(windInfo.slice(gustPosition + 1, gustPosition + 3), 10);
  }

  const getSpeed = () =>
    wind.speed = parseInt(windInfo.slice(3, windInfo.indexOf(windInfo.match("[KM]")), 10));

  windInfo.includes("G")
    ? getGustAndSpeed()
    : getSpeed();

  windInfo.includes("KT") 
    ? wind.speed = wind.speed / 2 
    : null;

  return {
    icaoCode,
    timestamp: date,
    windInfo: wind,
  }
}

module.exports = parseMetar