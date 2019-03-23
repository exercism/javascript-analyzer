export const twoFer = (name = '') => {
  const usedName = name === '' ? 'you' : name;
  return `One for ${usedName}, one for me.`;
};
