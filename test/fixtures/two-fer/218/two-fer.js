export const twoFer = function twoFer(name) {
  if (name === '') {
    return 'One for you, one for me.';
  }
  return `One for ${name}, one for me.`;
};
