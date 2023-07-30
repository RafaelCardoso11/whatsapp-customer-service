const MILLISECONDS_PER_SECOND = 1000;
function convertMinutesToMilliseconds(minutes: number): number {
  const secondsInMinute = 60;
  const millisecondsInMinute = secondsInMinute * MILLISECONDS_PER_SECOND;
  return minutes * millisecondsInMinute;
}

export { convertMinutesToMilliseconds };
