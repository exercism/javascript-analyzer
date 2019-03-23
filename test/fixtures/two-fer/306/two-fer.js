export const twoFer = (name) => {
  const resultName = name && name.length ? name : 'you';

  return `One for ${resultName}, one for me.`;
};
