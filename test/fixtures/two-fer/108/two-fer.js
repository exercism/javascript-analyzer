export const twoFer = (name) => {
  let defaultName = 'you';
  if (typeof name === 'string' && name !== '') {
    defaultName = name;
  }
  return `One for ${defaultName}, one for me.`;
};
