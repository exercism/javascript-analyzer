export const twoFer = (n) => {
  let name = n;
  if (name === '') {
    name = 'you';
  }
  return `One for ${name}, one for me.`;
};
