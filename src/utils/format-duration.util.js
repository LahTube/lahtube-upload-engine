const formatDuration = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedHours = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
};

module.exports = formatDuration;
