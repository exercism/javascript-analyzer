export const twoFer = (value) => {
  let name = value;
  if (name === '') {
    name = 'you';
  }
  return `One for ${name}, one for me.`;
};
