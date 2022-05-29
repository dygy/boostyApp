import appendLeadingZeroes from './appendLeadingZeroes';

const dateToHumanDate = (rawDate, time) => {
  const date = new Date(rawDate);
  let humanDate;
  if (time) {
    humanDate = appendLeadingZeroes(date.getHours()) + ':' + appendLeadingZeroes(date.getMinutes());
  } else {
    humanDate = appendLeadingZeroes(date.getDate()) + '.' + appendLeadingZeroes(date.getMonth() + 1) + '.' + date.getFullYear();
  }
  return humanDate;
};

export default dateToHumanDate;
