const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getMonthName = (num) => {
  return monthNames[num];
};
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone Information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
