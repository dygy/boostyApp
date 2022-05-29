const appendLeadingZeroes = n => {
  if (n <= 9) {
    return '0' + n;
  }
  return n;
}

export default appendLeadingZeroes;
