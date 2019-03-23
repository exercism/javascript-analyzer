export const twoFer = (name) => {
  if (name === '') {
    return 'One for you, one for me.';
  } if (name.length > 0) {
    return `One for ${name}, one for me.`;
  }
};
