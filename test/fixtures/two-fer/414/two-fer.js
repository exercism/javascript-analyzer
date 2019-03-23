export const twoFer = (name = 'you') => {
  const myname = typeof name === 'string' && name.length > 0 ? name : 'you';
  return `One for ${myname}, one for me.`;
};
