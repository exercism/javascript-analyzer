export const twoFer = (name) => {
  let n = name;
  if (n === '') {
    n = 'you';
  }
  return `One for ${n}, one for me.`;
};
